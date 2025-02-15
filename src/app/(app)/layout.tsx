import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetsContextProvider from "@/context/pets-context-provider";
import SearchContextProvider from "@/context/search-context-provider";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import React from "react";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const data = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });

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
