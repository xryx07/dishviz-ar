import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  restaurant: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, restaurant, email, phone, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, restaurant, email, phone });

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send email to business owner
    const businessEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DishViz AR <onboarding@resend.dev>",
        to: ["dishviz.ar@gmail.com"],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Restaurant:</strong> ${restaurant || "Not provided"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <h2>Message:</h2>
          <p>${message}</p>
        `,
      }),
    });

    if (!businessEmailRes.ok) {
      const errorData = await businessEmailRes.text();
      console.error("Resend API error (business email):", errorData);
      throw new Error(`Failed to send business email: ${errorData}`);
    }

    console.log("Business email sent successfully");

    // Send confirmation email to the user who submitted the form
    const confirmationEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DishViz AR <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting DishViz AR!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #F97316;">Thank You, ${name}!</h1>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Message:</h3>
              <p>${message}</p>
            </div>
            <p>If you have any urgent questions, feel free to reach us at:</p>
            <ul>
              <li>Email: dishviz.ar@gmail.com</li>
              <li>Phone: +91 93012 63SEO5</li>
            </ul>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              This is an automated confirmation email. Please do not reply directly to this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">
              © DishViz AR - Transform Your Restaurant Menu with AR
            </p>
          </div>
        `,
      }),
    });

    if (!confirmationEmailRes.ok) {
      const errorData = await confirmationEmailRes.text();
      console.error("Resend API error (confirmation email):", errorData);
      // Don't throw here - business email was sent, just log the error
      console.log("Confirmation email failed but business email was sent");
    } else {
      console.log("Confirmation email sent successfully to:", email);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
