"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
type AuthFormProps = {
  type: "login" | "signup";
};
const AuthFormBtn = ({ type }: AuthFormProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {type === "login" ? "Login" : "Signup"}
    </Button>
  );
};

export default AuthFormBtn;
