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
                        <Tab label="Over"/>
                        <Tab label="Methodologie"/>
                        <Tab label="Data & AI-Verwerking"/>
                        <Tab label="Technische Informatie"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={informationTab} index={0}>

    <Alert severity="warning" icon={<WarningAmberIcon fontSize="inherit" />} sx={{
        borderRadius: 2, boxShadow: 2, bgcolor: "warning.light", color: "black", mb: 2, }}>
      <AlertTitle>AI is gebruikt om data te analyseren.</AlertTitle>
      De beslissingen zijn <strong>geanalyseerd door kunstmatige intelligentie</strong>.
      Hoewel we hebben geprobeerd de nauwkeurigheid te waarborgen, kunnen sommige analyses onjuist zijn.
      Houd er rekening mee dat sommige getoonde statistieken en informatie onnauwkeurig of foutief kunnen zijn.</Alert>

                    <h2>Over de Analyse van Parlementaire Stemmingen</h2>
                    <p>Deze website biedt een interactieve analyse van stemgedrag in de Tweede Kamer. Het visualiseert hoe verschillende politieke partijen hebben gestemd over moties en besluiten, gecategoriseerd op onderwerp en impact.</p>
                    <p>De analyse bestrijkt parlementaire besluiten vanaf december 2023, met de nadruk op moties waarover is gestemd. Elk besluit is door AI geanalyseerd om het onderwerp, de mogelijke impact en de begunstigden te bepalen.</p>

                    <h2>Hoe het werkt</h2>
                    <p>
                        Omdat de impact van een stemming relevanter is dan de ruwe stem, heeft de AI impacts toegewezen aan alle besluiten op basis van de documenttekst voor <strong>zowel een stem voor als tegen</strong>.
                        Voor elk besluit en elke partij is de impact gebaseerd op hoe er gestemd is — of nauwkeuriger: hoeveel zetels voor of tegen stemden.
                        
                        Bijvoorbeeld: als GroenLinks-PvdA met 25 zetels vóór een motie stemde om het gebruik van PFAS te verbieden, en vervolgens tegen een motie om supermarkten te verplichten altijd gratis plastic zakjes te geven, dan is hun milieu-impact van deze twee stemmen 50 zetels ‘verbeterend’. 
                        Omdat ze 25 zetels vóór iets stemden dat het milieu zou verbeteren en 25 zetels tegen iets dat het milieu zou verslechteren.
                    </p>

                    <h2>Wat zijn begunstigden?</h2>
                    <p>
                        De AI heeft ook begunstigden bepaald voor elk besluit — dus wie profiteert van een stem vóór of tegen de motie. Ze worden gecorreleerd met de zetels die in hun voordeel stemden per partij. Deze zetelstemmen worden als tabel weergegeven, en je kunt ze normaliseren ten opzichte van het aantal zetels dat een partij heeft. Dit is een vrij-tekstveld dat de AI gebruikt heeft, dus er zijn er veel.
                    </p>

                    <h2>Waarom is deze website traag?</h2>
                    <p>
                        Alle data wordt lokaal op je telefoon of computer geladen en daar gefilterd. Dat betekent dat het eerste laden wat tijd kan kosten, vooral op tragere verbindingen of apparaten. Elke filteraanpassing vraagt wat rekenwerk.
                        Op deze manier vermijden we serverkosten en privacyproblemen doordat er geen backendserver is, waardoor we meer aandacht en middelen kunnen besteden aan onderzoek.
                    </p>
                    
                    <h2>Over het Nederlandse Parlement</h2>
                    <p>Nederland is een parlementaire democratie. Het parlement heet de Staten-Generaal en bestaat uit twee kamers: de Tweede Kamer en de Eerste Kamer. De Tweede Kamer heeft 150 leden die rechtstreeks gekozen worden door Nederlandse burgers via evenredige vertegenwoordiging.</p>
                    <p><a href="https://www.tweedekamer.nl/zo-werkt-de-kamer" target="_blank" rel="noreferrer">Meer informatie over het Nederlandse parlement</a>. Deze data bevat alleen besluiten van de Tweede Kamer.</p>

                    <h2>Databronnen</h2>
                    <p>De stemdata is afkomstig uit de officiële open data-API van de Tweede Kamer (<a href="https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/" target="_blank" rel="noreferrer">Tweede Kamer Gegevensmagazijn</a>). Documentteksten zijn afkomstig van <a href="https://zoek.officielebekendmakingen.nl/" target="_blank" rel="noreferrer">Officiële Bekendmakingen</a>.</p>

                    <h2>Credits</h2>
                    <p>Dit project is ontwikkeld door onderzoekers van de Rijksuniversiteit Groningen, waaronder Herbert Kruitbosch en anderen van het Centrum voor Informatietechnologie.</p>

                    <h2>Contact</h2>
                    <p>Voor vragen en opmerkingen kunt u contact opnemen met het ontwikkelteam van de Rijksuniversiteit Groningen.</p>
                </TabPanel>

                <TabPanel value={informationTab} index={1}>
                    <h2>Hoe gebruik je deze tool</h2>
                    <p>Aan de rechterkant van het scherm kun je de visualisatie aanpassen door onderwerpen, partijen en impactcategorieën te selecteren. Gebruik de filters om besluiten te verfijnen en stemgedrag te bekijken.</p>
                    <p>Het linkerpaneel toont de lijst met parlementaire besluiten. Klik op een besluit om gedetailleerde steminformatie en analyse te zien.</p>

                    <h2>Datacategorieën</h2>
                    <p>Elk parlementair besluit is gecategoriseerd op onderwerp en geanalyseerd op verschillende impacts:</p>
                    <ul>
                        <li><strong>Onderwerpen:</strong> Immigratie, milieu, gezondheidszorg, economie, enz.</li>
                        <li><strong>Impacts:</strong> Economische kosten, milieueffecten, sociale zekerheid, rechten, veiligheid, gezondheidszorg en fiscale gevolgen.</li>
                        <li><strong>Begunstigden:</strong> Wie profiteert van een stem vóór of tegen de motie.</li>
                    </ul>

                    <h2>Stemanalyse</h2>
                    <p>De analyse toont hoe elke partij heeft gestemd, gewogen naar het aantal zetels dat ze hebben. Dit geeft inzicht in partijposities over verschillende onderwerpen.</p>

                    <h2>Besluittype</h2>
                    <p>De data bevat verschillende soorten parlementaire besluiten zoals moties, amendementen en andere stemonderwerpen vanaf december 2023.</p>

                    <h2>Impacts</h2>
                    <p>O.a. deze impacts zijn bepaald, bekijk het annotatieschema in de laatste tab voor alle impacts. Of sluit gewoon dit venster om naar de data te gaan.</p>
                    <ul>
                        <li><HealthIcon fontSize='small'/> impact op gezondheidszorg</li>
                        <li><EconomyIcon fontSize='small'/> economische impact</li>
                        <li><TaxIcon fontSize='small'/> fiscale impact</li>
                        <li><EnvironmentIcon fontSize='small'/> milieu-impact</li>
                        <li><RightsIcon fontSize='small'/> impact op mensenrechten</li>
                        <li><SecurityIcon fontSize='small'/> veiligheidsimpact</li>
                        <li><SocialSecurityIcon fontSize='small'/> impact op sociale zekerheid</li>
                    </ul>

                    <h2>Begunstigden</h2>
                    <p>Zowel bij stemmen vóór als tegen zijn er begunstigden. Deze zijn alleen zichtbaar op brede computerschermen.
                        Ze hebben vooral zin wanneer relatieve aantallen worden getoond, waarbij ze gedeeld worden door het aantal zetels in het parlement.
                        Dit is relevant omdat een begunstigde per stem wordt geteld, aangezien een partij niet altijd unaniem stemt.
                    </p>

                    <h2>Realisme</h2>
                    <p>Elk besluit wordt ook beoordeeld op realisme en symboliek.</p>
                    <ul>
                        <li><strong>realistisch:</strong> procedurele nauwkeurigheid en plausibele politiek, bijv. begrotingswijzigingen, nieuwe wetten, sancties</li>
                        <li><strong>neutraal:</strong> zowel realistisch als symbolisch</li>
                        <li><strong>symbolisch:</strong> allegorisch, bijv. het veroordelen van een oorlog of conflict</li>
                    </ul>
                    
                </TabPanel>

                <TabPanel value={informationTab} index={2}>
                    <h2>Dataverzameling en Verwerking</h2>
                    <p>De data voor deze analyse is verzameld met geautomatiseerde scripts die informatie ophalen uit de officiële open data API van de Tweede Kamer. Het proces omvat meerdere stappen:</p>
                    <ol>
                        <li><strong>Ophalen van besluiten:</strong> Parlementaire besluiten (besluiten) worden opgehaald uit de <a href="https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/" target="_blank" rel="noreferrer">Tweede Kamer Gegevensmagazijn API</a> vanaf 6 december 2023.</li>
                        <li><strong>Ophalen van stemmen:</strong> Individuele stemmingen per besluit worden verzameld, inclusief partij en zetelaantal.</li>
                        <li><strong>Ophalen van documenten:</strong> Gerelateerde documenten en metadata worden opgehaald.</li>
                        <li><strong>Tekstextractie:</strong> De volledige tekst wordt gehaald van <a href="https://zoek.officielebekendmakingen.nl/" target="_blank" rel="noreferrer">Officiële Bekendmakingen</a>.</li>
                    </ol>

                    <h2>Datafilters en Criteria</h2>
                    <p>Verschillende filters zijn toegepast om de datakwaliteit te waarborgen:</p>
                    <ul>
                        <li>Alleen besluiten met bijbehorende stemmingen (StemmingsSoort niet null)</li>
                        <li>Uitsluiting van gestaakte ("Stemmen - gestaakt") en uitgestelde ("Stemmen - aangehouden", "Stemmen - uitstellen") stemmingen</li>
                        <li>Alleen besluiten gewijzigd na 6 december 2023</li>
                        <li>Documenten met meer dan 15.000 tekens uitgesloten (limiet van de AI)</li>
                    </ul>
                    <p>Ongeveer 500 besluiten gingen verloren, meestal omdat hun documentteksten te lang waren voor de LLM om te verwerken, maar ook door 404-fouten van de ODATA API of Officiële Bekendmakingen.</p>
                    <p>We hebben besluiten opgehaald vanaf 6 december 2023, maar konden niet garanderen dat ze allemaal bij het parlement van `Schoof I` horen. Sommige stemmen na 6 december waren nog van het vorige parlement. Daarom zijn besluiten met stemmen van GroenLinks en PvdA verwijderd, aangezien deze partijen niet meer afzonderlijk in de Kamer zitten. Toch kunnen enkele besluiten ontbreken.</p>

                    <h2>AI-Verwerking</h2>
                    <p>Documentteksten zijn geanalyseerd met een Large Language Model (Mistral-Small-3.2-24B-Instruct), gehost op de HPC-faciliteit van de Rijksuniversiteit Groningen. De AI categoriseert elk besluit op:</p>
                    <ul>
                        <li><strong>Onderwerp:</strong> Een van de vooraf gedefinieerde categorieën zoals immigratie, milieu, gezondheidszorg, enz.</li>
                        <li><strong>Samenvatting:</strong> Een beknopte samenvatting van het besluit in 3–5 alinea’s</li>
                        <li><strong>Impacts:</strong> Beoordeling van economische, milieu-, sociale, veiligheids-, gezondheids-, mensenrechten- en fiscale effecten</li>
                        <li><strong>Begunstigden:</strong> Groepen die profiteren van een stem vóór of tegen (niet zichtbaar op deze website)</li>
                    </ul>

                    <h2>AI Promptstructuur</h2>
                    <p>De AI gebruikt een gestructureerde prompt met specifieke evaluatiecriteria per impactcategorie, om consistente en objectieve analyses te waarborgen. De prompt benadrukt conservatieve gevolgtrekking bij ontbrekende informatie en maakt onderscheid tussen overheidsfinanciën en bredere economische kosten.</p>
                    <p>Alle AI-verwerking wordt gecachet om reproduceerbaarheid en efficiëntie te garanderen.</p>
                </TabPanel>

                <TabPanel value={informationTab} index={3}>
                    <h2>Technische informatie</h2>
                    <p>Als je toegang hebt tot een LLM zoals ChatGPT of Mistral, kun je de resultaten reproduceren met de twee notebooks in <a href="https://github.com/prhbrt/parliamentary-votes" target="_blank">deze repository</a>.</p>

                    <p>Hier staan de prompt en het (pydantic) annotatieschema dat gebruikt is voor in-context learning met guided generation en <code>mistral-3.2-24B-2506</code>.</p>
                
                    <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'monospace', paddingLeft: '30px'}}>
{String.raw`Je bent een annotator van parlementaire stemmingen.
Geef ALLEEN een JSON-object terug dat exact overeenkomt met het opgegeven JSON-schema.
Als informatie ontbreekt, redeneer conservatief en zet alle *_impact-velden op 'onduidelijk'.

Evalueer fiscale labels en kostentags uitsluitend vanuit het perspectief van de RIJKSBEGROTING.
Als de maatregel kosten verschuift naar burgers/bedrijven, betekent dat dat de overheid bespaart; verschuift het naar de staat, dan maakt de overheid kosten.

Interpreteer “Stem voor” altijd als vóór de motietekst stemmen, en “Stem tegen” als tegen de motietekst.
Baseer alle beoordelingen op de beoogde effecten die de motie van de overheid vraagt, niet op hypothetische uitkomsten van ander beleid.
Gebruik “onduidelijk” in plaats van te raden wanneer effecten ambigu zijn.
Vermijd automatische spiegeling; beoordeel pro en contra onafhankelijk.

# Realistisch / Symbolisch? (doel)
Genereer of analyseer de stemming volgens de realisme–symboliek-schaal:
- "realistisch" → procedurele juistheid en plausibele politiek (bijv. begrotingswijziging, wetgeving, sancties).
- "gemengd/overgang" → combinatie van realistische en symbolische elementen.
- "symbolisch" → puur signaal/waardestelling (bijv. veroordeling van oorlog).
- "n.v.t." → geen stilistische eis.

# Met kostenstrategie? (bevat_kostenstrategie)
Als de motie extra uitgaven vraagt: bevat zij óók een dekking of bron (“waar komt het geld vandaan?”)?
Waardeer als "ja"/"nee"/"onduidelijk"/"n.v.t.".

# Fiscale tags (fiscaal_label_*)
Fiscale tags slaan ALLEEN op de overheidsbegroting — niet op private prijzen.
- "bespaart" → overheid geeft minder uit of haalt meer binnen.
- "kost" → overheid geeft meer uit of haalt minder binnen.
- "budgetneutraal" → per saldo geen relevante verandering.
- "onduidelijk" → onvoldoende informatie.

# Kosteneffecten (economische_kosteneffect_*)
Beschrijven de totale economische/maatschappelijke lasten, niet alleen de begroting.
- "lager" → totale last neemt af.
- "hoger" → totale last neemt toe.
- "neutraal"/"onduidelijk" waar passend.

# Rechten (rechten_effect_*)
- "uitgebreid" → uitbreiding/bescherming van rechten of toegang (privacy, asiel, zorg).
- "ingeperkt" → beperking of inkrimping van dergelijke rechten.
- Beïnvloeden handhaving, datagebruik of toezicht? → beoordeel als rechtenrelevant.

# Milieu (milieu_effect_*)
Alleen invullen als de motie direct/voorzienbaar raakt aan milieu/landbouw/stikstof/energie/duurzaamheid; anders "n.v.t.".

# Veiligheid (veiligheids_effect_*)
- "verbeterd" → verhoogt veiligheid/anti-terreur/handhavingscapaciteit.
- "verslechterd" → verlaagt die capaciteit.
- "neutraal"/"onduidelijk" waar passend.

# Asieltoegankelijkheid (asiel_toegankelijkheid_*)
- "gemakkelijker" → soepeler toegang/procedure; verwachte instroom hoger of verblijfszekerheid groter.
- "moeilijker" → strenger; verwachte instroom lager of verblijfszekerheid kleiner.
- "neutraal"/"onduidelijk" waar passend.

# Geclaimde begunstigden
- “begunstigden_van_stem_voor” = wie de motie expliciet wil helpen/beschermen.
- “begunstigden_van_stem_tegen” = wie baat heeft bij verwerping/status quo.
Gebruik groepen (bijv. vluchtelingen, belastingbetalers, boeren, zorgmedewerkers).

# Extra NL-specifieke effecten (richtingafhankelijk, met _van_stem_voor / _van_stem_tegen)

- pas_melders_effect_*:
  *Helpt/belemmert/…* de situatie van PAS-melders (bedrijven met oude PAS-melding) m.b.t. legalisatie/vergunning?
  Waarden: "helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t.".

- gemeentelijke_last_* en provinciale_last_*:
  Verandert de uitvoerings- en financiële last voor gemeenten/provincies (opvang, handhaving, uitvoering)?
  Waarden: "hoger", "neutraal", "lager", "onduidelijk", "n.v.t.".

- schiphol_capaciteit_*:
  Beïnvloedt de maatregel de capaciteit of groeiruimte op/om Schiphol?
  Waarden: "uitgebreid" (meer ruimte), "neutraal", "beperkt" (minder ruimte), "onduidelijk", "n.v.t.".

- defensieuitgaven_*:
  Draagt de maatregel bij aan het halen/onderhouden van de 2%-NAVO-norm?
  Waarden: ">=2% bbp", "<2% bbp", "neutraal", "onduidelijk", "n.v.t.".

- box3_effect_*:
  Effect op de lastenverdeling binnen Box 3 (vermogensrendementsheffing).
  Waarden: "hogere lasten", "lagere lasten", "herverdeling", "neutraal", "onduidelijk", "n.v.t.".

- kinderopvang_betaalbaarheid_*:
  Verandert betaalbaarheid/toegankelijkheid van kinderopvang voor gezinnen?
  Waarden: "verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t.".

# Dierenwelzijn (dierenwelzijn_effect_*)
Gebruik dit veld wanneer de motie direct betrekking heeft op dieren, landbouwpraktijken of bescherming van wilde dieren.
- "verbeterd" → hogere welzijnsnormen, betere leefruimte, strengere bescherming.
- "verslechterd" → lagere normen, meer intensieve houderij, versoepeling van regels.
- "neutraal" → geen effect op dierenwelzijn.
- "onduidelijk" → gemengde effecten of niet goed in te schatten.
- "n.v.t." → niet van toepassing.

# EU-dimensie (eu_dimensie)
Beoordeel of de motie (voor/tegen) botst met EU-kaders:
- "EU-richtlijn / verordening" (implementatie/naleving),
- "Schengen / CEAS" (grens/asiel),
- "staatssteun",
- "geen / niet relevant",
- "onduidelijk", "n.v.t.".

# Juridisch risico (juridische_risico_*)
Kans op strijd met Grondwet of EU-recht:
- "grondwettelijk risico", "EU-recht risico", "laag risico", "onduidelijk", "n.v.t.".

# Uitvoeringsmoeilijkheid (uitvoeringsmoeilijkheid_*)
Schatting van beleids-/IT-/capaciteitscomplexiteit voor uitvoerders (COA/IND/gemeenten/etc.):
- "laag", "middel", "hoog", "onduidelijk", "n.v.t.".

# Tijdshorizon (enkelvoudig)
Gebruik het **enkelvoudige** veld tijdshorizon (géén pro/contra-variant):
- "direct (<1j)", "kort (1–3j)", "midden (3–5j)", "lang (>5j)", "onduidelijk", "n.v.t.".
Dit is een eigenschap van het voorstel zelf; bij verwerping vervalt het.

# Financieringsbron (enkelvoudig)
Gebruik het **enkelvoudige** veld financieringsbron (géén pro/contra-variant):
- "algemene middelen", "geoormerkt fonds", "EU-fondsen", "gemeentelijke middelen", "privaat / heffing", "onduidelijk", "n.v.t.".
Eigenschap van de maatregel; bij verwerping vervalt de dekking.

# Coalitieakkoord-consistentie (coalitieakkoord_consistentie_*)
Beoordeel per richting of instemming/weigering in lijn is met het coalitieakkoord:
- "in lijn", "gedeeltelijk in lijn", "niet in lijn", "onduidelijk", "n.v.t.".

# Bronnen en notities
- Voeg onder “bronnen” korte verwijzingen toe (Kamerstuknummer, nieuws, memo’s) indien beschikbaar.
- Gebruik “notities” voor beknopte motivatie (2–4 zinnen) en benoem kernafruilen (rechten vs. veiligheid, fiscale besparing vs. maatschappelijke kosten, etc.).


Schema:
{StemAnnotatie.model_json_schema()}`}
                    </pre>
                    <h3>Annotatieschema</h3>
                    <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'monospace', paddingLeft: '10px'}}>
{String.raw`
class StemAnnotatie(BaseModel):
    # --- Hoofdclassificatie ---
    onderwerp: Literal[
        # Migratie / Asiel
        "Migratie- en asielbeleid (algemeen)",
        "Spreidingswet / intrekking of aanpassing",
        "Grensbewaking / terugkeerbeleid",
        # Wonen
        "Wonen en vastgoed / woningtekort",
        "Wet betaalbare huur",
        "Huurdersbescherming / Huurcommissie",
        "Hypotheek- en koopwoningbeleid",
        # Klimaat / stikstof / landbouw
        "Stikstofbeleid / PAS-melders",
        "Landbouw en grondgebruik",
        "Dierenwelzijn / veehouderij",
        "Milieuwetgeving / Natura 2000",
        "Klimaat- en energiebeleid / duurzaamheid / decarbonisatie",
        "Schiphol / luchtvaart en geluidsnormen",
        # Zorg, welzijn, kosten van leven
        "Zorg en langdurige zorg / capaciteit en financiering",
        "Kinderopvang (hervorming financiering)",
        "Kosten van levensonderhoud / energie / accijnzen",
        "Pensioen (Wtp) / AOW",
        # Digitaal / veiligheid / rechtsstaat
        "Digitalisering, AI, platformregulering, cybersecurity",
        "Inlichtingen- en veiligheidswet (Wiv / TCOA)",
        "Wet tegen spionage en buitenlandse inmenging",
        # Bestuur / parlementair
        "Kabinet / coalitiestabiliteit / moties van wantrouwen",
        "Parlementaire enquête / COVID-19",
        "Parlementaire enquête / gaswinning Groningen",
        # Financiën en belastingen
        "Overheidsfinanciën / begroting / belasting (algemeen)",
        "Box 3 / vermogensrendementsheffing",
        "Gemeentefinanciën / provinciale bijdragen",
        # Internationaal
        "Defensie en NAVO-verplichtingen",
        "Buitenlands beleid – Oekraïne / Rusland",
        "Buitenlands beleid – Israël / Palestina",
        "Buitenlands beleid – Midden-Oosten (overig)",
        "Buitenlands beleid – Overig",
        # Mobiliteit / infrastructuur
        "Openbaar vervoer / spoorconcessies",
        # Onderwijs / arbeid
        "Onderwijs / lerarentekort / studiefinanciering",
        # Media / cultuur
        "Publieke omroep / mediabeleid",
        # Overig
        "Overig"
    ]

    # --- Doel en context van de stemming ---
    doel: Literal["realistisch", "gemengd/overgang", "symbolisch", "n.v.t."] = "n.v.t."
    bevat_kostenstrategie: Literal["ja", "nee", "onduidelijk", "n.v.t."] = "n.v.t."

    # --- Samenvatting en begunstigden ---
    samenvatting_van_besluit: str = ""
    begunstigden_van_stem_voor: List[str] = []
    begunstigden_van_stem_tegen: List[str] = []

    # --- Macro-effecten ---
    economische_kosteneffect_van_stem_voor: Literal["lager", "neutraal", "hoger", "onduidelijk", "n.v.t."] = "n.v.t."
    economische_kosteneffect_van_stem_tegen: Literal["lager", "neutraal", "hoger", "onduidelijk", "n.v.t."] = "n.v.t."

    milieu_effect_van_stem_voor: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."
    milieu_effect_van_stem_tegen: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."

    veiligheids_effect_van_stem_voor: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."
    veiligheids_effect_van_stem_tegen: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."

    sociale_zekerheidseffect_van_stem_voor: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."
    sociale_zekerheidseffect_van_stem_tegen: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."

    zorg_effect_van_stem_voor: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."
    zorg_effect_van_stem_tegen: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."

    rechten_effect_van_stem_voor: Literal["uitgebreid", "neutraal", "ingeperkt", "onduidelijk", "n.v.t."] = "n.v.t."
    rechten_effect_van_stem_tegen: Literal["uitgebreid", "neutraal", "ingeperkt", "onduidelijk", "n.v.t."] = "n.v.t."

    fiscaal_label_van_stem_voor: Literal["bespaart", "kost", "budgetneutraal", "onduidelijk", "n.v.t."] = "n.v.t."
    fiscaal_label_van_stem_tegen: Literal["bespaart", "kost", "budgetneutraal", "onduidelijk", "n.v.t."] = "n.v.t."

    # --- Specifieke thema-effecten ---
    asiel_toegankelijkheid_van_stem_voor: Literal["gemakkelijker", "neutraal", "moeilijker", "onduidelijk", "n.v.t."] = "n.v.t."
    asiel_toegankelijkheid_van_stem_tegen: Literal["gemakkelijker", "neutraal", "moeilijker", "onduidelijk", "n.v.t."] = "n.v.t."

    oekraine_effect_van_stem_voor: Literal["helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t."] = "n.v.t."
    oekraine_effect_van_stem_tegen: Literal["helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t."] = "n.v.t."

    palestina_effect_van_stem_voor: Literal["helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t."] = "n.v.t."
    palestina_effect_van_stem_tegen: Literal["helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t."] = "n.v.t."

    israel_effect_van_stem_voor: Literal["helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t."] = "n.v.t."
    israel_effect_van_stem_tegen: Literal["helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t."] = "n.v.t."

    huurmarkt_effect_van_stem_voor: Literal["verbeterd", "neutraal", "beperkt", "onduidelijk", "n.v.t."] = "n.v.t."
    huurmarkt_effect_van_stem_tegen: Literal["verbeterd", "neutraal", "beperkt", "onduidelijk", "n.v.t."] = "n.v.t."

    koopwoning_effect_van_stem_voor: Literal["verbeterd", "neutraal", "beperkt", "onduidelijk", "n.v.t."] = "n.v.t."
    koopwoning_effect_van_stem_tegen: Literal["verbeterd", "neutraal", "beperkt", "onduidelijk", "n.v.t."] = "n.v.t."

    hypotheeklasten_effect_van_stem_voor: Literal["lager", "neutraal", "hoger", "onduidelijk", "n.v.t."] = "n.v.t."
    hypotheeklasten_effect_van_stem_tegen: Literal["lager", "neutraal", "hoger", "onduidelijk", "n.v.t."] = "n.v.t."

    kosten_van_leven_effect_van_stem_voor: Literal["lager", "neutraal", "hoger", "onduidelijk", "n.v.t."] = "n.v.t."
    kosten_van_leven_effect_van_stem_tegen: Literal["lager", "neutraal", "hoger", "onduidelijk", "n.v.t."] = "n.v.t."

    pas_melders_effect_van_stem_voor: Literal["helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t."] = "n.v.t."
    pas_melders_effect_van_stem_tegen: Literal["helpt", "neutraal", "belemmert", "onduidelijk", "n.v.t."] = "n.v.t."

    gemeentelijke_last_van_stem_voor: Literal["hoger", "neutraal", "lager", "onduidelijk", "n.v.t."] = "n.v.t."
    gemeentelijke_last_van_stem_tegen: Literal["hoger", "neutraal", "lager", "onduidelijk", "n.v.t."] = "n.v.t."

    provinciale_last_van_stem_voor: Literal["hoger", "neutraal", "lager", "onduidelijk", "n.v.t."] = "n.v.t."
    provinciale_last_van_stem_tegen: Literal["hoger", "neutraal", "lager", "onduidelijk", "n.v.t."] = "n.v.t."

    schiphol_capaciteit_van_stem_voor: Literal["uitgebreid", "neutraal", "beperkt", "onduidelijk", "n.v.t."] = "n.v.t."
    schiphol_capaciteit_van_stem_tegen: Literal["uitgebreid", "neutraal", "beperkt", "onduidelijk", "n.v.t."] = "n.v.t."

    defensieuitgaven_van_stem_voor: Literal[">=2% bbp", "<2% bbp", "neutraal", "onduidelijk", "n.v.t."] = "n.v.t."
    defensieuitgaven_van_stem_tegen: Literal[">=2% bbp", "<2% bbp", "neutraal", "onduidelijk", "n.v.t."] = "n.v.t."

    box3_effect_van_stem_voor: Literal["hogere lasten", "lagere lasten", "herverdeling", "neutraal", "onduidelijk", "n.v.t."] = "n.v.t."
    box3_effect_van_stem_tegen: Literal["hogere lasten", "lagere lasten", "herverdeling", "neutraal", "onduidelijk", "n.v.t."] = "n.v.t."

    kinderopvang_betaalbaarheid_van_stem_voor: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."
    kinderopvang_betaalbaarheid_van_stem_tegen: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."

    dierenwelzijn_effect_van_stem_voor: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."
    dierenwelzijn_effect_van_stem_tegen: Literal["verbeterd", "neutraal", "verslechterd", "onduidelijk", "n.v.t."] = "n.v.t."

    eu_dimensie_van_stem_voor: Literal[
        "EU-richtlijn / verordening", "Schengen / CEAS", "staatssteun", "geen / niet relevant", "onduidelijk", "n.v.t."
    ] = "n.v.t."
    eu_dimensie_van_stem_tegen: Literal[
        "EU-richtlijn / verordening", "Schengen / CEAS", "staatssteun", "geen / niet relevant", "onduidelijk", "n.v.t."
    ] = "n.v.t."
    
    juridische_risico_van_stem_voor: Literal["grondwettelijk risico", "EU-recht risico", "laag risico", "onduidelijk", "n.v.t."] = "n.v.t."
    juridische_risico_van_stem_tegen: Literal["grondwettelijk risico", "EU-recht risico", "laag risico", "onduidelijk", "n.v.t."] = "n.v.t."

    uitvoeringsmoeilijkheid_van_stem_voor: Literal["laag", "middel", "hoog", "onduidelijk", "n.v.t."] = "n.v.t."
    uitvoeringsmoeilijkheid_van_stem_tegen: Literal["laag", "middel", "hoog", "onduidelijk", "n.v.t."] = "n.v.t."

    tijdshorizon: Literal["direct (<1j)", "kort (1–3j)", "midden (3–5j)", "lang (>5j)", "onduidelijk", "n.v.t."] = "n.v.t."
    
    financieringsbron_van_stem_voor: Literal[
        "algemene middelen", "geoormerkt fonds", "EU-fondsen", "gemeentelijke middelen", "privaat / heffing", "onduidelijk", "n.v.t."
    ] = "n.v.t."
    financieringsbron_van_stem_tegen: Literal[
        "algemene middelen", "geoormerkt fonds", "EU-fondsen", "gemeentelijke middelen", "privaat / heffing", "onduidelijk", "n.v.t."
    ] = "n.v.t."

    uitvoerende_instanties: List[str] = []  # bijv. COA, IND, gemeenten, provincies, NVWA, NCTV
    coalitieakkoord_consistentie_van_stem_voor: Literal["in lijn", "gedeeltelijk in lijn", "niet in lijn", "onduidelijk", "n.v.t."] = "n.v.t."
    coalitieakkoord_consistentie_van_stem_tegen: Literal["in lijn", "gedeeltelijk in lijn", "niet in lijn", "onduidelijk", "n.v.t."] = "n.v.t."

    # --- Bronnen en notities ---
    bronnen: List[str] = []
    notities: Optional[str] = None`}
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