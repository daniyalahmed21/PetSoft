import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetButton from "@/components/pet-button";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";

const page = () => {

  return (
    <main  >
      <div className="flex justify-between items-center text-white py-8 px-4">
        <Branding />
        <Stats />
      </div>
      <div className="grid grid-rows-[45px_250px_500px] md:grid-cols-3 md:grid-rows-[45px_1fr] gap-2 md:gap-4 md:h-[400px] px-4">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 relative">
          <ContentBlock>
            <PetList />
            <PetButton actionType="add">
            add
          </PetButton>
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full mb-4 md:mb-0">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default page;
