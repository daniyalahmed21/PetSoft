"use client";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSetSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Pet) => void;
  handleEditPet: (updatedPet: Pet) => void;
  handlePetCheckout: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const selectedPet = pets.find((p) => p.id === selectedPetId);
  const numberOfPets = pets.length;

  function handleChangeSetSelectedPetId(id: string) {
    setSelectedPetId(id);
  }

  function handleAddPet(newPet: Pet) {
    const petWithId = { ...newPet, id: crypto.randomUUID() }; // Ensure unique ID
    setPets((prevPets) => [...prevPets, petWithId]);
  }

  function handleEditPet(updatedPet: Pet) {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === selectedPetId ? { ...pet, ...updatedPet } : pet))
    );
  }
  
  function handlePetCheckout(id: string) {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));

    // Reset selectedPetId if the removed pet was selected
    if (selectedPetId === id) {
      setSelectedPetId(null);
    }
  }

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleChangeSetSelectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handlePetCheckout,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
