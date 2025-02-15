"use client";
import { Button } from "./ui/button";
import { LogOut } from "@/app/actions/actions";

const SignOutBtn = () => {
  return <Button onClick={() => LogOut()}>Logout</Button>;
};

export default SignOutBtn;
