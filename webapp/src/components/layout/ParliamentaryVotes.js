import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Grid,  Box, Typography, Chip } from '@mui/material';
import {  CircularProgress, TextField, IconButton } from '@mui/material';

import { TableVirtuoso } from 'react-virtuoso'

import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

import './Layout.css';
import "../../rug-huisstijl.css"

import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

import ErrorIcon from '@mui/icons-material/Error';
import { useData } from "../../hooks/useData";

import { BarChart } from '@mui/x-charts/BarChart';
import DecisionsList from './DecisionsList';
import Info from './Info';
import Beneficiaries from './Beneficiaries';
import tinygradient from 'tinygradient';
import { AnnotationDialogue } from '../AnnotationInfo';

window.tinygradient = tinygradient;

const properties = ['coalitieakkoord_consistentie', 'uitvoeringsmoeilijkheid', 'financieringsbron', ]

const use_neutral_color_for = [
    'asiel_toegankelijkheid', 'oekraine_effect', 'palestina_effect', 'israel_effect', 'schiphol_capaciteit', 'defensieuitgaven',
    'oekraine_effect', 'palestina_effect', 'asiel_toegankelijkheid', ' uitvoeringsmoeilijkheid', 'juridische_risico', 'eu_dimensie',
    'financieringsbron', 'financieringsbron'
]

const neutral_colors = {
    '<2% bbp': "#35B6B4",
    '>=2% bbp': "#FFDC64",
    "neutraal": "#EC6581",
    "gemakkelijker": "#35B6B4", "moeilijker": "#FFDC64",
    "helpt": "#35B6B4", "belemmert": "#FFDC64",
    "uitgebreid": "#35B6B4", "beperkt": "#FFDC64",
    'laag': "#dc002d", 'hoog': "#60B669",
    'geen conflict': '#60B669',

    'algemene middelen': "#EC6581",
    'geoormerkt fonds': "#009CEF",
    'privaat / heffing': "#000",
    "gemeentelijke middelen": "#35B6B4",
    "EU-fondsen": "#FFDC64",

    'EU-recht risico': "#dc002d",
    "grondwettelijk risico": "#EC6581",
    "EU-recht risico": "#772D68",
    "laag risico": "#60B669",
    
    'EU-richtlijn / verordening': "#009CEF",
    'Schengen / CEAS': "#772D68",
    "staatssteun": "#EC6581",
}

const colors = {
    "Tegen": "#dc002d",
    'belemmert': "#dc002d",
    'beperkt': "#dc002d",
    'hoger': "#dc002d",
    'hogere lasten': "#dc002d",
    'hoog': "#dc002d",
    'ingeperkt': "#dc002d",
    'kost': "#dc002d",
    'moeilijker': "#dc002d",
    'niet in lijn': "#dc002d",
    'verslechterd': "#dc002d",
    'middel': "#FFDC64",
    'neutraal': "#FFDC64",
    'budgetneutraal': "#FFDC64",
    'gedeeltelijk in lijn': "#FFDC64",
    "herverdeling": "#EC6581",
    "Voor": "#60B669",
    'bespaart': "#60B669",
    'gemakkelijker': "#60B669",
    'helpt': "#60B669",
    'in lijn': "#60B669",
    'laag': "#60B669",
    'laag risico': "#60B669",
    'lager': "#60B669",
    'lagere lasten': "#60B669",
    'uitgebreid': "#60B669",
    'verbeterd': "#60B669",
    "not-participated": "#009CEF",
    "Niet deelgenomen": "#009CEF",
    "n/a": "#772D68",
    'n.v.t.': "#772D68",
    'geen / niet relevant': "#772D68",
    "unclear": "#CCCCCC",
    'onduidelijk': "#CCCCCC",
}

function colorFor(field, impact) {
    if (use_neutral_color_for.includes(field) && Object.keys(neutral_colors).includes(impact))
        return neutral_colors[impact];
    return colors[impact];
}

const order = ['>=2% bbp', '<2% bbp', 'laag risico', 'algemene middelen', 'gemeentelijke middelen', 'EU-fondsen', 'geoormerkt fonds',
    'EU-richtlijn / verordening', 'EU-recht risico', 'grondwettelijk risico', 'staatssteun',
    'Schengen / CEAS', 'privaat / heffing',
    
    'Tegen', 'belemmert', 'beperkt', 'hoger', 'hogere lasten', 'hoog', 'ingeperkt', 'kost', 'moeilijker', 'niet in lijn',
    'verslechterd',
    
    'middel', 'neutraal', 'budgetneutraal', 'gedeeltelijk in lijn', "herverdeling",
    
    'Voor', 'bespaart', 'gemakkelijker', 'helpt', 'in lijn', 'laag', 'lager', 'lagere lasten', 'uitgebreid', 'verbeterd', 'geen conflict',
    
    'not-participated', 'Niet deelgenomen', 'n/a', 'n.v.t.', 'geen / niet relevant', 'unclear', 'onduidelijk']

const shortNames = {
  "D66": "D66", "DENK": "DENK", "SGP": "SGP", "JA21": "JA21",
  "CDA": "CDA", "Volt": "Volt", "ChristenUnie": "CU", "VVD": "VVD",
  "PvdD": "PvdD", "NSC": "NSC", "BBB": "BBB", "SP": "SP",
  "PVV": "PVV", "GroenLinks-PvdA": "GLPvdA", "FVD": "FVD",}

const binaryColumns = [
    '<2% bbp', '>=2% bbp',
    "gemakkelijker",  "moeilijker",
    "helpt", "belemmert", "uitgebreid", "beperkt", 'laag', 'hoog',
    'geen conflict',

    'geoormerkt fonds', 'privaat / heffing', 'algemene middelen', "gemeentelijke middelen", "EU-fondsen",
    'EU-recht risico', "grondwettelijk risico", "EU-recht risico", "laag risico",
    'EU-richtlijn / verordening', 'Schengen / CEAS', "staatssteun",

    "Voor", "Tegen", 'belemmert', 'beperkt', 'bespaart',
    'gedeeltelijk in lijn', 'in lijn', 'hoger', 'hogere lasten',
    'ingeperkt', 'kost', 'laag', 'lager', 'lagere lasten', 'moeilijker', 'niet in lijn', 'uitgebreid', 'verbeterd', 'verslechterd'
];


const impactKeys = [
 'asiel_toegankelijkheid', 'box3_effect', 'fiscaal_label',
 'defensieuitgaven', 'dierenwelzijn_effect',
 'economische_kosteneffect', 
 'gemeentelijke_last', 'huurmarkt_effect', 'hypotheeklasten_effect',
 'israel_effect', 'kinderopvang_betaalbaarheid',
 'koopwoning_effect', 'kosten_van_leven_effect', 'milieu_effect',
 'oekraine_effect', 'palestina_effect', 'pas_melders_effect',
 'provinciale_last', 'schiphol_capaciteit', 'zorg_effect',
 'sociale_zekerheidseffect', 'veiligheids_effect',
 'mensenrechten_effect',
];

function ImpactChart({ title, id }) {
    const { parties, normalize, binary, addImpactFilter, impacts, setExplanation, } = useData();

    const impacts_ = (
        !binary ?
            Object.entries(impacts[id]).filter(([impact, _]) => binaryColumns.includes(impact)) :
            Object.entries(impacts[id])
    ).filter(([impact, _]) => impact !== 'ignore');

    const factors = Object.fromEntries(parties.map(party => [party, 
        !normalize ? 
            impacts_.map(([_, value]) => value[party]).reduce((a, b) => a + b, 0) / 100
            :
            1
    ]));

    var yMin = 0;
    // if (!normalize) {
    //     const firstImpact = order[impacts_.map(([i, _]) => order.indexOf(i)).reduce((a, b) => Math.min(a, b), order.length+1)];
    //     if (firstImpact) {
    //         const values = parties.map(p => impacts[id][firstImpact][p] / factors[p]);
    //         const lowestFirstImpact = values.reduce((a, b) => Math.min(a, b), values[0]);
    //         yMin = lowestFirstImpact > 95 ? 90 : lowestFirstImpact > 85 ? 80 : lowestFirstImpact > 80 ? 75 : lowestFirstImpact > 60 ? 50 : 0;
    //     }
    // }

    const series = impacts_.map(([impact, impacts_]) => ({
        label: t(impact), stack: 'total', color: colorFor(id, impact), id: impact,
        data: parties.map(party => Math.round((impacts_[party] || 0) / (factors[party]) || 1)),
    })).sort((a, b) => order.indexOf(a.id) > order.indexOf(b.id) ? 1 : -1)

    const xAxis = [{data: parties.map(p => shortNames[p]), height: 65, scaleType: 'band', tickLabelStyle: {angle: 90, textAnchor: 'start', fontSize: 9}}];
    const yAxis = [{label: !normalize ? t('Votes (%)') : t('Votes'),
                    ...(!normalize ? {min: yMin, max: 100}: {}),
                    width: 65, fill: yMin > 0 ? '#dc002d': '#000', tick: yMin > 0 ? '#dc002d': '#000', }];

    const barClick = (e, item) => {
        const party = parties[item['dataIndex']];
        const impact = item['seriesId'];
        addImpactFilter(id, party, impact);
    };
    
    return <Box>
        <Typography variant="h6">{title} <IconButton onClick={() => setExplanation(id)}><InfoOutlineIcon/></IconButton></Typography>
        <BarChart height={250} series={series} xAxis={xAxis} yAxis={yAxis} hideLegend={!use_neutral_color_for.includes(id)} onItemClick={barClick} />
    </Box>
}

function SymbolismChart() {
    const { symbolism, parties, normalize, binary, addImpactFilter, setExplanation, } = useData();

    const order = ['Voor', 'Tegen', 'Onthouden', 'Niet gestemd'];
    if (!('symbolisch' in symbolism))
        return <p>{t("No symbolic votes.")}</p>;

    const symbolic = symbolism['symbolisch'];
    const symbolic_ = !binary ? Object.entries(symbolic).filter(([vote, _]) => binaryColumns.includes(vote)) : Object.entries(symbolic);

    const factors = Object.fromEntries(parties.map(party => [party, 
        normalize ? 1 : (
            symbolic_.map(([_, vote_data]) => vote_data[party]).reduce((a, b) => a + b, 0) / 100
        )
    ]))
    
    const series = symbolic_.map(([vote, vote_data]) => ({
        label: t(vote), stack: 'total', id: `${vote}`, color: colorFor('symbolism', vote),
        data: parties.map(party => (vote_data[party] || 0) / (factors[party] || 1)),
    })).sort((a, b) => order.indexOf(a.id) > order.indexOf(b.id) ? 1 : -1)

    const xAxis = [{data: parties.map(p => shortNames[p]), height: 65, scaleType: 'band', tickLabelStyle: {angle: 90, textAnchor: 'start', fontSize: 9}}];
    const yAxis = [{label: !normalize ? t('Votes (%)') : t('Votes'),
                    ...(!normalize ? {min: 0, max: 100}: {}),
                    width: 65, }];
    
    const barClick = (e, item) => {
        const party = parties[item['dataIndex']];
        const vote = item['seriesId'];
        addImpactFilter("doel", party, "symbolisch", vote);
    };
    return <Box>
        <Typography variant="h6">{t("Symbolism")} <IconButton onClick={() => setExplanation("doel")}><InfoOutlineIcon/></IconButton></Typography>
        <BarChart height={250} series={series} xAxis={xAxis} yAxis={yAxis} onItemClick={barClick}/>
    </Box>
}


function PropertyChart({vote, property}) {
    const { behaviors, parties, normalize, binary, addImpactFilter, setExplanation, } = useData();

    if (!(property in behaviors || !(vote in behaviors[property].counts)))
        return <p>{t("No votes.")}</p>;

    const behavior = behaviors[property].counts[vote];
    const behavior_ = !binary ? Object.entries(behavior).filter(([value, _]) => binaryColumns.includes(value)) : Object.entries(behavior);

    const factors = Object.fromEntries(parties.map(party => [party, 
        normalize ? 1 : (
            behavior_.map(([_, value_data]) => value_data[party]).reduce((a, b) => a + b, 0) / 100
        )
    ]))
    
    const series = behavior_.map(([value, value_data]) => ({
        label: t(value), stack: 'total', id: `${value}`, color: colorFor(property, value),
        data: parties.map(party => (value_data[party] || 0) / (factors[party] || 1)),
    })).sort((a, b) => order.indexOf(a.id) > order.indexOf(b.id) ? 1 : -1)

    const xAxis = [{data: parties.map(p => shortNames[p]), height: 65, scaleType: 'band', tickLabelStyle: {angle: 90, textAnchor: 'start', fontSize: 9}}];
    const yAxis = [{label: !normalize ? t('Votes (%)') : t('Votes'),
                    ...(!normalize ? {min: property === 'financieringsbron' ? 75 : 0, max: 100}: {}),
                    width: 65, }];


    const barClick = vote => ((e, item) => {
        const party = parties[item['dataIndex']];
        const value = item['seriesId'];
        addImpactFilter(property, party, value, vote);
    });
    
    return <Box>
        <Typography variant="h6">{t(property)} ({t(vote)}) <IconButton onClick={() => setExplanation(property)}><InfoOutlineIcon/></IconButton></Typography>
        <BarChart height={250} series={series} xAxis={xAxis} yAxis={yAxis} onItemClick={barClick(vote)}/>
    </Box>
}

export function ParliamentaryVotes({}) {
    const { t } = useTranslation();
    const { loading, error, metadata, binary, showDecisions,
        impactFilters, removeImpactFilter, informationOpen, setInformationOpen,
        showBeneficiaries, } = useData();
    
    
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

    const impactFilters_ = impactFilters.map(([area, party, impact, vote]) => <Chip key={`${area}-${party}-${impact}-${vote}`} color="primary" style={{marginLeft: '10px'}} label={`${party} | ${t("f_" + impact)} | ${t(area)}${vote ? ' | ' + t(vote) : ''}`} variant="outlined" onDelete={() => removeImpactFilter(area, party, impact, vote)}/>);

    return <><Box sx={{p: 0, mx:'auto'}}>
        
        <Grid container width="100%">
            <Grid key="decisions-box" size={{lg: 3, md: 4, sm: 12, xs: 12}} display="flex" flexDirection="column" className={`${!showDecisions ? "hide-sm " : ""}`}>
                <Box key="n-decisions" mt={2}><Typography variant="h6">{metadata.length} {t('decisions')}{impactFilters_}</Typography></Box>
                <DecisionsList key="decisions-list" decisions={metadata}/>
            </Grid>
            <Grid key="graphs-box" container size={{lg: 9, md: 8}} className={`fill-vertically sm-full-width ${showDecisions ? "hide-sm " : ""}`}>
                {!showBeneficiaries ? <Grid key="legend" size={12} p={5}>
                    <Typography variant="h6">
                        Wat was het effect van de stemmen, als het besluit die kant op gevallen was?
                    </Typography>
                    
                    {Object.entries(legendItems).map(([color, items]) => {
                        return <p key={`legend-item-${items[0]}`}><span style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: color}}/>&nbsp;{items.join(", ")}</p>
                    })}
                </Grid> : undefined}
                {impactFilters.length > 0 ? <Grid key="area-filter" size={12} p={2} className="show-sm">{impactFilters_}</Grid>: undefined}
                
                {!showBeneficiaries ? impactKeys.map(key => <Grid key={key} size={{'xs': 12, 'sm': 12, 'md': 6, lg: 4}}>
                    <ImpactChart id={key} title={t(key)} key={key} /></Grid>) :
                    <Grid key="beneficiaries" size={12} p={0}><Beneficiaries/></Grid>}

                    {!showBeneficiaries ? <Grid key="symbolism-chart" size={{'xs': 12, 'sm': 12, 'md': 6, 'lg': 4}}>
                        <SymbolismChart />
                    </Grid> : undefined}
                    <Grid key="clear-01" size={12}>
                        <Typography variant="h6">
                            Haalbaarheid van besluiten, stemmen partijen voor of tegen?
                        </Typography>
                    </Grid>
                    {!showBeneficiaries ? properties.map(property => <Grid key={`${property}-chart`} size={{'xs': 12, 'sm': 12, 'md': 6, 'lg': 4}}>
                        <PropertyChart key="voor" vote="Voor" property={property}/>
                        <PropertyChart key="tegen" vote="Tegen" property={property}/>
                    </Grid>) : undefined}
            </Grid>
        </Grid>
    </Box>{infoDialog}<AnnotationDialogue/></>
}
