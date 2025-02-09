'use client'
import React from "react";
import Image from "next/image";
import PetPlaceholder from "../../public/pet-placeholder.png";
import {usePetContext, useSearchContext}  from "@/lib/hooks";
import { cn } from "@/lib/utils";
import PetButton from "./pet-button";



const PetList = () => {  
  const {pets,selectedPetId,handleChangeSetSelectedPetId} = usePetContext()
  const { searchQuery } = useSearchContext();
  const filteredPets = pets.filter((pet)=>pet.name.toLowerCase().includes(searchQuery))
  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button onClick={()=>handleChangeSetSelectedPetId(pet.id)} className={cn("flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
           { 'bg-[#EFF1F2]' : selectedPetId === pet.id}
          )}>
            <Image
              src={pet.imageUrl || PetPlaceholder}
              alt={`${pet.name}'s image`}
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
          

        </li>
       
      ))}
    </ul>
  );
};


export default PetList;
