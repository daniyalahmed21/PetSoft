import ContentBlock from "@/components/content-block";
import H1 from "@/components/H1";
import auth from "@/middleware";
import { redirect } from "next/navigation";
import React from "react";
import SignOutBtn from "@/components/signOutButton"
const page = async() => {
  const session = await auth() 
  if (!session?.user) {
    redirect('/login')
  }
  return (
    <main className="flex flex-col gap-4 p-4">
      <H1 className=" text-white py-8 ">Account</H1>
        <ContentBlock className="w-full h-[400px] flex flex-col gap-4 justify-center items-center">
          <h2>{session.user.email}</h2>
          <SignOutBtn />
        </ContentBlock>
    </main>
  );
};

export default page;
