

import React, { useState } from 'react';


import HealthIcon from '@mui/icons-material/Healing';
import EconomyIcon from '@mui/icons-material/Factory';
import TaxIcon from '@mui/icons-material/AccountBalance';
import EnvironmentIcon from '@mui/icons-material/EnergySavingsLeaf';
import RightsIcon from '@mui/icons-material/EmojiPeople';
import SecurityIcon from '@mui/icons-material/Security';
import SocialSecurityIcon from '@mui/icons-material/Tag';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { Dialog, DialogContent, DialogActions, AppBar, Tabs, Tab, Button, Box } from '@mui/material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`info-tabpanel-${index}`}
            aria-labelledby={`info-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function Info({ information, setInformation }) {
    const [informationTab, setInformationTab] = useState(0);

    return (
        <Dialog fullWidth={true} maxWidth="md" open={information} onClose={() => setInformation(false)}>
            <DialogContent>
                <AppBar position="static">
                    <Tabs value={informationTab} onChange={(_, i) => setInformationTab(i)} indicatorColor="secondary" textColor="inherit" variant="fullWidth" aria-label="full width tabs example">
                        <Tab label="About"/>
                        <Tab label="Methodology"/>
                        <Tab label="Data & AI Processing"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={informationTab} index={0}>
                    <h2>About Parliamentary Votes Analysis</h2>
                    <p>This website provides an interactive analysis of parliamentary voting patterns in the Dutch House of Representatives (Tweede Kamer). It visualizes how different political parties have voted on various motions and decisions, categorized by topics and impacts.</p>
                    <p>The analysis covers parliamentary decisions from December 2023 onwards, focusing on motions that were voted on. Each decision is analyzed using AI to determine its topic, potential impacts, and beneficiaries.</p>
                    <h2>About the Dutch Parliament</h2>
                    <p>The Netherlands is a parliamentary democracy. The parliament is called the Staten-Generaal and consists of two chambers: the House of Representatives (Tweede Kamer) and the Senate (Eerste Kamer). The House of Representatives has 150 members elected directly by Dutch citizens through proportional representation.</p>
                    <p><a href="https://www.tweedekamer.nl/zo-werkt-de-kamer" target="_blank" rel="noreferrer">More information about the Dutch parliament</a></p>
                    <h2>Data Sources</h2>
                    <p>The voting data is sourced from the official Dutch parliament's open data API (<a href="https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/" target="_blank" rel="noreferrer">Tweede Kamer Gegevensmagazijn</a>). Document texts are retrieved from <a href="https://zoek.officielebekendmakingen.nl/" target="_blank" rel="noreferrer">Officiële Bekendmakingen</a>.</p>
                    <h2>Credits</h2>
                    <p>This project is developed by researchers at the University of Groningen, including Herbert Kruitbosch and others from the Center for Information Technology.</p>
                    <h2>Contact</h2>
                    <p>For questions and comments, please contact the development team at the University of Groningen.</p>
                </TabPanel>
                <TabPanel value={informationTab} index={1}>
                    <h2>How to Use This Tool</h2>
                    <p>On the right side of the screen, you can customize the visualization by selecting topics, parties, and impact categories. Use the filters to narrow down the decisions and see voting patterns.</p>
                    <p>The left panel shows the list of parliamentary decisions. Click on any decision to see detailed voting information and analysis.</p>
                    <h2>Data Categories</h2>
                    <p>Each parliamentary decision is categorized by topic and analyzed for various impacts:</p>
                    <ul>
                        <li><strong>Topics:</strong> Immigration, environment, healthcare, economy, etc.</li>
                        <li><strong>Impacts:</strong> Economic costs, environmental effects, social security, rights, security, healthcare, and fiscal implications.</li>
                        <li><strong>Beneficiaries:</strong> Who benefits from voting in favor or against the motion.</li>
                    </ul>
                    <h2>Voting Analysis</h2>
                    <p>The analysis shows how each party voted on motions, weighted by the number of seats they hold. This provides insight into party positions on various issues.</p>
                    <h2>Decision Types</h2>
                    <p>The data includes various types of parliamentary decisions such as motions, amendments, and other voting matters from December 2023 onwards.</p>
                    <h2>Impacts</h2>
                    <p>These impacts were analysed, colored icons represent the impact of a favorable vote.</p>
                    <ul>
                        <li><HealthIcon fontSize='small'/> healthcare impact</li>
                        <li><EconomyIcon fontSize='small'/> economy impact</li>
                        <li><TaxIcon fontSize='small'/> fiscal impact</li>
                        <li><EnvironmentIcon fontSize='small'/> environmental impact</li>
                        <li><RightsIcon fontSize='small'/> human rights impact</li>
                        <li><SecurityIcon fontSize='small'/> security impact</li>
                        <li><SocialSecurityIcon fontSize='small'/> social security impact</li>
                    </ul>
                </TabPanel>
                <TabPanel value={informationTab} index={2}>
                    <h2>Data Gathering and Processing</h2>
                    <p>The data for this analysis was collected using automated scripts that fetch information from the official Dutch parliament's open data API. The process involves several steps:</p>
                    <ol>
                        <li><strong>Fetching Decisions:</strong> Parliamentary decisions (besluiten) are retrieved from the <a href="https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/" target="_blank" rel="noreferrer">Tweede Kamer Gegevensmagazijn API</a> starting from December 6, 2023.</li>
                        <li><strong>Fetching Votes:</strong> Individual votes (stemmingen) for each decision are collected, including party affiliations and vote weights.</li>
                        <li><strong>Fetching Documents:</strong> Associated documents and their metadata are retrieved.</li>
                        <li><strong>Text Extraction:</strong> Full text content is extracted from official publications on <a href="https://zoek.officielebekendmakingen.nl/" target="_blank" rel="noreferrer">Officiële Bekendmakingen</a>.</li>
                    </ol>
                    <h2>Data Filters and Criteria</h2>
                    <p>Several filters are applied to ensure data quality:</p>
                    <ul>
                        <li>Only decisions with associated votes (StemmingsSoort not null)</li>
                        <li>Exclude suspended votes ("Stemmen - gestaakt") and postponed votes ("Stemmen - aangehouden", "Stemmen - uitstellen")</li>
                        <li>Only include decisions modified after December 6, 2023</li>
                        <li>Document text length longer than 5,000 characters excluded (limit of the AI)</li>
                    </ul>
                    <h2>AI Processing</h2>
                    <p>Document texts are analyzed using a Large Language Model (Mistral-Small-3.2-24B-Instruct) hosted at the University of Groningen's HPC facility. The AI categorizes each decision by:</p>
                    <ul>
                        <li><strong>Topic:</strong> One of predefined categories like immigration, environment, healthcare, etc.</li>
                        <li><strong>Summary:</strong> A concise summary of the decision in 3-5 paragraphs</li>
                        <li><strong>Impacts:</strong> Assessment of economic, environmental, social, security, healthcare, rights, and fiscal impacts</li>
                        <li><strong>Beneficiaries:</strong> Groups that benefit from voting in favor or against (Not shown on this website)</li>
                    </ul>
                    <h2>AI Prompt Structure</h2>
                    <p>The AI uses a structured prompt that defines specific evaluation criteria for each impact category, ensuring consistent and objective analysis. The prompt emphasizes conservative inference when information is missing and distinguishes between government fiscal impacts and broader economic costs.</p>
                    <p>All AI processing is cached to ensure reproducibility and efficiency.</p>
                </TabPanel>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setInformation(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Info;