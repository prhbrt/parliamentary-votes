import * as React from 'react';
import { useRef, useCallback } from "react";
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { t } from 'i18next';

import JSZip from 'jszip';
import dataFile from "../data/party_stances.zip"
import { data } from 'react-router';

const initialState = {};
const FilterContext = createContext(initialState);

const impacts = ["economic_cost_impact", "environment_impact", "fiscal_tag",
  "healthcare_impact", "rights_impact","security_impact", "social_security_impact"];

const seats = {
  "PVV": "37",
  "GroenLinks-PvdA": "25",
  "VVD": "24",
  "NSC": "20",
  "D66": "9",
  "BBB": "7",
  "CDA": "5",
  "SP": "5",
  "ChristenUnie": "3",
  "SGP": "3",
  "PvdD": "3",
  "DENK": "3",
  "FVD": "3",
  "Volt": "2",
  "JA21": "1",
}

function getImpactSummary(data, columns, field) {
  if (!data)
    return {}

  const IMPACT_COLUMN = columns.indexOf(field);
  const PARTY_COLUMN = columns.indexOf('party');
  const COUNT_COLUMN = columns.indexOf('count');
  
  const parties = Array.from(new Set(data.map(x => x[PARTY_COLUMN])));
  const impacts = Array.from(new Set(data.map(x => x[IMPACT_COLUMN])));
  var impactSummary = Object.fromEntries(impacts.map(impact => [impact, Object.fromEntries(parties.map(party => [party, 0]))]))

  data.map(sample => {
      const party = sample[PARTY_COLUMN];
      const count = sample[COUNT_COLUMN] | 0;
      const impact = sample[IMPACT_COLUMN];
      impactSummary[impact][party] += count;
  });
  return impactSummary;
}

function getImpactSummaries(data, columns) {
  return Object.fromEntries(impacts.map(impact => [impact, getImpactSummary(data, columns, impact)]))
}

/**
 * Wraps a React state setter to only allow updates at most once per `delay` ms.
 *
 * @param setState The original state setter from useState.
 * @param delay The minimum time (in ms) between updates. Default is 1000ms.
 */
export function useThrottledSetter(setState, delay = 1000) {
  const lastUpdateRef = useRef(0);

  const throttledSetState = (value) => {
    lastUpdateRef.current++;
    const currentRef = lastUpdateRef.current
    setTimeout(() => {
      if (currentRef == lastUpdateRef.current)
        setState(value)
    }, delay)
  }

  return throttledSetState;
}

export const FilterProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false); // whether the header menu is open on mobile.
  const [informationOpen, setInformationOpen] = useState(true);

  const [keywords, setKeywords] = useState("");
  const [binary, setBinary] = useState(false);
  const [normalize, setNormalize] = useState(false);

  const [backed, setBacked] = useState(false);
  const [neutral, setNeutral] = useState(true);
  const [symbolic, setSymbolic] = useState(true);
  const [realistic, setRealistic] = useState(true);

  const [showDecisions, setShowDecisions] = useState(false);
  const [showBeneficiaries, setShowBeneficiaries] = useState(false);
  const [filterBeneficiaries, setFilterBeneficiaries] = useState("");
  const [topic, setTopic] = useState("all");
  const [allData, setData] = useState({data: [], metadata: [], metadata_columns: [], columns: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [area, setArea] = useState(null);
  const [party, setParty] = useState(null);
  const [impact, setImpact] = useState(null);

  const throttledSetKeywords = useThrottledSetter(setKeywords, 1000);
  const throttledSetFilterBeneficiaries = useThrottledSetter(setFilterBeneficiaries, 1000);
  const { data, metadata, metadata_columns, columns } = allData;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(dataFile);
        const arrayBuffer = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        const jsonFile = zip.file('party_stances.json');
        if (jsonFile) {
          const jsonContent = await jsonFile.async('text');
          window.data = JSON.parse(jsonContent);
          setData(JSON.parse(jsonContent));
        } else {
          setError(f("Couldn't get data") + ".")
        }
        setLoading(false);
      } catch (e) {
        setError(f("Couldn't get data") + ": " + e )
      }
    };
    loadData();
  }, []);
  
  const MD_NUMBER_COLUMN = data ? metadata_columns.indexOf('Nummer') : -1;
  const NUMBER_COLUMN = data ? columns.indexOf('Nummer') : -1;
  const PARTY_COLUMN = data ? columns.indexOf('party') : -1;
  const TOPIC_COLUMN = data ? metadata_columns.indexOf('topic') : -1;
  const BENEFICIARIES_COLUMN = data? columns.indexOf('beneficiaries') : -1;
  const COUNT_COLUMN = data ? columns.indexOf('count') : -1;
  const VOTE_COLUMN = data ? columns.indexOf('vote') : -1;

  const MD_DECISION_COLUMN = data ? metadata_columns.indexOf("summary_of_decision"): -1;
  const MD_NOTES_COLUMN = data ? metadata_columns.indexOf("notes"): -1;
  const MD_TITEL_COLUMN = data ? metadata_columns.indexOf("Titel"): -1;
  const MD_ONDERWERP_COLUMN = data ? metadata_columns.indexOf("Onderwerp"): -1;
  const MD_PURPOSE_COLUMN = data ? metadata_columns.indexOf("purpose"): -1;
  const MD_BACKED_COLUMN = data ? metadata_columns.indexOf("includes_cost_stategy"): -1;
  const AREA_COLUMN = data ? columns.indexOf(area): -1;
  
  const NUMMER_COLUMN = data ? columns.indexOf('Nummer'): -1;
  const MD_NUMMER_COLUMN = data ? metadata_columns.indexOf('Nummer') : -1;

  var filteredMetadata = metadata;
 
  var purposes = []; 
  if (symbolic) purposes.push("symbolic");
  if (neutral) purposes.push("mixed/transitional");
  if (realistic) purposes.push("realistic");
  
    if (purposes.length > 0 && purposes.length < 3)
    filteredMetadata = filteredMetadata.filter(metadata => purposes.includes(metadata[MD_PURPOSE_COLUMN]));

  if (backed)
    filteredMetadata = filteredMetadata.filter(metadata => metadata[MD_BACKED_COLUMN] == 'yes');

  var filteredData = data;
  if (topic !== "all") {
    filteredMetadata = filteredMetadata.filter(metadata => {
      return metadata[TOPIC_COLUMN] === topic;
    })
  }

  if (keywords.trim() !== "") {
    const keywords_ = keywords.toLowerCase().split(" ")
    filteredMetadata = filteredMetadata.filter(metadata => {
      return keywords_.every(keyword => {
        return [MD_DECISION_COLUMN, MD_NOTES_COLUMN, MD_TITEL_COLUMN, MD_ONDERWERP_COLUMN].some(C => metadata[C] && metadata[C].toLowerCase().includes(keyword));
      }
    )})
  }

  const numbers = new Set(filteredMetadata.map(md => md[MD_NUMBER_COLUMN]));
  
  filteredData = filteredData.filter(sample => {
    return numbers.has(sample[NUMBER_COLUMN]);
  });

  if (area) {
    const nummers = filteredData.filter(sample => sample[AREA_COLUMN] === impact && sample[PARTY_COLUMN] === party && sample[COUNT_COLUMN] > 0).map(sample => sample[NUMMER_COLUMN]);
    filteredMetadata = filteredMetadata.filter(metadata => {
      return nummers.includes(metadata[MD_NUMMER_COLUMN]);
    })
  }

  const impacts = getImpactSummaries(filteredData, columns);
  const parties = data ? Array.from(new Set(data.map(x => x[PARTY_COLUMN]))) : [];
  const topics = data ? Array.from(new Set(metadata.map(x => x[TOPIC_COLUMN]))) : [];
  var all_beneficiaries = Array.from(new Set(data.map(x => x[BENEFICIARIES_COLUMN]).flat().filter(x => x)));
  
  var beneficiaries = Object.fromEntries(parties.map(p => [p, Object.fromEntries(all_beneficiaries.map(b => [b, 0]))]));
  var beneficiary_counts = Object.fromEntries(all_beneficiaries.map(b => [b, 0]));
  filteredData.map(impact => {
      const count = impact[COUNT_COLUMN];
      if (impact[BENEFICIARIES_COLUMN])
        impact[BENEFICIARIES_COLUMN].map(beneficiary => {
          beneficiary_counts[beneficiary] += count;
        })
  });
  all_beneficiaries = all_beneficiaries.sort((a, b) => beneficiary_counts[b] - beneficiary_counts[a]);
  if (filterBeneficiaries.trim() !== "") {
    const keywords_ = filterBeneficiaries.toLowerCase().split(" ")
    all_beneficiaries = all_beneficiaries.filter(beneficiary => 
      keywords_.every(keyword => beneficiary.toLowerCase().includes(keyword)));
  }

  filteredData.map(impact => {
      const party = impact[PARTY_COLUMN];
      const count = impact[COUNT_COLUMN];
      
      if (impact[BENEFICIARIES_COLUMN])
        impact[BENEFICIARIES_COLUMN].map(beneficiary => {
        if (all_beneficiaries.includes(beneficiary))
          beneficiaries[party][beneficiary] += count;
        })
  });
  if (!normalize)
    parties.map(p => all_beneficiaries.map(b => {
      beneficiaries[p][b] = parseInt(Math.round(beneficiaries[p][b] / (seats[p] | 1)));
    }));

  const votes = Array.from(new Set(data.map(x => x[VOTE_COLUMN])));
  const all_nummers = Array.from(new Set(data.map(x => x[NUMMER_COLUMN])));
  const nummer_to_purpose = Object.fromEntries(filteredMetadata.map(md => [md[MD_NUMBER_COLUMN], md[MD_PURPOSE_COLUMN]]));
  const all_purposes = Array.from(new Set(Object.values(nummer_to_purpose)));

  var symbolism = Object.fromEntries(all_purposes.map(purpose => [purpose, Object.fromEntries(votes.map(vote => [
    vote, Object.fromEntries(parties.map(party => [party, 0]))]))]));
  
  filteredData.map(impact => {
      const nummer = impact[NUMMER_COLUMN];
      const party = impact[PARTY_COLUMN];
      const count = impact[COUNT_COLUMN];
      const vote = impact[VOTE_COLUMN];
      symbolism[nummer_to_purpose[nummer]][vote][party] += count;
  });
  
  
  
  function reset() {
    setTopic("all");
  }

  function setFocus(area, party, impact) { setArea(area); setParty(party); setImpact(impact); }
  function resetFocus() { setParty(null); setImpact(null); setArea(null); }

  return <FilterContext.Provider value={{
    error, loading, impacts, reset, parties,
    data: filteredData, metadata: filteredMetadata,
    topics, topic, setTopic, columns, metadataColumns: metadata_columns,
    keywords, setKeywords: throttledSetKeywords, 
    binary, setBinary, normalize, setNormalize,
    showDecisions, setShowDecisions,
    area, party, impact, resetFocus, setFocus,
    isOpen, setOpen, informationOpen, setInformationOpen,
    backed, setBacked, neutral, setNeutral, symbolic, setSymbolic,  realistic, setRealistic,
    all_beneficiaries, beneficiaries, beneficiary_counts,
    showBeneficiaries, setShowBeneficiaries, filterBeneficiaries, setFilterBeneficiaries: throttledSetFilterBeneficiaries,
    seats, symbolism
  }}>{children}</FilterContext.Provider>;
};

export const useData = () => useContext(FilterContext);
