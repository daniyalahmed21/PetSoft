"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthBtnProps = {
  type: "signUp" | "logIn";
};

export default function AuthBtn({ type }: AuthBtnProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {type === "signUp" ? "Sign Up" : "Log In"}
    </Button>
  );
}
