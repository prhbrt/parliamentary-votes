import React, { useState } from "react";

import './Layout.css';

import { Popup } from "../legal/Popups";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function Layout({children}) {
    const [showPopup, setShowPopup] = useState(false);
    const { t, i18n } = useTranslation();

    return <>
        <Box className="no-print">
            <Header/>
            <div className="rug-content">
                {children}
                
            </div>
            <div className="share-links" style={{textAlign: "center", marginTop: '30px', minHeight: '100px'}}>
                <a href={`whatsapp://send?text=${t("Go to Esther Mettings page!")}`} data-action="share/whatsapp/share">{t('Share via Whatsapp')}</a>
                &nbsp;&bull;&nbsp;
                <a href={`mailto:?subject=${t("Great!")}&body=${t("Go to Esther Mettings page!")}`}>{t('Share via Email')}</a>
            </div>
            <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}/>
        </Box>
    </>
}