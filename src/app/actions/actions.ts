"use server";

import { prisma } from "@/lib/db";
import { Pet } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { petIdSchema, petFormSchema, authSchema } from "@/lib/validation";
import { auth, signIn } from "@/lib/auth";
import { signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { FormState } from "react-hook-form";
import { AuthError } from "next-auth";

export async function Login(prevState: unknown ,formData: FormData) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in.",
          };
        }
      }
    }

    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
}

export async function LogOut() {
  await signOut({ redirectTo: "/" });
}

export async function SignUp(prevState: unknown ,formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  const formDataObject = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(formDataObject);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }
  const { email, password } = validatedFormData.data;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists.",
        };
      }
    }

    return {
      message: "Could not create user.",
    };
  }

  await signIn("credentials", formData);
}

export async function AddPet(pet: Pet) {
  // Zod validation for pet data
  const validatedPet = petFormSchema.safeParse(pet);

  // If validation fails, return an error message
  if (!validatedPet.success) {
    return { msg: "Invalid pet data", details: validatedPet.error.errors };
  }

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    revalidatePath("/app", "layout");
    return null;
  } catch (error) {
    return { msg: "Error creating pet" };
  }
}

export async function editPet(selectedPetId: unknown, updatedPet: unknown) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  // Zod validation for pet ID and updated pet data
  const validatedPetId = petIdSchema.safeParse(selectedPetId);
  const validatedPet = petFormSchema.safeParse(updatedPet);

  // If either validation fails, return an error message
  if (!validatedPetId.success || !validatedPet.success) {
    return { msg: "Invalid pet data" };
  }

  const pet = await prisma.pet.findUnique({
    where: { id: validatedPetId.data },
    select: {
      userId: true,
    },
  });

  if (!pet) {
    return { msg: "Pet not found" };
  }

  if (session?.user.id !== pet?.userId) {
    return { msg: "You cannot checkout a pet you own" };
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
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

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const pet = await prisma.pet.findUnique({
    where: { id: validatedPetId.data },
    select: {
      userId: true,
    },
  });

  if (!pet) {
    return { msg: "Pet not found" };
  }

  if (session?.user.id !== pet?.userId) {
    return { msg: "You cannot checkout a pet you own" };
  }

  try {
    await prisma.pet.delete({ where: { id: validatedPetId.data } });
    revalidatePath("/app", "layout");
    return null; // Return null for success
  } catch (error) {
    return { msg: "Error deleting pet" };
  }
} 