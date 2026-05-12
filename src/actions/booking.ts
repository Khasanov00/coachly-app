"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in to book a session.");
  }

  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // Let's create a generic coach if none exists to satisfy relations
  let defaultCoach = await prisma.coach.findFirst();
  if (!defaultCoach) {
    defaultCoach = await prisma.coach.create({
      data: {
        name: "Head Coach",
        role: "Senior Consultant",
        description: "Default platform coach",
      }
    });
  }

  await prisma.booking.create({
    data: {
      userId: session.user.id,
      coachId: defaultCoach.id,
      date: new Date(date),
      timeSlot: time,
      goals: `Booking for ${name} (${email})`,
      status: "PENDING"
    }
  });

  revalidatePath("/admin");
  revalidatePath("/profile");

  return { success: true };
}
