import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    if (evt.type === "user.created") {
      const email = evt.data.email_addresses.find(
        (email) => email.id === evt.data.primary_email_address_id,
      );

      await db.user.create({
        data: {
          id: evt.data.id,
          email: email?.email_address ?? "",
          name:
            `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim() ||
            null,
        },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
