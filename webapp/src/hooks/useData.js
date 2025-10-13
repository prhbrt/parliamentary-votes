import * as React from 'react';

import { createContext, useState } from 'react';
import { useContext } from 'react';


const initialState = {open: false};
const FilterContext = createContext(initialState);


export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({});

  var data = [];
  
  function reset() {
    
  }

  return <FilterContext.Provider value={{
    filters, setFilters, data, reset
  }}>{children}</FilterContext.Provider>;
};

export const useData = () => useContext(FilterContext);
