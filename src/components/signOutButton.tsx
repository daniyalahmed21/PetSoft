"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { LogOut } from "@/app/actions/actions";

const SignOutBtn = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button disabled={isPending} onClick={() => startTransition(() => LogOut())}>Logout</Button>
  );
};

export default SignOutBtn;
