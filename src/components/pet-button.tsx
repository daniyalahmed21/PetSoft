'use client'
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";

type PetButtonProps = {
  actionType: "add" | "checkout" | "edit";
  children: string;
  onClick?: () => void;
};

const PetButton = ({ actionType, children, onClick }: PetButtonProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false)
  if (actionType === "checkout") {
    return (
      <Button variant="default" onClick={onClick}>
        {children}
      </Button>
    );
  }
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} >
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button
            variant="default"
            size="icon"
            className="rounded-full absolute right-2 bottom-2 md:right-4 md:bottom-4"
          >
            <PlusIcon size={24} />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{ actionType === "add" ? (
          "Add a new pet") : "Edit pet information"}</DialogTitle>
        </DialogHeader>
        {/* Add pet form */}
        <PetForm actionType={actionType}  onFormSubmission={()=>setIsFormOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
};

export default PetButton;
