import * as React from 'react';
import { useRef, useCallback } from "react";
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { t } from 'i18next';

import JSZip from 'jszip';
import dataFile from "../data/party_stances.json"

const initialState = {};
const FilterContext = createContext(initialState);

const properties = ['coalitieakkoord_consistentie', 'uitvoeringsmoeilijkheid', 'financieringsbron',]

const impacts = [
 'asiel_toegankelijkheid', 'box3_effect', 'fiscaal_label',
 'defensieuitgaven', 'dierenwelzijn_effect', 'economische_kosteneffect', 
 'gemeentelijke_last', 'huurmarkt_effect', 'hypotheeklasten_effect',
 'israel_effect', 'kinderopvang_betaalbaarheid', 'mensenrechten_effect', 
 'koopwoning_effect', 'kosten_van_leven_effect', 'milieu_effect',
 'oekraine_effect', 'palestina_effect', 'pas_melders_effect',
 'provinciale_last', 'schiphol_capaciteit', 'zorg_effect',
 'sociale_zekerheidseffect', 'veiligheids_effect',
];

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


function getPropertyBehavior(property, votes, parties, data, metadata, columns, metadata_columns) {
  if (metadata_columns.length == 0) {
    return;
  }
    
  const NUMMER_COLUMN = columns.indexOf('Nummer');
  const MD_NUMMER_COLUMN = metadata_columns.indexOf('Nummer');
  const MD_VALUE_COLUMN = metadata_columns.indexOf(property);
  const COUNT_COLUMN = columns.indexOf('count');
  const PARTY_COLUMN = columns.indexOf('party');
  const VOTE_COLUMN = columns.indexOf('vote');

  const nummer_to_value = Object.fromEntries(metadata.map(md => [md[MD_NUMMER_COLUMN], md[MD_VALUE_COLUMN]]));
  const all_values = Array.from(new Set(Object.values(nummer_to_value)));
  
  var counts = Object.fromEntries(votes.map(vote => [vote, Object.fromEntries(all_values.map(value => [
    value, Object.fromEntries(parties.map(party => [party, 0]))]))]));
  
  data.map(impact => {
      const nummer = impact[NUMMER_COLUMN];
      const party = impact[PARTY_COLUMN];
      const count = impact[COUNT_COLUMN];
      const vote = impact[VOTE_COLUMN];
      const value = nummer_to_value[nummer];
      counts[vote][value][party] += count;
  });

  return {
    'values': all_values,
    'counts': counts
  }
}


function runFilters(data, metadata, metadata_columns, columns,
    topic, keywords, normalize,
    backed, neutral, symbolic, realistic,
    impactFilters, filterBeneficiaries
  ) {
  const NUMMER_COLUMN = data ? columns.indexOf('Nummer') : -1;
  const PARTY_COLUMN = data ? columns.indexOf('party') : -1;
  const TOPIC_COLUMN = data ? metadata_columns.indexOf('onderwerp') : -1;
  
  const BENEFICIARIES_COLUMN = data? columns.indexOf('begunstigden') : -1;
  const COUNT_COLUMN = data ? columns.indexOf('count') : -1;
  const VOTE_COLUMN = data ? columns.indexOf('vote') : -1;

  const MD_DECISION_COLUMN = data ? metadata_columns.indexOf("samenvatting_van_besluit"): -1;
  const MD_NOTES_COLUMN = data ? metadata_columns.indexOf("notities"): -1;
  const MD_TITEL_COLUMN = data ? metadata_columns.indexOf("Titel"): -1;
  const MD_ONDERWERP_COLUMN = data ? metadata_columns.indexOf("Onderwerp"): -1;
  const MD_PURPOSE_COLUMN = data ? metadata_columns.indexOf("doel"): -1;
  const MD_BACKED_COLUMN = data ? metadata_columns.indexOf("bevat_kostenstrategie"): -1;
  
  const MD_NUMMER_COLUMN = data ? metadata_columns.indexOf('Nummer') : -1;

  var filteredMetadata = metadata;
 
  // var purposes = []; 
  // if (symbolic) purposes.push("symbolisch");
  // if (neutral) purposes.push("mixed/transitional");
  // if (realistic) purposes.push("realistic");
  
  // if (purposes.length > 0 && purposes.length < 3)
  //   filteredMetadata = filteredMetadata.filter(metadata => purposes.includes(metadata[MD_PURPOSE_COLUMN]));

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

  if (impactFilters.length > 0) {
    var nummers = null;
    impactFilters.map(([area, party, impact, vote]) => {
      if (area === "doel" || properties.includes(area)) {
        const newNummers0 = new Set(filteredMetadata.filter(
          sample => sample[metadata_columns.indexOf(area)] === impact
        ).map(sample => sample[MD_NUMMER_COLUMN]));
        
        const newNummers1 = new Set(filteredData.filter(
          sample => sample[PARTY_COLUMN] === party && sample[COUNT_COLUMN] > 0 && sample[VOTE_COLUMN] === vote
        ).map(sample => sample[NUMMER_COLUMN]));
        const newNummers = newNummers0.intersection(newNummers1);
        nummers = nummers ? newNummers.intersection(nummers) : newNummers;
      } else {
        const newNummers = new Set(filteredData.filter(
          sample => sample[columns.indexOf(area)] === impact && sample[PARTY_COLUMN] === party && sample[COUNT_COLUMN] > 0
        ).map(sample => sample[NUMMER_COLUMN]));
        nummers = nummers ? newNummers.intersection(nummers) : newNummers;
      }
    });
    filteredMetadata = filteredMetadata.filter(metadata => {
      return nummers.has(metadata[MD_NUMMER_COLUMN]);
    })
  }

  const numbers = new Set(filteredMetadata.map(md => md[MD_NUMMER_COLUMN])).intersection(new Set(filteredData.map(d => d[NUMMER_COLUMN])));
  
  filteredData = filteredData.filter(sample => {
    return numbers.has(sample[NUMMER_COLUMN]);
  });

  filteredMetadata = filteredMetadata.filter(sample => {
    return numbers.has(sample[MD_NUMMER_COLUMN]);
  });

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
  all_beneficiaries = all_beneficiaries.filter(b => beneficiary_counts[b] > 0).sort((a, b) => beneficiary_counts[b] - beneficiary_counts[a]);

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
  const nummer_to_purpose = Object.fromEntries(filteredMetadata.map(md => [md[MD_NUMMER_COLUMN], md[MD_PURPOSE_COLUMN]]));
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
  
  var symbolism = Object.fromEntries(all_purposes.map(purpose => [purpose, Object.fromEntries(votes.map(vote => [
    vote, Object.fromEntries(parties.map(party => [party, 0]))]))]));
  
  filteredData.map(impact => {
      const nummer = impact[NUMMER_COLUMN];
      const party = impact[PARTY_COLUMN];
      const count = impact[COUNT_COLUMN];
      const vote = impact[VOTE_COLUMN];
      symbolism[nummer_to_purpose[nummer]][vote][party] += count;
  });

  const behaviors = Object.fromEntries(properties.map(property => [
    property, getPropertyBehavior(property, votes, parties, filteredData, filteredMetadata, columns, metadata_columns)]));
  window.behaviors = behaviors;

  return { filteredData, filteredMetadata, impacts, topics, parties, all_beneficiaries, beneficiaries, beneficiary_counts, symbolism, behaviors};
}

export const FilterProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false); // whether the header menu is open on mobile.
  const [informationOpen, setInformationOpen] = useState(false);
  const [explanation, setExplanation] = useState(null);

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

  const [impactFilters, setImpactFilters] = useState([]);

  const throttledSetKeywords = useThrottledSetter(setKeywords, 1000);
  const throttledSetFilterBeneficiaries = useThrottledSetter(setFilterBeneficiaries, 1000);
  const { data, metadata, metadata_columns, columns } = allData;
  
  function addImpactFilter(area, party, impact, vote) {
    if (impactFilters.filter(([a, p, i, v]) => a===area && p === party && i === impact && v === vote).length > 0)
      return
    setImpactFilters(filters => [...filters, [area, party, impact, vote]]);
  }
  function removeImpactFilter(area, party, impact, vote) {
    const newFilters = impactFilters.filter(([a, p, i, v]) => a!==area || p !== party || i !== impact || (v !== vote));
    if (newFilters.length !== impactFilters.length)
      setImpactFilters(newFilters);
  }


  useEffect(() => {
    const loadData = async () => {
      // try {
        const response = await fetch(dataFile);
        setData(await response.json());
        // const arrayBuffer = await response.arrayBuffer();
        // const zip = await JSZip.loadAsync(arrayBuffer);
        // const jsonFile = zip.file('party_stances.json');
        // if (jsonFile) {
        //   const jsonContent = await jsonFile.async('text');
        //   window.data = JSON.parse(jsonContent);
        //   setData(JSON.parse(jsonContent));
        // } else {
        //   setError(t("Couldn't get data") + ".")
        // }
        setLoading(false);
      // } catch (e) {
      //   setLoading(false);
      //   setError(t("Couldn't get data") + ": " + e )
      // }
    };
    loadData();
  }, []);
  
  const {
    filteredData, filteredMetadata, impacts, topics, parties, all_beneficiaries,
    beneficiaries, beneficiary_counts, symbolism, behaviors
  } = React.useMemo(() => {
    return runFilters(data, metadata, metadata_columns, columns,
      topic, keywords, normalize,
      backed, neutral, symbolic, realistic, impactFilters,
      filterBeneficiaries,
    );
  }, [data, metadata, metadata_columns, columns,
      topic, keywords, normalize,
      backed, neutral, symbolic, realistic,
      impactFilters,
      filterBeneficiaries
    ]);
  
  

  return <FilterContext.Provider value={{
    error, loading, impacts, parties,
    data: filteredData, metadata: filteredMetadata,
    topics, topic, setTopic, columns, metadataColumns: metadata_columns,
    keywords, setKeywords: throttledSetKeywords, 
    binary, setBinary, normalize, setNormalize,
    showDecisions, setShowDecisions,
    impactFilters, removeImpactFilter, addImpactFilter,
    isOpen, setOpen, informationOpen, setInformationOpen,
    backed, setBacked, neutral, setNeutral, symbolic, setSymbolic,  realistic, setRealistic,
    all_beneficiaries, beneficiaries, beneficiary_counts,
    showBeneficiaries, setShowBeneficiaries, filterBeneficiaries, setFilterBeneficiaries: throttledSetFilterBeneficiaries,
    seats, symbolism, behaviors, 
    explanation, setExplanation,
  }}>{children}</FilterContext.Provider>;
};

export const useData = () => useContext(FilterContext);
