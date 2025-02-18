import H1 from "@/components/H1";
import React from "react";
import CheckoutButton from "@/components/checkoutButton";

const page = ({ searchParams }) => {
  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>PetSoft access requires payment</H1>
      {!searchParams.success && <CheckoutButton />}
      {searchParams.success && <h2>Payment successful!</h2>}
    </main>
  );
};

export default page;
