"use server";

import { prisma } from "@/lib/db";
import { Pet } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { petIdSchema, petFormSchema } from "@/lib/validation";
import { signIn } from "@/lib/auth";
import { signOut } from '@/lib/auth'
import bcrypt from "bcryptjs";


export async function Login (formData:FormData){
    await signIn("credentials", formData)
}

export async function LogOut() {
  await signOut({redirectTo:"/"});
 
}

export async function SignUp(formData:FormData) {

  // Hash the password
  const hashedPassword = await bcrypt.hash(formData.get("password") as string, 10);

  await prisma.user.create({
    data:{
      email:formData.get("email") as string,
      hashedPassword,
    }
  })
  await signIn("credentials", formData)

}

export async function AddPet(pet: Pet) {
  // Zod validation for pet data
  const validatedPet = petFormSchema.safeParse(pet);

  // If validation fails, return an error message
  if (!validatedPet.success) {
    return { msg: "Invalid pet data", details: validatedPet.error.errors };
  }

  try {
    await prisma.pet.create({ data: validatedPet.data });
    revalidatePath("/app", "layout");
    return null; // Return null for success
  } catch (error) {
    return { msg: "Error creating pet" };
  }
}

export async function editPet(selectedPetId: unknown, updatedPet: unknown) {
  // Zod validation for pet ID and updated pet data
  const validatedPetId = petIdSchema.safeParse(selectedPetId);
  const validatedPet = petFormSchema.safeParse(updatedPet);

  // If either validation fails, return an error message
  if (!validatedPetId.success || !validatedPet.success) {
    return { msg: "Invalid pet data" };
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data},
      data: validatedPet.data,
    });
    revalidatePath("/app", "layout");
    return null; 
  } catch (error) {
    return { msg: "Error editing pet" };
  }
}

export async function checkoutPet(selectedPetId: unknown) {
  // Zod validation for pet ID
  const validatedPetId = petIdSchema.safeParse(selectedPetId);

  // If validation fails, return an error message
  if (!validatedPetId.success) {
    return { msg: "Invalid pet ID", details: validatedPetId.error.errors };
  }

  try {
    await prisma.pet.delete({ where: { id: validatedPetId.data} });
    revalidatePath("/app", "layout");
    return null; // Return null for success
  } catch (error) {
    return { msg: "Error deleting pet" };
  }
}
