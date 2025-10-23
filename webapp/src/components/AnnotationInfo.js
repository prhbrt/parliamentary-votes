import React, { useMemo, useState, useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useData } from '../hooks/useData';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


const ANNOTATIE_UITLEG = {
  doel: (
    <>
      <p>Mate waarin de motie tot concreet uitvoerbaar beleid leidt versus symboliek.</p>
      <ul>
        <li><strong>realistisch</strong> — procedureel juist, uitvoerbaar (begrotingswijziging/wet).</li>
        <li><strong>gemengd/overgang</strong> — deels uitvoerbaar, deels signaal.</li>
        <li><strong>symbolisch</strong> — vooral waardestelling/oproep zonder directe uitvoering.</li>
        <li><strong>n.v.t.</strong> — niet van toepassing / onvoldoende info.</li>
      </ul>
    </>
  ),

  bevat_kostenstrategie: (
    <>
      <p>Geeft aan of voor extra uitgaven ook dekking/bron staat beschreven (alleen rijksbegroting).</p>
      <ul>
        <li><strong>ja</strong> — dekking genoemd (bezuiniging, belasting, fonds, etc.).</li>
        <li><strong>nee</strong> — geen dekking.</li>
        <li><strong>onduidelijk</strong> — onvoldoende informatie.</li>
        <li><strong>n.v.t.</strong> — geen budgeteffect.</li>
      </ul>
    </>
  ),

  samenvatting_van_besluit: (
    <>
      <p>Korte vrije-tekstbeschrijving van wat de motie concreet vraagt of wijzigt.</p>
    </>
  ),

  begunstigden: (
    <>
      <p><em>Samengevoegd:</em> combineert <code>begunstigden_van_stem_voor</code> en <code>begunstigden_van_stem_tegen</code>.</p>
      <p>Noem doelgroepen die expliciet baat hebben bij respectievelijk aannemen of verwerpen (bijv. huurders, boeren, vluchtelingen, belastingbetalers).</p>
    </>
  ),

  economische_kosteneffect: (
    <>
      <p><em>Samengevoegd:</em> combineert <code>economische_kosteneffect_van_stem_voor</code> en <code>..._tegen</code>.</p>
      <p>Totale maatschappelijke/economische last (niet alleen begroting).</p>
      <ul>
        <li><strong>lager</strong> — totaal welvaartseffect gunstig / lasten dalen.</li>
        <li><strong>neutraal</strong> — per saldo geen duidelijke verandering.</li>
        <li><strong>hoger</strong> — lasten stijgen (administratief/regulatoir/prijs- of productiekosten).</li>
        <li><strong>onduidelijk</strong> — niet te schatten.</li>
        <li><strong>n.v.t.</strong> — geen relevant effect.</li>
      </ul>
    </>
  ),

  milieu_effect: (
    <>
      <p><em>Samengevoegd:</em> combineert <code>milieu_effect_van_stem_voor</code> en <code>..._tegen</code>.</p>
      <ul>
        <li><strong>verbeterd</strong> — stikstof/CO₂/natuurkwaliteit verbetert.</li>
        <li><strong>neutraal</strong> — geen merkbaar effect.</li>
        <li><strong>verslechterd</strong> — druk op milieu neemt toe.</li>
        <li><strong>onduidelijk</strong> — gemengd/ambigue.</li>
        <li><strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  veiligheids_effect: (
    <>
      <p><em>Samengevoegd:</em> combineert <code>veiligheids_effect_van_stem_voor</code> en <code>..._tegen</code>.</p>
      <ul>
        <li><strong>verbeterd</strong> — meer veiligheid/handhavingscapaciteit.</li>
        <li><strong>neutraal</strong></li>
        <li><strong>verslechterd</strong></li>
        <li><strong>onduidelijk</strong></li>
        <li><strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  sociale_zekerheidseffect: (
    <>
      <p><em>Samengevoegd:</em> effect op sociale zekerheid/inkomensbescherming.</p>
      <ul>
        <li><strong>verbeterd</strong> / <strong>neutraal</strong> / <strong>verslechterd</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  zorg_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op toegang/kwaliteit/capaciteit/financiering van zorg.</p>
      <ul>
        <li><strong>verbeterd</strong> / <strong>neutraal</strong> / <strong>verslechterd</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  mensenrechten_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op grond-/mensenrechten en rechtsbescherming.</p>
      <ul>
        <li><strong>uitgebreid</strong> — rechten of toegang neemt toe.</li>
        <li><strong>neutraal</strong></li>
        <li><strong>ingeperkt</strong> — rechten nemen af.</li>
        <li><strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  fiscaal_label: (
    <>
      <p><em>Samengevoegd:</em> begrotingseffect voor de <strong>rijksbegroting</strong> (niet voor burgers/bedrijven).</p>
      <ul>
        <li><strong>bespaart</strong> — minder uitgaven / meer inkomsten voor de staat.</li>
        <li><strong>kost</strong> — meer uitgaven / minder inkomsten.</li>
        <li><strong>budgetneutraal</strong> — per saldo geen verandering.</li>
        <li><strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  asiel_toegankelijkheid: (
    <>
      <p><em>Samengevoegd:</em> effect op toegang/instroom/procedurele drempels in asiel.</p>
      <ul>
        <li><strong>gemakkelijker</strong> / <strong>neutraal</strong> / <strong>moeilijker</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  oekraine_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op steun aan Oekraïne (militair, financieel, opvang, sancties).</p>
      <ul>
        <li><strong>helpt</strong> / <strong>neutraal</strong> / <strong>belemmert</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  palestina_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op steun/positie t.a.v. Palestina.</p>
      <ul>
        <li><strong>helpt</strong> / <strong>neutraal</strong> / <strong>belemmert</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  israel_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op steun/positie t.a.v. Israël.</p>
      <ul>
        <li><strong>helpt</strong> / <strong>neutraal</strong> / <strong>belemmert</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  huurmarkt_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op huurmarkt (betaalbaarheid/beschikbaarheid/bescherming).</p>
      <ul>
        <li><strong>verbeterd</strong> / <strong>neutraal</strong> / <strong>beperkt</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  koopwoning_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op koopmarkt (toegang, vraag/aanbod, transactiekosten).</p>
      <ul>
        <li><strong>verbeterd</strong> / <strong>neutraal</strong> / <strong>beperkt</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  hypotheeklasten_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op maandlasten/financieringskosten voor kopers.</p>
      <ul>
        <li><strong>lager</strong> / <strong>neutraal</strong> / <strong>hoger</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  kosten_van_leven_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op algemene kosten van levensonderhoud (energie, accijnzen, prijzen).</p>
      <ul>
        <li><strong>lager</strong> / <strong>neutraal</strong> / <strong>hoger</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  pas_melders_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op legalisatie/vergunningpositie van PAS-melders.</p>
      <ul>
        <li><strong>helpt</strong> / <strong>neutraal</strong> / <strong>belemmert</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  gemeentelijke_last: (
    <>
      <p><em>Samengevoegd:</em> impact op uitvoerings- en financiële last voor gemeenten.</p>
      <ul>
        <li><strong>hoger</strong> / <strong>neutraal</strong> / <strong>lager</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  provinciale_last: (
    <>
      <p><em>Samengevoegd:</em> impact op uitvoerings- en financiële last voor provincies.</p>
      <ul>
        <li><strong>hoger</strong> / <strong>neutraal</strong> / <strong>lager</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  schiphol_capaciteit: (
    <>
      <p><em>Samengevoegd:</em> effect op groeiruimte/slots/regulering rond Schiphol.</p>
      <ul>
        <li><strong>uitgebreid</strong> / <strong>neutraal</strong> / <strong>beperkt</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  defensieuitgaven: (
    <>
      <p><em>Samengevoegd:</em> bijdrage aan wel/niet halen van 2%-NAVO-norm.</p>
      <ul>
        <li><strong>&gt;=2% bbp</strong> — draagt bij aan halen/handhaven 2%.</li>
        <li><strong>&lt;2% bbp</strong> — werkt daar juist van weg.</li>
        <li><strong>neutraal</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  box3_effect: (
    <>
      <p><em>Samengevoegd:</em> verdeling van lasten in Box 3.</p>
      <ul>
        <li><strong>hogere lasten</strong> / <strong>lagere lasten</strong> / <strong>herverdeling</strong> / <strong>neutraal</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  kinderopvang_betaalbaarheid: (
    <>
      <p><em>Samengevoegd:</em> effect op betaalbaarheid/toegang kinderopvang.</p>
      <ul>
        <li><strong>verbeterd</strong> / <strong>neutraal</strong> / <strong>verslechterd</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  dierenwelzijn_effect: (
    <>
      <p><em>Samengevoegd:</em> effect op normen/bescherming in veehouderij en natuur.</p>
      <ul>
        <li><strong>verbeterd</strong> / <strong>neutraal</strong> / <strong>verslechterd</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),

  eu_kaders: (
    <>
      <p>Relevante EU-rechtsbasis of beperking.</p>
      <ul>
        <li><strong>EU-richtlijn / verordening</strong> — implementatie/naleving vereist.</li>
        <li><strong>Schengen / CEAS</strong> — grens/asielkaders.</li>
        <li><strong>staatssteun</strong> — toets aan EU-staatssteunregels.</li>
        <li><strong>geen / niet relevant</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),
  juridische_risico: (
    <>
      <p>Kans op strijd met Grondwet of EU-recht.</p>
      <ul>
        <li><strong>grondwettelijk risico</strong> / <strong>EU-recht risico</strong> / <strong>laag risico</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),
  uitvoeringsmoeilijkheid: (
    <>
      <p>Schatting van complexiteit voor uitvoerders (OA/IND/COA/gemeenten, IT, toezicht).</p>
      <ul>
        <li><strong>laag</strong> / <strong>middel</strong> / <strong>hoog</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),
  tijdshorizon: (
    <>
      <p>Ingang en doorlooptijd van de maatregel (enkelvoudig veld, niet richtingafhankelijk).</p>
      <ul>
        <li><strong>direct (&lt;1j)</strong> / <strong>kort (1–3j)</strong> / <strong>midden (3–5j)</strong> / <strong>lang (&gt;5j)</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),
  financieringsbron: (
    <>
      <p>Herkomst van dekking/financiering (enkelvoudig veld).</p>
      <ul>
        <li><strong>algemene middelen</strong> / <strong>geoormerkt fonds</strong> / <strong>EU-fondsen</strong> / <strong>gemeentelijke middelen</strong> / <strong>privaat / heffing</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),
  uitvoerende_instanties: (
    <>
      <p>Lijst van verantwoordelijke uitvoerders/ketenpartners (bijv. OA, IND, COA, gemeenten, provincies, NVWA, NCTV).</p>
    </>
  ),
  coalitieakkoord_consistentie: (
    <>
      <p>Mate waarin het voorstel strookt met het coalitieakkoord.</p>
      <ul>
        <li><strong>in lijn</strong> / <strong>gedeeltelijk in lijn</strong> / <strong>niet in lijn</strong> / <strong>onduidelijk</strong> / <strong>n.v.t.</strong></li>
      </ul>
    </>
  ),
};


export function AnnotationDialogue() {
   const {explanation, setExplanation } = useData();
   const {t} = useTranslation()
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const maxWidth = useMediaQuery(theme.breakpoints.down('sm')) ? "lg" : undefined;
   
   const handleClose = () => {
     setExplanation(null);
   };


    return <Dialog open={!(!explanation)} onClose={handleClose} maxWidth={maxWidth} fullScreen={fullScreen}>
        {explanation ? <>
          <DialogTitle>{t(explanation)}</DialogTitle>
          <DialogContent>
            {ANNOTATIE_UITLEG[explanation]}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t("Close")}</Button>
          </DialogActions>
        </>: undefined}
      </Dialog>
}