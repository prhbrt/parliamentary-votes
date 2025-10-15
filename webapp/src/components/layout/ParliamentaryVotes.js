import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Box, Paper, Typography, Button, IconButton, List, ListItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, CircularProgress } from '@mui/material';

import './Layout.css';
import "../../rug-huisstijl.css"

import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom'
import { t } from 'i18next';


import VideoCallIcon from '@mui/icons-material/VideoCall';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ErrorIcon from '@mui/icons-material/Error';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useData } from "../../hooks/useData";

import { BarChart } from '@mui/x-charts/BarChart';
import { Filters } from "./Filters";
import DecisionsList from './DecisionsList';

const colors = {
    "lower": "#60B669",
    "saves": "#60B669",
    "expands": "#60B669",
    "improves": "#60B669",
    "budget-neutral": "#FFDC64",
    "neutral": "#FFDC64",
    "worsens": "#dc002d",
    "higher": "#dc002d",
    "costs": "#dc002d",
    "restricts": "#dc002d",
    "not-participated": "#009CEF",
    "n/a": "#772D68",
    "unclear": "#CCCCCC",
}

const order = [
    "lower", "saves", "expands", "improves",
    "budget-neutral", "neutral",
    "worsens", "higher", "costs", "restricts",
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

function ImpactChart({ title, impacts, normalize, binary, }) {
    const { parties } = useData();

    const impacts_ = binary ? Object.entries(impacts).filter(([impact, _]) => binaryColumns.includes(impact)) : Object.entries(impacts);

    const factors = Object.fromEntries(parties.map(party => [party, 
        normalize ? 
            impacts_.map(([_, value]) => value[party]).reduce((a, b) => a + b, 0) / 100
            :
            1
    ]));

    const series = impacts_.map(([impact, impacts_]) => ({
        label: t(impact), stack: 'total', color: colors[impact], label_: impact,
        data: parties.map(party => Math.round((impacts_[party] || 0) / (factors[party]) || 1)),
    })).sort((a, b) => order.indexOf(a.label_) > order.indexOf(b.label_) ? 1 : -1)


    const xAxis = [{data: parties.map(p => shortNames[p]), height: 65, scaleType: 'band', tickLabelStyle: {angle: 90, textAnchor: 'start', fontSize: 8}}];
    const yAxis = [{label: normalize ? t('Votes (%)') : t('Votes'),
                    ...(normalize ? {min: 0, max: 100}: {}),
                    width: 65, }];
                    
    
    return <Box>
        <Typography variant="h6">{title}</Typography>
        <BarChart height={250} series={series} xAxis={xAxis} yAxis={yAxis} hideLegend={true}/>
    </Box>
}


const impactKeys = ["economic_cost_impact", "environment_impact", "fiscal_tag",
  "healthcare_impact", "rights_impact","security_impact", "social_security_impact"];

export function ParliamentaryVotes({}) {
    const { t } = useTranslation();
    const { loading, error, impacts, metadata, normalize, binary, showDecisions } = useData();
    
    if (loading)
        return <Box sx={{pt:3,pb:3,mx:'auto', maxWidth: '1200px'}}>
            <Box display="inline-box" mx="auto" style={{marginTop: '200px', textAlign: 'center', lineHeight: '50px', verticalAlign: 'middle'}}><CircularProgress style={{lineHeight: '50px', verticalAlign: 'middle'}}/>&nbsp;{t("Loading data")}</Box>
            
    </Box>

    if (error)
        return <Box sx={{pt:3,pb:3,mx:'auto', maxWidth: '1200px'}}>
            <Box display="inline-box" style={{x: "auto"}}><ErrorIcon />&nbsp;{t(error)}</Box>
        </Box>

    var legendItems = {};
    Object.entries(colors).map(([item, color]) => {
        if (!binary && !binaryColumns.includes(item))
            return
        if (!legendItems[color])
            legendItems[color] = [t(item)]
        else
            legendItems[color].push(t(item));
    })
    


    return <Box sx={{p: 0, mx:'auto'}}>
        
        <Grid container width="100%">
            <Grid size={{lg: 3, md: 4, sm: 12, xs: 12}} display="flex" flexDirection="column" className={`${!showDecisions ? "hide-sm " : ""}`}>
                <Box mt={2}><Typography variant="h6">{metadata.length} {t('decisions')}</Typography></Box>
                <DecisionsList decisions={metadata}/>
            </Grid>
            <Grid container size={{lg: 9, md: 8}} className={`fill-vertically ${showDecisions ? "hide-sm " : ""}`}>
                <Grid key="legend" size={12} p={5}>
                    {Object.entries(legendItems).map(([color, items]) => {
                        return <><Box style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: color}}/>&nbsp;{items.join("/")}&nbsp;</>
                    })}
                </Grid>
                {impactKeys.map(key => <Grid key={key} size={{'xs': 12, 'sm': 12, 'md': 6, lg: 4}}>
                    <ImpactChart title={t(key)} key={key} {...{binary: !binary, normalize: !normalize}} impacts={impacts[key]}/></Grid>)}
            </Grid>
        </Grid>
    </Box>
}
