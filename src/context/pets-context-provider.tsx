"use client";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps={
  data : Pet[],
  children: React.ReactNode,
}

type TPetContext ={
  pets: Pet[],
  selectedPetId: string | null,
  handleChangeSetSelectedPetId: (id: string) => void,
  selectedPet: Pet ,
  numberOfPets : number
}

const PetContextProvider = ({ data, children }:PetContextProviderProps) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find(p => p.id === selectedPetId)
  const numberOfPets = pets.length

  function handleChangeSetSelectedPetId(id:string) {
    setSelectedPetId(id)
  }

  return (
    <PetContext.Provider value={{ pets, selectedPetId,handleChangeSetSelectedPetId,selectedPet,numberOfPets }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
