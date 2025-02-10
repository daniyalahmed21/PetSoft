"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import { AddPet } from "@/app/actions/actions";

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
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetFormData>();

  async function onSubmit(data: PetFormData) {
    // Set loading state to true
    setIsLoading(true);

    if (data.imageUrl === undefined) {
      data.imageUrl =
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";
    }

    if (actionType === "add") {
      await AddPet(data); // Assuming AddPet is a server action
    }

    // Reset form and callback
    reset();
    onFormSubmission();
    setInterval(() => {
      setIsLoading(false);
    },5000)
    // Set loading state back to false after submission
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // Handle form submission with react-hook-form
      className="flex flex-col space-y-4"
    >
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

      {/* Submit button */}
      <Button type="submit" className="mt-5 self-end" disabled={isLoading}>
        {isLoading ? "Submitting..." : actionType === "add" ? "Add" : "Save"}
      </Button>
    </form>
  );
}
