import ContentBlock from "@/components/content-block";
import H1 from "@/components/H1";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col gap-4 p-4">
      <H1 className=" text-white py-8 ">Account</H1>
        <ContentBlock className="w-full h-[400px] flex justify-center items-center">
          <h2>Your Account Details</h2>
        </ContentBlock>
    </main>
  );
};

export default page;
