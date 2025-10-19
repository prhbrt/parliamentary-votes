import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Box, Paper, Typography, Button, IconButton, List, ListItem, Chip } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, CircularProgress, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TableVirtuoso } from 'react-virtuoso'

import './Layout.css';
import "../../rug-huisstijl.css"

import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

import ErrorIcon from '@mui/icons-material/Error';
import { useData } from "../../hooks/useData";

import { BarChart } from '@mui/x-charts/BarChart';
import DecisionsList from './DecisionsList';
import Info from './Info';
import tinygradient from 'tinygradient';

window.tinygradient = tinygradient;

const colors = {
    "higher": "#60B669",
    "saves": "#60B669",
    "expands": "#60B669",
    "improves": "#60B669",
    "Voor": "#60B669",
    "budget-neutral": "#FFDC64",
    "neutral": "#FFDC64",
    "worsens": "#dc002d",
    "lower": "#dc002d",
    "costs": "#dc002d",
    "Tegen": "#dc002d",
    "restricts": "#dc002d",
    "not-participated": "#009CEF",
    "Niet deelgenomen": "#009CEF",
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
      "improves", "worsens", "Voor", "Tegen", ];

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

function SymbolismChart() {
    const { symbolism, parties, normalize, binary } = useData();

    const order = ['Voor', 'Tegen', 'Onthouden', 'Niet gestemd'];
    if (!('symbolic' in symbolism))
        return <p>{t("No symbolic votes.")}</p>;

    const symbolic = symbolism['symbolic'];
    const symbolic_ = !binary ? Object.entries(symbolic).filter(([vote, _]) => binaryColumns.includes(vote)) : Object.entries(symbolic);

    const factors = Object.fromEntries(parties.map(party => [party, 
        normalize ? 1 : (
            symbolic_.map(([_, vote_data]) => vote_data[party]).reduce((a, b) => a + b, 0) / 100
        )
    ]))
    
    const series = symbolic_.map(([vote, vote_data]) => ({
        label: t(vote), stack: 'total', id: `${vote}`, color: colors[vote],
        data: parties.map(party => vote_data[party] / factors[party]),
    })).sort((a, b) => order.indexOf(a.id) > order.indexOf(b.id) ? 1 : -1)

    const xAxis = [{data: parties.map(p => shortNames[p]), height: 65, scaleType: 'band', tickLabelStyle: {angle: 90, textAnchor: 'start', fontSize: 12}}];
    const yAxis = [{label: !normalize ? t('Votes (%)') : t('Votes'),
                    ...(!normalize ? {min: 0, max: 100}: {}),
                    width: 65, }];
    
    return <Box>
        <Typography variant="h6">{t("Symbolism")} <span key={`legend-item-Voor`}><Box style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: colors['Voor']}}/>&nbsp;{t("In favor")} </span>
            <span key={`legend-item-Tegen`}><Box style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: colors['Tegen']}}/>&nbsp;{t("Against")}&nbsp;</span>
        </Typography>
        <BarChart height={250} series={series} xAxis={xAxis} yAxis={yAxis} hideLegend={true}/>
    </Box>
}

export function ParliamentaryVotes({}) {
    const { t } = useTranslation();
    const { loading, error, impacts, metadata, normalize, binary, showDecisions,
        party, impact, area, resetFocus, informationOpen, setInformationOpen,
        all_beneficiaries, beneficiaries, beneficiary_counts, parties, showBeneficiaries, setFilterBeneficiaries} = useData();
    
    
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
        if (['Voor', 'Tegen', 'Niet deelgenomen'].includes(item))
            return
        if (!legendItems[color])
            legendItems[color] = [t(item)]
        else
            legendItems[color].push(t(item));
    });

    

    const filterText = !area ? '' : <Chip style={{marginLeft: '10px'}} label={`${party} | ${t("f_" + impact)} | ${t("f_" + area)}`} variant="outlined" onDelete={resetFocus}/>;

    return <><Box sx={{p: 0, mx:'auto'}}>
        
        <Grid container width="100%" style={{height: 'calc(100vh - 2.5em - 100px)'}}>
            <Grid key="decisions-box" size={{lg: 3, md: 4, sm: 12, xs: 12}} display="flex" flexDirection="column" className={`${!showDecisions ? "hide-sm " : ""}`}>
                <Box key="n-decisions" mt={2}><Typography variant="h6">{metadata.length} {t('decisions')}{filterText}</Typography></Box>
                <DecisionsList key="decisions-list" decisions={metadata}/>
            </Grid>
            <Grid key="graphs-box" container size={{lg: 9, md: 8}} className={`fill-vertically sm-full-width ${showDecisions ? "hide-sm " : ""}`}>
                {!showBeneficiaries ? <Grid key="legend" size={12} p={5}>
                    {Object.entries(legendItems).map(([color, items]) => {
                        return <span key={`legend-item-${items[0]}`}><Box style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: color}}/>&nbsp;{items.join("/")}&nbsp;</span>
                    })}
                </Grid> : undefined}
                {area ? <Grid key="area-filter" size={12} p={2} className="show-sm">{filterText}</Grid>: undefined}
                
                {!showBeneficiaries ? impactKeys.map(key => <Grid key={key} size={{'xs': 12, 'sm': 12, 'md': 6, lg: 4}}>
                    <ImpactChart id={key} title={t(key)} key={key} {...{binary: !binary, normalize: !normalize}} impacts={impacts[key]}/></Grid>) :
                    <Grid key="beneficiaries" size={12} p={0}>
                            <TableVirtuoso style={{height: 'calc(100vh - 2.5em - 100px)', width: '100%', borderSpacing: '1px', borderCollapse: 'separate'}} className={`beneficiaries-virtuoso`}  data={all_beneficiaries}
                            fixedHeaderContent={() => (
                                <tr style={{ background: 'white'}}>
                                <th style={{ width: 250, position: 'sticky', left: 0}}><TextField key="filter-beneficiaries" style={{ flexGrow: 1}} id="filter-beneficiaries" label={t("Filter")} placeholder={t("KeyFilterwords")} variant="standard" onChange={e => setFilterBeneficiaries(e.target.value)}/></th>
                                {parties.map(party => <th key={`${party}-header`} style={{width: '150px'}}>{party}</th>)}
                                </tr>
                            )}
                            itemContent={(index, beneficiary) => {
                                const maxValue = Object.values(beneficiaries).map(x => x[beneficiary]).reduce((a, b) => Math.max(a, b), 0);
                                const colors = tinygradient([
                                    {color: '#009CEF', pos: 0},
                                    {color: '#dc002d', pos: 1},
                                ]).rgb(maxValue + 1).map(color => color.setAlpha(0.75).toRgbString());
                                
                                return <>
                                    <th key="beneficiary" style={{textAlign: 'right', paddingRight: '5px', position: 'sticky', left: 0, background: 'white'}}>{beneficiary}</th>
                                    {parties.map(party => {
                                        const number = beneficiaries[party][beneficiary];
                                        return <td key={party} style={{textAlign: 'right', paddingRight: '5px', backgroundColor: colors[number], color: 'white'}}>{(new Intl.NumberFormat().format(number)).split(',').map(x => <>&nbsp;{x}</>)}</td>
                                    })}
                                </>
                            }}/>
                    </Grid>}

                    {!showBeneficiaries ? <Grid key="symbolism-chart" size={{'xs': 12, 'sm': 12, 'md': 6, 'lg': 4}}>
                        <SymbolismChart />
                    </Grid> : undefined}
            </Grid>
        </Grid>
    </Box>{infoDialog}</>
}
