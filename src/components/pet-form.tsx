"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";

type PetFormData = Pet;

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetFormData>();

  function onSubmit(data: PetFormData) {
    if (data.imageUrl === undefined) {
      data.imageUrl =
        " https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";
    }
    if (actionType === "edit") {
      handleEditPet(data);
    }
    if (actionType === "add") {
      handleAddPet(data);
    }

    reset();
    onFormSubmission();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
          defaultValue={actionType === "edit" ? selectedPet?.name : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input
          type="text"
          id="ownerName"
          {...register("ownerName", { required: "Owner name is required" })}
          defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
        />
        {errors.ownerName && (
          <p className="text-red-500 text-sm">{errors.ownerName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          type="number"
          id="age"
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
          })}
          defaultValue={actionType === "edit" ? selectedPet?.age : ""}
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL (optional)</Label>
        <Input
          type="text"
          id="imageUrl"
          {...register("imageUrl")}
          defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...register("notes", { required: "Notes are required" })}
          defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
        />
        {errors.notes && (
          <p className="text-red-500 text-sm">{errors.notes.message}</p>
        )}
      </div>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add" : "Save"}
      </Button>
    </form>
  );
}
