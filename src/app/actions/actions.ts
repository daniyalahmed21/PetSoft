"use server";

import { prisma } from "@/lib/db";
import { Pet } from "@/lib/types";
import { revalidatePath } from "next/cache";
export async function AddPet(pet: Pet) {
  try {
    await prisma.pet.create({
      data: pet,
    });

    revalidatePath("/app", "layout");
  } catch (error) {
    return {
      msg: "Error creating pet ",
    };
  }
}

export async function editPet(selectedPetId: string, updatedPet: Pet) {

  try {
    await prisma.pet.update({
      where: {
        id: selectedPetId,
      },
      data: updatedPet,
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return {
      msg: "Error checking out pet ",
    };
  }
}


export async function checkoutPet(selectedPetId: string) {

  try {
    await prisma.pet.delete({
      where: {
        id: selectedPetId,
      }
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return {
      msg: "Error editing pet ",
    };
  }
}