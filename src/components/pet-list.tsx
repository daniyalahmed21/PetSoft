'use client'
import React from "react";
import Image from "next/image";
import PetPlaceholder from "../../public/pet-placeholder.png";
import {usePetContext}  from "@/lib/hooks";
import { cn } from "@/lib/utils";



const PetList = () => {  
  const {pets,selectedPetId,handleChangeSetSelectedPetId} = usePetContext()
  return (
    <ul className="bg-white border-b border-light">
      {pets.map((pet) => (
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
