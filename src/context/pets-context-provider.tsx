"use client";
import { AddPet } from "@/app/actions/actions";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSetSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  setSelectedPetId: (id: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({
  data: pets,
  children,
}: PetContextProviderProps) => {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedPet = pets.find((p) => p.id === selectedPetId);
  const numberOfPets = pets.length;

  function handleChangeSetSelectedPetId(id: string) {
    setSelectedPetId(id);
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSetSelectedPetId,
        selectedPet,
        numberOfPets,
        setSelectedPetId,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
