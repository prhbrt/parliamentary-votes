import React, { useState } from "react";

import {Box, Tab, Tabs, AppBar, Button, Dialog, DialogActions, DialogContent} from "@mui/material";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
             aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}


export function Popup({ isOpen, onClose }) {
    const [openTab, setOpenTab] = useState(0);
    
    return (<Dialog fullWidth={true} maxWidth="md" open={isOpen} onClose={onClose}>
            <DialogContent>
                <AppBar position="static">
                    <Tabs value={openTab} onChange={(_, i) => setOpenTab(i)} indicatorColor="secondary" textColor="inherit" variant="fullWidth" aria-label="full width tabs example">
                        <Tab label="Privacyverklaring"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={openTab} index={0}>
                    <h3>Privacyverklaring acceptatie voornaamwoorden</h3>

                    <h4>Inleiding</h4>
                    <p>
                        De Rijksuniversiteit Groningen (RUG) wil zorgvuldig omgaan met uw persoonsgegevens. Op grond van de
                        privacywetgeving, die de RUG in acht neemt, is de RUG daar ook verantwoordelijk voor. In deze
                        privacyverklaring wordt u geïnformeerd over hoe de RUG gegevens van u verwerkt en over de rechten die u
                        hebt. Deze privacyverklaring is een aanvulling op de <a href="https://www.rug.nl/info/privacy">
                        Privacyverklaring van de RUG</a>. Bij tegenstrijdigheid prevaleert deze privacyverklaring.
                    </p>

                    <h4>Contactgegevens verantwoordelijke</h4>

                    <p>U kunt met uw vragen en verzoeken bij de RUG terecht. U kunt terecht bij:</p>

                    <p>Rijksuniversiteit Groningen</p>
                    <p>Postadres: Postbus 72 9700 AB Groningen</p>
                    <p>E-mail: privacy@rug.nl</p>
                    <p>Functionaris voor de Gegevensbescherming: Arjen Deenen</p>

                    <h4>Doel en grondslag verwerking</h4>

                    <p>
                        We verzamelen geen van uw persoonlijke gegevens. Verder slaan we uw antwoorden ook niet op, bevalve voor de korte tijd op
                        deze computer en alleen totdat u de pagina sluit of op "Alles herstellen" klikt.
                    </p>
                    
                    <p>De RUG wil met deze website onderzoeksresultaten delen.</p>

                    <h4>Verwerkte persoonsgegevens</h4>

                    <p>We verzamelen geen persoonsgegevens.</p>
                    
                    <h4>Ontvangers van uw persoonsgegevens</h4>

                    <p>We delen geen persoonsgegevens.</p>

                    <h4>Bewaartermijnen</h4>

                    <p>Wanneer u de pagina sluit of op "Alles herstellen" klikt zijn al uw antwoorden weg.</p>

                    <h4>Uw rechten</h4>

                    <p>Mocht u vragen hebben, dan kunt u contact opnemen met de ontwikkelaar van de site datascience@rug.nl,
                        de onderzoeker Morana Lukač of met de eerder genoemde Functionaris voor de Gegevensbescherming.</p>

                    <h4>Veranderingen in deze privacyverklaring</h4>
                    <p>
                        De RUG kan deze privacyverklaring wijzigen. Aanleiding hiervoor kan zijn: (wijziging van)wet- en regelgeving,
                        wijziging in het overkoepelende privacybeleid van de RUG en voortschrijden van de techniek. Uiteraard wordt u
                        hiervan tijdig op de hoogte gesteld.
                    </p>
                </TabPanel>
            </DialogContent>
            <DialogActions><Button onClick={onClose}>Sluiten</Button></DialogActions>
        </Dialog>);
}