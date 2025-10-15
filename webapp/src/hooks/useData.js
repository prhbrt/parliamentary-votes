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
  const [showDecisions, setShowDecisions] = useState(false);
  const [topic, setTopic] = useState("all");
  const [allData, setData] = useState({data: [], metadata: [], metadata_columns: [], columns: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [area, setArea] = useState(null);
  const [party, setParty] = useState(null);
  const [impact, setImpact] = useState(null);

  const throttledSetKeywords = useThrottledSetter(setKeywords, 1000);
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

  const MD_DECISION_COLUMN = metadata_columns.indexOf("summary_of_decision")
  const MD_NOTES_COLUMN = metadata_columns.indexOf("notes")
  const MD_TITEL_COLUMN = metadata_columns.indexOf("Titel")
  const MD_ONDERWERP_COLUMN = metadata_columns.indexOf("Onderwerp")

  var filteredMetadata = metadata;
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
    const AREA_COLUMN = columns.indexOf(area);
    const PARTY_COLUMN = columns.indexOf('party');
    const NUMMER_COLUMN = columns.indexOf('Nummer');
    const MD_NUMMER_COLUMN = metadata_columns.indexOf('Nummer');

    const nummers = filteredData.filter(sample => sample[AREA_COLUMN] === impact && sample[PARTY_COLUMN] === party).map(sample => sample[NUMMER_COLUMN]);
    filteredMetadata = filteredMetadata.filter(metadata => {
      return nummers.includes(metadata[MD_NUMMER_COLUMN]);
    })
  }



  const impacts = getImpactSummaries(filteredData, columns);
  const parties = data ? Array.from(new Set(data.map(x => x[PARTY_COLUMN]))) : [];
  const topics = data ? Array.from(new Set(metadata.map(x => x[TOPIC_COLUMN]))) : [];
  
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
  }}>{children}</FilterContext.Provider>;
};

export const useData = () => useContext(FilterContext);
