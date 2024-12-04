import React, { createContext, useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../config";

export const OutletsContext = createContext(null);

export default function OutletsProvider({ children }) {
  const [outlets, setOutlets] = useState([]);
  const [outletCities, setOutletCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isFetchingOutlets, setIsFetchingOutlets] = useState(false);

  const fetchOutlets = async () => {
    setIsFetchingOutlets(true);
    try {
      const res = await fetch(`${API_BASE_URL}/outlets`);
      if (!res.ok) throw Error;

      const parsed = await res.json();
      console.log(parsed.data);
      setOutlets(parsed.data);
    } catch (error) {
      console.error("Error fecthing outlets: ", error.message);
    } finally {
      setIsFetchingOutlets(false);
    }
  };

  const fetchOutletsByTerms = async () => {
    if (searchTerm.length < 6) {
      setSearchResult([]);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/outlets?search=${searchTerm}`);
      if (!res.ok) throw Error;

      const parsed = await res.json();
      if (parsed.data === false) {
        setSearchResult([]);
      }

      console.log("from terms", parsed.data);
      setSearchResult(parsed.data);
    } catch (error) {
      console.error("Error fecthing outlets: ", error.message);
    }
  };

  const fetchOutletCities = async () => {
    setIsFetchingOutlets(true);
    try {
      const res = await fetch(`${API_BASE_URL}/outlets/cities`);
      if (!res.ok) throw Error;

      const parsed = await res.json();
      console.log(parsed.data);
      setOutletCities(parsed.data);
    } catch (error) {
      console.error("Error fecthing outlet cities: ", error.message);
    } finally {
      setIsFetchingOutlets(false);
    }
  };

  useEffect(() => {
    fetchOutlets();
    fetchOutletCities();
  }, []);

  useEffect(() => {
    fetchOutletsByTerms();
  }, [searchTerm]);

  return (
    <OutletsContext.Provider
      value={{
        outlets,
        outletCities,
        searchResult,
        setSearchTerm,
        isFetchingOutlets,
      }}
    >
      {children}
    </OutletsContext.Provider>
  );
}
