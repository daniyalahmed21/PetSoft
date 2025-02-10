"use server";

import { prisma } from "@/lib/db";
import { Pet } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function AddPet(pet:Pet) {
  await prisma.pet.create({
    data: pet,
  });

  revalidatePath('/app','layout');
}
