import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Box, Paper, Typography, Button, IconButton, List, ListItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs } from '@mui/material';

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

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useData } from "../../hooks/useData";

export function ParliamentaryVotes({}) {
    var [showPopUp, setShowPopUp] = useState(false);
    const [tab, setTab] = React.useState(0);
    const { t } = useTranslation();
    const theme = useTheme();
    const { data, reset } = useData();


    
    return <Box sx={{pt:3,pb:3,mx:'auto', maxWidth: '1200px'}}>
        <Box display="flex" flexDirection="row-reverse">
            <Button variant="outlined" onClick={reset}>{t("Start again")}</Button>&nbsp;
        </Box>
    </Box>
}
