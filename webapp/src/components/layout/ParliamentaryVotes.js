import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Box, Paper, Typography, Button, IconButton, List, ListItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './Layout.css';
import "../../rug-huisstijl.css"

import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

import ErrorIcon from '@mui/icons-material/Error';
import { useData } from "../../hooks/useData";

import { BarChart } from '@mui/x-charts/BarChart';
import DecisionsList from './DecisionsList';
import Info from './Info';

const colors = {
    "higher": "#60B669",
    "saves": "#60B669",
    "expands": "#60B669",
    "improves": "#60B669",
    "budget-neutral": "#FFDC64",
    "neutral": "#FFDC64",
    "worsens": "#dc002d",
    "lower": "#dc002d",
    "costs": "#dc002d",
    "restricts": "#dc002d",
    "not-participated": "#009CEF",
    "n/a": "#772D68",
    "unclear": "#CCCCCC",
}

const order = [
    "higher", "saves", "expands", "improves",
    "budget-neutral", "neutral",
    "worsens", "lower", "costs", "restricts",
    "not-participated", "n/a", "unclear",
];

const shortNames = {
  "D66": "D66", "DENK": "DENK", "SGP": "SGP", "JA21": "JA21",
  "CDA": "CDA", "Volt": "Volt", "ChristenUnie": "CU", "VVD": "VVD",
  "PvdD": "PvdD", "NSC": "NSC", "BBB": "BBB", "SP": "SP",
  "PVV": "PVV", "GroenLinks-PvdA": "GLPvdA", "FVD": "FVD",}

const binaryColumns = [
      "lower", "higher", "saves", "costs", "expands", "restricts",
      "improves", "worsens"];

const impactKeys = ["economic_cost_impact", "environment_impact", "fiscal_tag",
  "healthcare_impact", "rights_impact","security_impact", "social_security_impact"];


function ImpactChart({ title, id, impacts, normalize, binary, }) {

    const { parties, setFocus } = useData();

    const impacts_ = binary ? Object.entries(impacts).filter(([impact, _]) => binaryColumns.includes(impact)) : Object.entries(impacts);

    const factors = Object.fromEntries(parties.map(party => [party, 
        normalize ? 
            impacts_.map(([_, value]) => value[party]).reduce((a, b) => a + b, 0) / 100
            :
            1
    ]));

    const series = impacts_.map(([impact, impacts_]) => ({
        label: t(impact), stack: 'total', color: colors[impact], id: impact,
        data: parties.map(party => Math.round((impacts_[party] || 0) / (factors[party]) || 1)),
    })).sort((a, b) => order.indexOf(a.id) > order.indexOf(b.id) ? 1 : -1)


    const xAxis = [{data: parties.map(p => shortNames[p]), height: 65, scaleType: 'band', tickLabelStyle: {angle: 90, textAnchor: 'start', fontSize: 12}}];
    const yAxis = [{label: normalize ? t('Votes (%)') : t('Votes'),
                    ...(normalize ? {min: 0, max: 100}: {}),
                    width: 65, }];

    const barClick = (e, item) => {
        const party = parties[item['dataIndex']];
        const impact = item['seriesId'];
        setFocus(id, party, impact);
    };
    
    return <Box>
        <Typography variant="h6">{title}</Typography>
        <BarChart height={250} series={series} xAxis={xAxis} yAxis={yAxis} hideLegend={true} onItemClick={barClick} />
    </Box>
}

export function ParliamentaryVotes({}) {
    const { t } = useTranslation();
    const { loading, error, impacts, metadata, normalize, binary, showDecisions, party, impact, area, resetFocus, informationOpen, setInformationOpen} = useData();
    
    
    const infoDialog = <Info information={informationOpen} setInformation={setInformationOpen} ></Info>;

    if (loading)
        return <><Box sx={{pt:3,pb:3,mx:'auto', maxWidth: '1200px'}}>
            <Box display="inline-box" mx="auto" style={{marginTop: '200px', textAlign: 'center', lineHeight: '50px', verticalAlign: 'middle'}}><CircularProgress style={{lineHeight: '50px', verticalAlign: 'middle'}}/>&nbsp;{t("Loading data")}</Box>
    </Box>{infoDialog}</>

    if (error)
        return <><Box sx={{pt:3,pb:3,mx:'auto', maxWidth: '1200px'}}>
            <Box display="inline-box" style={{x: "auto"}}><ErrorIcon />&nbsp;{t(error)}</Box>
        </Box>{infoDialog}</>

    var legendItems = {};
    Object.entries(colors).map(([item, color]) => {
        if (!binary && !binaryColumns.includes(item))
            return
        if (!legendItems[color])
            legendItems[color] = [t(item)]
        else
            legendItems[color].push(t(item));
    });

    console.log(area, party, impact);
    const filterText = !area ? '' : ", " + t("1+ <PARTY>-vote that <IMPACT> <AREA>").replace("<AREA>", t("f_" + area)).replace("<PARTY>", party).replace("<IMPACT>", t("f_" + impact));

    const closeFocus = !area ? null : <IconButton size="small" onClick={resetFocus} title={t("Clear filter")}><CloseIcon fontSize="small"/></IconButton>

    return <><Box sx={{p: 0, mx:'auto'}}>
        
        <Grid container width="100%">
            <Grid key="decisions-box" size={{lg: 3, md: 4, sm: 12, xs: 12}} display="flex" flexDirection="column" className={`${!showDecisions ? "hide-sm " : ""}`}>
                <Box key="n-decisions" mt={2}><Typography variant="h6">{metadata.length} {t('decisions')}{filterText}{closeFocus}</Typography></Box>
                <DecisionsList key="decisions-list" decisions={metadata}/>
            </Grid>
            <Grid key="graphs-box" container size={{lg: 9, md: 8}} className={`fill-vertically ${showDecisions ? "hide-sm " : ""}`}>
                <Grid key="legend" size={12} p={5}>
                    {Object.entries(legendItems).map(([color, items]) => {
                        return <span key={`legend-item-${items[0]}`}><Box style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: color}}/>&nbsp;{items.join("/")}&nbsp;</span>
                    })}
                </Grid>
                {impactKeys.map(key => <Grid key={key} size={{'xs': 12, 'sm': 12, 'md': 6, lg: 4}}>
                    <ImpactChart id={key} title={t(key)} key={key} {...{binary: !binary, normalize: !normalize}} impacts={impacts[key]}/></Grid>)}
            </Grid>
        </Grid>
    </Box>{infoDialog}</>
}
