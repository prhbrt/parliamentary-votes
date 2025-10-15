import * as React from 'react';
import { useState } from 'react';
import { Container, Grid, Box, Menu, FormControl, Select, InputLabel, MenuItem, Switch, TextField } from '@mui/material';

import './Layout.css';
import "../../rug-huisstijl.css"
import logo from "../../images/logo--en.png"
import logo_only from "../../images/logo.gif"
import {Link, useParams, useLocation} from "react-router-dom";
import Hamburger from 'hamburger-react'

import { useTranslation } from 'react-i18next';

import { useData } from '../../hooks/useData';



export function Filters() {
    const { topics, topic, setTopic, setKeywords, binary, setBinary, normalize, setNormalize } = useData();
    const { t } = useTranslation();

    return <>
            <TextField style={{ flexGrow: 1}} id="keywords" label={t("Keywords")} placeholder={t("Keywords")} variant="standard" onChange={e => setKeywords(e.target.value)}/>
            <Select labelId="topic-select-label" id="topic-select" variant="standard"
                    flexGrow={0} style={{width: "500px"}}
                    value={topic} onChange={(e) => setTopic(e.target.value)}>
                <MenuItem value="all" key="all">{t("All topics")}</MenuItem>
                {topics.map(topic => <MenuItem key={topic} value={topic}>{t(topic)}</MenuItem>)}
            </Select>
            <Box flexGrow={0} style={{width: "230px"}} p={1}><Switch label={t("Normalize")} defaultChecked onChange={()=> setNormalize(!normalize)} />&nbsp;{!normalize ? t("Relative") : t("Absolute")}</Box>
            <Box flexGrow={0} style={{width: "230px"}} p={1}><Switch label={t("Binary")} defaultChecked onChange={()=> setBinary(!binary)} />&nbsp;{!binary ? t("Two values") : t("All values")}</Box>
        </>

}
