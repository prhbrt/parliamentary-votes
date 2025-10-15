import * as React from 'react';
import { Container, Grid, Box, Menu, MenuItem } from '@mui/material';

import './Layout.css';
import "../../rug-huisstijl.css"
import logo from "../../images/logo--en.png"
import logo_only from "../../images/logo.gif"
import {Link, useParams, useLocation} from "react-router-dom";
import Hamburger from 'hamburger-react'

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Filters } from './Filters';
import { useData } from '../../hooks/useData';


function LanguageMenu() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const lang = i18n.language;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function setLanguage(language) {
    return () => {
      i18n.changeLanguage(language)
      handleClose();
    }
  }

  return (
    <>
      <Link style={{backgroundColor: '#dc002d'}} id="language-link" aria-controls={open ? 'language-link-menu' : undefined}
            aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
              {t("Language")}
      </Link>
      <Menu id="language-link-menu" aria-labelledby="language-link" anchorEl={anchorEl} open={open}
           onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                                 transformOrigin={{ vertical: 'top', horizontal: 'right', }}>
        <MenuItem className={`language-item ${lang === "nl" ? "active " : ""}`} key="nl" onClick={setLanguage("nl")}>{t('Dutch')}</MenuItem>
        <MenuItem className={`language-item ${lang === "en" ? "active " : ""}`} key="en" onClick={setLanguage("en")}>{t('English')}</MenuItem>
      </Menu>
    </>
  );
}


function LanguageMenuSmall() {
  const { t, i18n } = useTranslation();
  const {showDecisions, setShowDecisions} = useData();

  const lang = i18n.language;
  
  function setLanguage(language) {
    return () => { i18n.changeLanguage(language) }
  }

  return (
      <Box display="flex" flexDirection="row">
        <Link className={`${lang === "nl" ? "active " : ""}`} key="nl" onClick={setLanguage("nl")}>{t('Dutch')}</Link>
        <Link className={`${lang === "en" ? "active " : ""}`} key="en" onClick={setLanguage("en")}>{t('English')}</Link>
      </Box>
  );
}


export function Header({}) {
  const { t, i18n } = useTranslation();
  const location = useLocation()
  const {showDecisions, setShowDecisions, isOpen, setOpen } = useData();

  var active = "questionaire";
  if (location.pathname.startsWith('/about')) active = "about";
  else if(location.pathname.startsWith('/contact')) active = "contact";
  else if(location.pathname.startsWith('/activities-and-outreach')) active = "activities-and-outreach";

  return (<>
    <div key="top-bar" className="bar-shadow hide-sm"><Container maxWidth="xl"><Grid container spacing={0}>
      <Grid size={8}>
        <img src={logo} alt="Rijksuniversiteit Groningen"/>
        {t('founded in 1614 - top 100 university')}
      </Grid>
      <Grid size={4}>
        {t('Parliamentary votes')}
      </Grid>
    </Grid></Container></div>
    <div key="second-top-bar" className="rug-bar">
      <Box display="flex" height="100%">
        <Box className="slash-bg" width={150} flexShrink={0} p={0}>
          <img className="show-sm" src={logo_only} alt="UG" style={{marginTop: '5px', height: '40px', marginLeft: '20px'}}/>
        </Box>
        <Box flex={1} minWidth={0} p={0} gap={0} flexDirection="row-reverse" display="flex">
          <Box className="hide-sm" display="flex" flexDirection="row-reverse"><LanguageMenu/></Box>
          <Box className="hide-sm" display="flex" flexDirection="row-reverse" flexGrow={1}><Filters/></Box>
          <Box className="show-sm" display="flex" flexDirection="row-reverse">
            <Hamburger color="white" toggled={isOpen} toggle={setOpen}/>
            <Box color="white" style={{lineHeight: '50px', }} flexGrow={1}>{t('Parliamentary votes')}</Box>
          </Box>
        </Box>
      </Box>
    </div>
    <Box key="top-bar-menu" className={`show-sm mobile-links ${isOpen? 'open ' : 'closed '}`}><Box>
      <Box display="flex" flexDirection="row">
        <Link className={`${showDecisions ? "active " : ""}`} key="nl" onClick={() => setShowDecisions(true)}>{t('Decisions')}</Link>
        <Link className={`${!showDecisions ? "active " : ""}`} key="en" onClick={() => setShowDecisions(false)}>{t('Impacts')}</Link>
      </Box>
      <Box className="show-sm" display="flex" flexDirection="column-reverse" flexGrow={1} style={{backgroundColor: 'white'}}><Filters/></Box>
      <LanguageMenuSmall/>
    </Box></Box>
  </>);
}