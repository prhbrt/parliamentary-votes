import React, { useState } from 'react';


import HealthIcon from '@mui/icons-material/Healing';
import EconomyIcon from '@mui/icons-material/Factory';
import TaxIcon from '@mui/icons-material/AccountBalance';
import EnvironmentIcon from '@mui/icons-material/EnergySavingsLeaf';
import RightsIcon from '@mui/icons-material/EmojiPeople';
import SecurityIcon from '@mui/icons-material/Security';
import SocialSecurityIcon from '@mui/icons-material/Tag';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Alert, AlertTitle } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

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
                        <Tab label="Nerdy Stuff"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={informationTab} index={0}>

    <Alert severity="warning" icon={<WarningAmberIcon fontSize="inherit" />}sx={{
        borderRadius: 2, boxShadow: 2, bgcolor: "warning.light", color: "black", mb: 2, }}>
      <AlertTitle>AI was used to analyze data.</AlertTitle>
      The decisions have been <strong>analyzed by artificial intelligence</strong>.
      Although we tried to ensure accuracy, some analyses may be incorrect.
      Please be aware that some statistics and information shown may be inaccurate or incorrect.</Alert>

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
                    <h2>Beneficiaries</h2>
                    <p>For both in favour and against votes, there are beneficiaries. They are only accessible on a wide computer screen.
                        These mostly make sense when showing relative numbers, in this case they are devided bu the number of seats in parlement.
                        This is relevant, because a beneficiary is counted for each vote, since a party might not vote uniformly.
                    </p>

                    <h2>Realism and finances</h2>
                    <p>Each decision is also evaluated on its realism-symbolism purpose and whether it includes a cost strategy.</p>
                    <ul>
                        <li><strong>realistic</strong> procedural accuracy and plausible politics, e.g. budget changes, new laws, sanctions</li>
                        <li><strong>neutral</strong> both realistic and symbolic</li>
                        <li><strong>symbolic</strong> allegory, e.g. condemn a war or conflict.</li>
                    </ul>
                    <p>Some deicisions lack this annotation. Furthermore, if the decision is about spending more money, does it also
                        include where the money should come from? You can choose to only show decisions with a financial backing.</p>
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
                        <li>Document text length longer than 15,000 characters excluded (limit of the AI)</li>
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
                <TabPanel value={informationTab} index={3}>
                    <h2>Nerdy stuff</h2>
                    <p>If you have access to an LLM, like chatgpt or mistral, you can reproduce the results with the two notebooks in <a href="https://github.com/prhbrt/parliamentary-votes" target="_blank">this repository</a></p>

                    <p>These are the prompt and the (pydantic) annotation schema used for the in-context learning using guided generation and <code>mistral-3.2-24B-2506</code>.</p>

                    <h3>Prompt</h3>
                    <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'monospace', paddingLeft: '30px'}}>
{String.raw`You are a parliamentary voting annotator.
Return ONLY a JSON object that matches the provided JSON Schema exactly.
If information is missing, infer conservatively and set *_impact fields to 'unclear'.

Evaluate fiscal and cost tags from the perspective of government expenditure only.
If the motion shifts cost to individuals, that means the state saves; if it shifts cost to the state, that means the state spends.

Always interpret “Pro vote” as voting in favor of the motion text, and “Con vote” as voting against it.

Base all assessments on the intended effects the motion requests from the government, not on hypothetical outcomes of other policies.

Use “unclear” rather than guessing when impacts are ambiguous.


# purpose
Generate or analyze the voting/motion scene according to the realism–symbolism purpose:
"realistic" → emphasize procedural accuracy and plausible politics E.g. change budget, introduce new law, introduce sanctions;
"mixed/transitional" → merge realism with metaphor;
"symbolic" → render the vote as pure allegory. E.g. condemn a war or conflict,
"n/a" → no stylistic constraint.


# includes_cost_stategy
If the decision is about spending more money, does it also include where the money should come from?

Fiscal and cost impacts
 * Fiscal tags (fiscal_tag_pro_vote / fiscal_tag_con_vote) refer to government budget effects only — not private costs or prices.
 * "saves" → government spends less or collects more.
 * "costs" → government spends more or collects less.
 * "budget-neutral" → roughly no fiscal change.
 * "unclear" → not enough detail to tell.

Cost impacts (cost_impact_*) describe overall economic costs or financial burden on society, not just on government.
 * "lower" means overall cost burden decreases.
 * "higher" means overall cost burden increases.

Avoid automatic mirroring; evaluate pro and con sides independently.

Rights impacts
 * "expands" → extends, protects, or strengthens individual rights or access (e.g., privacy, asylum, healthcare).
 * "restricts" → limits or removes such rights.
 * "neutral" → no relevant rights dimension.

If the motion changes enforcement, data use, or oversight, treat it as affecting rights.

Environment impacts
Assess only if the motion directly or foreseeably affects environmental regulation, agriculture, nitrogen, energy, or sustainability.
Otherwise use "n/a".

Security impacts
 * "improves" → enhances safety, counter-terrorism, or law enforcement capability.
 * "worsens" → reduces or undermines security capacity.
 * "neutral" → not relevant to safety or security.
 * "unclear" → possible mixed effects.

Claimed beneficiaries
Identify who the motion explicitly aims to help or protect (“claimed beneficiaries pro vote”).
Identify who benefits from rejecting the motion or maintaining the status quo (“claimed beneficiaries con vote”).
Use groups (e.g., refugees, taxpayers, farmers, healthcare workers) rather than individuals.

Notes
 * Use "notes" for concise reasoning behind your tagging (2–4 sentences).
 * Mention key trade-offs (e.g., rights vs. security, fiscal savings vs. social cost).
 * Example micro-rule summary (can be pasted in the system prompt)

“Evaluate from the government perspective.
‘Saves’ = reduces state spending; ‘Costs’ = increases it.
Do not assume symmetry between pro and con tags.
Distinguish private costs from fiscal costs.
Mark impacts as ‘unclear’ or ‘n/a’ if not directly affected.”

Schema:
...PADANTIC ANNOTATION SCHEMA...`}
                    </pre>
                    <h3>Annotation schema</h3>
                    <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'monospace', paddingLeft: '10px'}}>
{String.raw`class VoteAnnotation(BaseModel):
    topic: Literal[
  'Immigration / asylum policy',
  'Nitrogen ("stikstof") / agriculture ',
  'Environmental regulation',
  'Animal wellfare',
  'Housing and real estate / housing shortage'
  'Climate & energy policy / sustainability / decarbonisation',
  'Healthcare and long-term care funding / capacity',
  'Digitalization, software sovereignty, cybersecurity',
  'Government stability, coalition collapse, confidence motions',
  'European Council on Refugees and Exiles',
  'Parliamentary inquiries / oversight - COVID-19 response',
  'Parliamentary inquiries / oversight -Groningen gas extraction',
  'Public finances and budgeting / taxation',
  'International / foreign policy - Ukraine / Russia',
  'International / foreign policy - Palestina / Israel',
  'International / foreign policy - Middle East',
  'International / foreign policy - Other',
  'Other',
]
    purpose: Literal["realistic", "mixed/transitional", "symbolic", "n/a"] = "n/a"
    includes_cost_stategy: Literal["yes","no","unclear","n/a"] = "n/a"

    summary_of_decision: str = ""
    beneficiaries_of_vote_in_favor: List[str] = []
    beneficiaries_of_vote_against: List[str] = []

    economic_cost_impact_of_vote_in_favor: Literal["lower","neutral","higher","unclear", "n/a"] = "n/a"
    economic_cost_impact_of_vote_against: Literal["lower","neutral","higher","unclear", "n/a"] = "n/a"

    environment_impact_of_vote_in_favor: Literal["improves","neutral","worsens","unclear", "n/a"] = "n/a"
    environment_impact_of_vote_against: Literal["improves","neutral","worsens","unclear", "n/a"] = "n/a"

    security_impact_of_vote_in_favor: Literal["improves","neutral","worsens","unclear", "n/a"] = "n/a"
    security_impact_of_vote_against: Literal["improves","neutral","worsens","unclear", "n/a"] = "n/a"

    social_security_impact_of_vote_in_favor: Literal["improves","neutral","worsens","unclear", "n/a"] = "n/a"
    social_security_impact_of_vote_against: Literal["improves","neutral","worsens","unclear", "n/a"] = "n/a"

    healthcare_impact_of_vote_in_favor: Literal["improves","neutral","worsens","unclear", "n/a"] = "n/a"
    healthcare_impact_of_vote_against: Literal["improves","neutral","worsens","unclear", "n/a"] = "n/a"

    rights_impact_of_vote_against: Literal["expands","neutral","restricts","unclear", "n/a"] = "n/a"
    rights_impact_of_vote_in_favor: Literal["expands","neutral","restricts","unclear", "n/a"] = "n/a"

    fiscal_tag_of_vote_against: Literal["saves","costs","budget-neutral","unclear", "n/a"] = "n/a"
    fiscal_tag_of_vote_in_favor: Literal["saves","costs","budget-neutral","unclear", "n/a"] = "n/a"
    notes: Optional[str] = None`}
                    </pre>
                </TabPanel>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setInformation(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Info;