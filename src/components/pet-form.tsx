"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import { petFormSchema } from "@/lib/validation";


type PetFormData = Pet

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: selectedPet?.name || "",
      ownerName: selectedPet?.ownerName || "",
      age: selectedPet?.age || 0,
      imageUrl: selectedPet?.imageUrl || "",
      notes: selectedPet?.notes || "",
    },
  });

  async function onSubmit(data: Pet) {
    onFormSubmission();

    // if (!data.imageUrl) {
    //   data.imageUrl =
    //     "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";
    // }

    if (actionType === "add") {
      await handleAddPet(data);
    } else if (actionType === "edit") {
      await handleEditPet(data);
    }

    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input type="text" id="ownerName" {...register("ownerName")} />
        {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName.message}</p>}
      </div>

      <div>
        <Label htmlFor="age">Age</Label>
        <Input type="number" id="age" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input type="text" id="imageUrl" {...register("imageUrl")} />
        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" {...register("notes")} />
        {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
      </div>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add" : "Save"}
      </Button>
    </form>
  );
}
