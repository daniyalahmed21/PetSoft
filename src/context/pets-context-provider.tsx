'use client'
import React, { createContext, useState } from "react";

export const PetContext = createContext(null);

const PetsContextProvider = ({ data, children }) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);
  return (
    <PetContext.Provider value={{ pets, selectedPetId, setSelectedPetId }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetsContextProvider;
