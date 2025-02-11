"use client";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

export const SearchContext = createContext<TSearchContext | null>(null);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleChangeSetSearchQuery: (value: string) => void;
};

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  function handleChangeSetSearchQuery(value: string) {
    setSearchQuery(value);
  }

  return (
    <SearchContext.Provider value={{ searchQuery, handleChangeSetSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
