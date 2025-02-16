"use server";

import { prisma } from "@/lib/db";
import { Pet } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { petIdSchema, petFormSchema, authSchema } from "@/lib/validation";
import { auth, signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export async function Login(formData: FormData) {
  try {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }
    await signIn("credentials", formData);
    redirect("/app/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    return { msg: "Login failed" };
  }
}

export async function LogOut() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    console.error("Logout error:", error);
  }
}

export async function SignUp(formData: unknown) {
  try {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }
    const formDataObject = Object.fromEntries(formData.entries());
    const validatedFormData = authSchema.safeParse(formDataObject);
    if (!validatedFormData.success) {
      return { msg: "Invalid form data", details: validatedFormData.error.errors };
    }
    const { email, password } = validatedFormData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({ data: { email, hashedPassword } });
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code === "P2002")
      return { msg: "Email already in use" };
    }
    console.error("Signup error:", error);
    return { msg: "Signup failed" };
  }
}

export async function AddPet(pet: Pet) {
  try {
    const validatedPet = petFormSchema.safeParse(pet);
    if (!validatedPet.success) {
      return { msg: "Invalid pet data", details: validatedPet.error.errors };
    }
    const session = await auth();
    if (!session?.user) {
      redirect("/login");
    }
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: { connect: { id: session.user.id } },
      },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    console.error("AddPet error:", error);
    return { msg: "Error creating pet" };
  }
}

export async function editPet(selectedPetId: unknown, updatedPet: unknown) {
  try {
    const session = await auth();
    if (!session?.user) {
      redirect("/login");
    }
    const validatedPetId = petIdSchema.safeParse(selectedPetId);
    const validatedPet = petFormSchema.safeParse(updatedPet);
    if (!validatedPetId.success || !validatedPet.success) {
      return { msg: "Invalid pet data" };
    }
    const pet = await prisma.pet.findUnique({ where: { id: validatedPetId.data }, select: { userId: true } });
    if (!pet || session.user.id !== pet.userId) {
      return { msg: "Unauthorized or pet not found" };
    }
    await prisma.pet.update({ where: { id: validatedPetId.data }, data: validatedPet.data });
    revalidatePath("/app", "layout");
  } catch (error) {
    console.error("editPet error:", error);
    return { msg: "Error editing pet" };
  }
}

export async function checkoutPet(selectedPetId: unknown) {
  try {
    const validatedPetId = petIdSchema.safeParse(selectedPetId);
    if (!validatedPetId.success) {
      return { msg: "Invalid pet ID", details: validatedPetId.error.errors };
    }
    const session = await auth();
    if (!session?.user) {
      redirect("/login");
    }
    const pet = await prisma.pet.findUnique({ where: { id: validatedPetId.data }, select: { userId: true } });
    if (!pet || session.user.id !== pet.userId) {
      return { msg: "Unauthorized or pet not found" };
    }
    await prisma.pet.delete({ where: { id: validatedPetId.data } });
    revalidatePath("/app", "layout");
  } catch (error) {
    console.error("checkoutPet error:", error);
    return { msg: "Error deleting pet" };
  }
}
