"use client";
import { AddPet, checkoutPet, editPet } from "@/app/actions/actions";
import { Pet } from "@/lib/types";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type TPetContext = {
  optimisticPets: Pet[];
  selectedPetId: string | null;
  handleChangeSetSelectedPetId: (id: string) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  setSelectedPetId: (id: string | null) => void;
  handleAddPet: (pet: Pet) => Promise<void>;
  handleEditPet: (pet: Pet) => Promise<void>;
  handlePetCheckout: () => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({ data: pets, children }: PetContextProviderProps) => {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // Optimistic update function
  const [optimisticPets, setOptimisticPets] = useOptimistic(pets, (state, update: { type: "add" | "edit" | "delete"; pet?: Pet; id?: string }) => {
    switch (update.type) {
      case "add":
        return update.pet ? [...state, update.pet] : state;
      case "edit":
        return state.map((pet) => (pet.id === update.pet?.id ? { ...pet, ...update.pet } : pet));
      case "delete":
        return state.filter((pet) => pet.id !== update.id);
      default:
        return state;
    }
  });

  const selectedPet = optimisticPets.find((p) => p.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  function handleChangeSetSelectedPetId(id: string) {
    setSelectedPetId(id);
  }

  const handleAddPet = async (data: Pet) => {
    // setIsLoading(true);
    setOptimisticPets({ type: "add", pet: data }); // Optimistic UI update

    const error = await AddPet(data);
    if (error) {
      toast.error(error?.msg);
      return;
    }

  };

  const handleEditPet = async (data: Pet) => {
    if (!selectedPetId) {
      toast.error("No pet selected!");
      return;
    }

    setOptimisticPets({ type: "edit", pet: { ...data, id: selectedPetId } }); // Optimistic UI update

    const error = await editPet(selectedPetId, data);
    if (error) {
      toast.error(error?.msg);
      return;
    }

  };

  async function handlePetCheckout() {
    if (!selectedPetId) {
      toast.error("No pet selected!");
      return;
    }

    setOptimisticPets({ type: "delete", id: selectedPetId }); // Optimistic UI update

    const error = await checkoutPet(selectedPetId);
    if (error) {
      toast.error(error?.msg);
      return;
    }

    setSelectedPetId(null);
  }

  return (
    <PetContext.Provider
      value={{
        optimisticPets,
        selectedPetId,
        handleChangeSetSelectedPetId,
        selectedPet,
        numberOfPets,
        setSelectedPetId,
        handleAddPet,
        handleEditPet,
        handlePetCheckout,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
