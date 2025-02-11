import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetsContextProvider from "@/context/pets-context-provider";
import SearchContextProvider from "@/context/search-context-provider";
import { prisma } from "@/lib/db";
import React from "react";
import { Toaster } from "sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await prisma.pet.findMany();
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto ">
        <AppHeader />
        <SearchContextProvider>
          <PetsContextProvider data={data}>{children}</PetsContextProvider>
        </SearchContextProvider>
        <Toaster richColors position="top-right" />
        <AppFooter />
      </div>
    </>
  );
}
