import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Virtuoso } from 'react-virtuoso'
import { useData } from '../../hooks/useData';

import HealthIcon from '@mui/icons-material/Healing';
import EconomyIcon from '@mui/icons-material/Factory';
import TaxIcon from '@mui/icons-material/AccountBalance';
import EnvironmentIcon from '@mui/icons-material/EnergySavingsLeaf';
import RightsIcon from '@mui/icons-material/EmojiPeople';
import SecurityIcon from '@mui/icons-material/Security';
import SocialSecurityIcon from '@mui/icons-material/Tag';
import { useTranslation } from 'react-i18next';


const impacts = ["economic_cost_impact", "environment_impact", "fiscal_tag",
  "healthcare_impact", "rights_impact","security_impact", "social_security_impact"];

const icons = {
  "economic_cost_impact": EconomyIcon,
  "environment_impact": EnvironmentIcon,
  "fiscal_tag": TaxIcon,
  "healthcare_impact": HealthIcon,
  "rights_impact": RightsIcon,
  "security_impact": SecurityIcon,
  "social_security_impact": SocialSecurityIcon,
};


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


export default function DecisionsList() {
  const {metadata, metadataColumns, } = useData();
  const {t} = useTranslation()

  const FAVOR_BENEFICIARIES_COLUMN = metadataColumns.indexOf("beneficiaries_of_vote_in_favor")
  const AGAINST_BENEFICIARIES_COLUMN = metadataColumns.indexOf("beneficiaries_of_vote_against")
  const DECISION_COLUMN = metadataColumns.indexOf("summary_of_decision")
  const NOTES_COLUMN = metadataColumns.indexOf("notes")
  const TITEL_COLUMN = metadataColumns.indexOf("Titel")
  const ONDERWERP_COLUMN = metadataColumns.indexOf("Onderwerp")
  const SOORT_COLUMN = metadataColumns.indexOf("Soort")
  const CITEERTITEL_COLUMN = metadataColumns.indexOf("Citeertitel")
  const GESTARTOP_COLUMN = metadataColumns.indexOf("GestartOp")
  const ORGANISATIE_COLUMN = metadataColumns.indexOf("Organisatie")
  const TERMIJN_COLUMN = metadataColumns.indexOf("Termijn")
  const VERGADERJAAR_COLUMN = metadataColumns.indexOf("Vergaderjaar")
  const VOLGNUMMER_COLUMN = metadataColumns.indexOf("Volgnummer")
  const AFGEDANA_COLUMN = metadataColumns.indexOf("Afgedaan")
  const IMPACT_COLUMNS = Object.fromEntries(impacts.map(impact => [impact, metadataColumns.indexOf(impact)]));

  
  return (
    <List sx={{ width: '100%', flexGrow: 1, bgcolor: 'background.paper' }}>
      <Virtuoso className="decisions-virtuoso" data={metadata} itemContent={(index, decision) => {
          const impactIcons = impacts.map(impact => {
            const Icon = icons[impact];
            const color = colors[decision[IMPACT_COLUMNS[impact]]];
            return <Icon style={{color}} title={`${t(impact)}: ${t(decision[IMPACT_COLUMNS[impact]])}`}/>
          });

          return <>
            <ListItem alignItems="flex-start">
               <ListItemText primary={<>{impactIcons}&nbsp;{decision[TITEL_COLUMN]}</>} secondary={
                   <>   
                    <Typography component="span" variant="body2" sx={{ color: 'text.primary', display: 'inline' }}>
                       {decision[DECISION_COLUMN]}
                     </Typography>
                     {` — ${decision[NOTES_COLUMN]}`}
                   </>
                 }
               />
             </ListItem>
             <Divider variant="inset" component="li" />
          </>
      }}
    />
      
    </List>
  );
}