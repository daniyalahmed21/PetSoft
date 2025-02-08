import React, { useContext } from "react";
import Image from "next/image";
import PetPlaceholder from "../../public/pet-placeholder.png";
import { Pet } from "@/lib/types";
import {PetContext} from "../context/pets-context-provider";


type PetListProps = {
  pets: Pet[];
};

const PetList = () => {  /*{ pets }: PetListProps Alternative Without React.FC*/
  const pets = useContext(PetContext);

  return (
    <ul className="bg-white border-b border-light">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition">
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
