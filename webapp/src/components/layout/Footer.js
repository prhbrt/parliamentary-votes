import * as React from 'react';
import { Container, Grid, Box } from '@mui/material';

import './Layout.css';
import "../../rug-huisstijl.css"


export function Footer({ onPrivacy }) {
  return (<Box className="rug-footer" style={{textAlign: 'center'}}>
    <p><a href="email:datascience@rug.nl">
      Contact team Data Science</a> • <a onClick={() => onPrivacy()}>Privacy statement</a></p>
  </Box>);
}