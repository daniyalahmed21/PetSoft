import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import Link from "next/link";
import React from "react";

function Signup() {
  return (
    <main>
      <H1 className="text-center mb-5">Signup Page</H1>
      <AuthForm type="signup"/>
      <p className="text-sm mt-4 text-zinc-500">
        Already have an account?{" "}
        <Link className="text-medium " href="/login">
          Sign up
        </Link>
      </p>
    </main>
  );
}

export default Signup;
