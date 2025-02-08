import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetsContextProvider from "@/context/pets-context-provider";
import SearchContextProvider from "@/context/search-context-provider";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let res = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets.com"
  );

  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }

  const data = await res.json();
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto ">
        <AppHeader />
        <SearchContextProvider>
          <PetsContextProvider data={data}>{children}</PetsContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>
    </>
  );
}
