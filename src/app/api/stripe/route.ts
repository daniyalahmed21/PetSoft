import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const rawBody = await req.arrayBuffer(); // Use arrayBuffer to preserve raw format
  const body = Buffer.from(rawBody);
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_email;

    console.log("🔍 Webhook received for event:", event.type);
    console.log("📧 Customer Email from Stripe:", session.customer_email);
    if (email) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { hasAccess: true },
      });
      
      console.log("🔍 Prisma Update Result:", updatedUser);
      
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
