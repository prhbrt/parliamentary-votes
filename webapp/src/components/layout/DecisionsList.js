import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Virtuoso } from 'react-virtuoso'
import { useData } from '../../hooks/useData';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const impactKeys = [
 'asiel_toegankelijkheid', 'box3_effect', 'fiscaal_label', 
 'coalitieakkoord_consistentie', 'defensieuitgaven', 'dierenwelzijn_effect',
 'economische_kosteneffect', 'eu_dimensie', 'financieringsbron',
 'gemeentelijke_last', 'huurmarkt_effect', 'hypotheeklasten_effect',
 'israel_effect', 'juridische_risico', 'kinderopvang_betaalbaarheid',
 'koopwoning_effect', 'kosten_van_leven_effect', 'milieu_effect',
 'oekraine_effect', 'palestina_effect', 'pas_melders_effect',
 'provinciale_last', 'rechten_effect', 'schiphol_capaciteit', 'zorg_effect',
 'sociale_zekerheidseffect', 'uitvoeringsmoeilijkheid', 'veiligheids_effect', ];

const colors = {
    "lower": "#60B669",
    "saves": "#60B669",
    "expands": "#60B669",
    "improves": "#60B669",
    "budget-neutral": "#FFDC64",
    "neutral": "#FFDC64",
    "worsens": "#dc002d",
    "higher": "#dc002d",
    "costs": "#dc002d",
    "restricts": "#dc002d",
    "not-participated": "#009CEF",
    "n/a": "#772D68",
    "unclear": "#CCCCCC",
}


export default function DecisionsList({}) {
   const {metadata, metadataColumns, isOpen, } = useData();
   const {t} = useTranslation()
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const maxWidth = useMediaQuery(theme.breakpoints.down('sm')) ? "md" : undefined;
   const [selectedDecision, setSelectedDecision] = useState(null);

   const FAVOR_BENEFICIARIES_COLUMN = metadataColumns.indexOf("begunstigden_van_stem_voor")
   const AGAINST_BENEFICIARIES_COLUMN = metadataColumns.indexOf("begunstigden_van_stem_tegen")
   const DECISION_COLUMN = metadataColumns.indexOf("samenvatting_van_besluit")
   const NOTES_COLUMN = metadataColumns.indexOf("notities")
   const TITEL_COLUMN = metadataColumns.indexOf("Titel")
   const ONDERWERP_COLUMN = metadataColumns.indexOf("Onderwerp")
   const SOORT_COLUMN = metadataColumns.indexOf("Soort")
   const CITEERTITEL_COLUMN = metadataColumns.indexOf("Citeertitel")
   const GESTARTOP_COLUMN = metadataColumns.indexOf("GestartOp")
   const ORGANISATIE_COLUMN = metadataColumns.indexOf("Organisatie")
   const TERMIJN_COLUMN = metadataColumns.indexOf("Termijn")
   const VERGADERJAAR_COLUMN = metadataColumns.indexOf("Vergaderjaar")
   const VOLGNUMMER_COLUMN = metadataColumns.indexOf("Volgnummer")
   const MD_NUMMER_COLUMN = metadataColumns.indexOf("Nummer")
   const AFGEDANA_COLUMN = metadataColumns.indexOf("Afgedaan")
   const IMPACT_COLUMNS = Object.fromEntries(impactKeys.map(impact => [impact, metadataColumns.indexOf(impact)]));

   const handleClickOpen = (decision) => {
     setSelectedDecision(decision);
   };

   const handleClose = () => {
     setSelectedDecision(null);
   };

  
  return (
    <List sx={{ width: '100%', flexGrow: 1, bgcolor: 'background.paper' }} className={`decisions-list ${isOpen? "open ": "closed "}`} >
      <Virtuoso className={`decisions-virtuoso ${isOpen? "open ": "closed "}`} data={metadata} itemContent={(index, decision) => {
          return <>
            <ListItem alignItems="flex-start" onClick={() => handleClickOpen(decision)} style={{cursor: 'pointer'}}>
               <ListItemText primary={<><span style={{fontSize: '8pt'}}>{decision[TITEL_COLUMN]}</span> — {decision[ONDERWERP_COLUMN]}</>}/>
             </ListItem>
             <Divider variant="inset" component="li" />
          </>
      }}
    />

    <Dialog open={!(!selectedDecision)} onClose={handleClose} maxWidth={maxWidth} fullScreen={fullScreen}>
      <DialogTitle>{selectedDecision ? selectedDecision[TITEL_COLUMN] : ''}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{selectedDecision ? selectedDecision[ONDERWERP_COLUMN] : ''}</Typography>
        <Typography variant="body1">{selectedDecision ? selectedDecision[DECISION_COLUMN] : ''}</Typography>
        <Typography variant="body1">{selectedDecision ? selectedDecision[NOTES_COLUMN] : ''}</Typography>
        {selectedDecision && selectedDecision[FAVOR_BENEFICIARIES_COLUMN].length > 0 ? <Typography variant="body1">
          Begunstigden van stem voor: {selectedDecision ? selectedDecision[FAVOR_BENEFICIARIES_COLUMN].join(", ") : ''}
        </Typography> : undefined}
        {selectedDecision && selectedDecision[AGAINST_BENEFICIARIES_COLUMN].length > 0 ? <Typography variant="body1">
          Begunstigden van stem tegen: {selectedDecision[AGAINST_BENEFICIARIES_COLUMN].join(", ")}
        </Typography> : undefined}
        
        <Typography variant="body2">
          <a href={`https://www.tweedekamer.nl/zoeken?qry=${selectedDecision ? selectedDecision[MD_NUMMER_COLUMN] : ''}`} target="_blank">tweedekamer.nl</a>
        </Typography>

        <Typography variant="h6" style={{marginTop: '20px'}}>Impacts</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Impact</TableCell>
              <TableCell>Van Stem Voor</TableCell>
              <TableCell>Van Stem Tegen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {impactKeys.map(impact => (
              <TableRow key={impact}>
                <TableCell>{t(impact)}</TableCell>
                <TableCell style={{color: selectedDecision ? colors[selectedDecision[IMPACT_COLUMNS[impact]]] : ''}}>
                  {selectedDecision ? t(selectedDecision[IMPACT_COLUMNS[impact]][1]) : ''}
                </TableCell>
                <TableCell style={{color: selectedDecision ? colors[selectedDecision[IMPACT_COLUMNS[impact]]] : ''}}>
                  {selectedDecision ? t(selectedDecision[IMPACT_COLUMNS[impact]][0]) : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>

    </List>
  );
}