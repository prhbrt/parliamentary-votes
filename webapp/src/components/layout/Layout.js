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
        <Header/>
        <div className="rug-content">
            {children}
        </div>
        <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}/>
    </>
}