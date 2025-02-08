"use client";
import { usePetContext, useSearchContext } from "@/lib/hooks";
import Image from "next/image";

const PetDetails = () => {
  const { selectedPet } = usePetContext();
  
  return (
    <section className="flex flex-col h-full w-full">
      {!selectedPet ? (
        <p className="h-full flex justify-center items-center text-2xl font-medium">
          No pet selected
        </p>
      ) : (
        <>
          <div className="flex items-center bg-white px-8 py-5 border-b border-light">
            <Image
              src={selectedPet?.imageUrl}
              alt="Selected pet image"
              height={75}
              width={75}
              className="h-[65px] w-[65px] rounded-full object-cover"
            />

            <h2 className="text-2xl font-semibold leading-7 ml-5">
              {selectedPet?.name}
            </h2>

            {/* <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async () => await handleCheckoutPet(pet.id)}
        >
          Checkout
        </PetButton>
      </div> */}
          </div>
          <div className="flex justify-around py-10 px-5 text-center">
            <div>
              <h3 className="text-[13px] font-medium uppercase text-zinc-700">
                Owner name
              </h3>
              <p className="mt-1 text-lg text-zinc-800">
                {selectedPet?.ownerName}
              </p>
            </div>

            <div>
              <h3 className="text-[13px] font-medium uppercase text-zinc-700">
                Age
              </h3>
              <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
            </div>
          </div>
          <div className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
            {selectedPet?.notes}
          </div>
        </>
      )}
    </section>
  );
};

export default PetDetails;
