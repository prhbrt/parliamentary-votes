import * as React from "react";
import "./rug-huisstijl.css"

import {FilterProvider} from "./hooks/useData";

import { MemoryRouter, Route, Routes} from "react-router-dom";

import {ParliamentaryVotes} from "./components/layout/ParliamentaryVotes";

import { t } from 'i18next';
import { Layout } from './components/layout/Layout';


function App() {
  return (
    <FilterProvider><MemoryRouter>
      <Routes>
        <Route path="" element={<Layout title={t("Parliamentary Votes")}><ParliamentaryVotes/></Layout>}/>,
      </Routes>
    </MemoryRouter></FilterProvider>
  );
}

export default App;
