import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";
import { error } from "console";
import React from "react";

const page = async() => {
  let res = await fetch("https://bytegrad.com/course-assets/projects/petsoft/api/pets.com")
  
  if(!res.ok){
    throw new Error(`Response status: ${res.status}`)
  }

  const data = await res.json()

  return (
    <main >
      <div className="flex justify-between items-center text-white py-8">
        <Branding />
        <Stats />
      </div>
      <div className="grid grid-rows-[45px_250px_500px] md:grid-cols-3 md:grid-rows-[45px_1fr] gap-4 md:h-[400px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList pets={data}/>
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default page;
