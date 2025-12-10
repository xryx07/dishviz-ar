import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are DishViz AI, an intelligent and friendly assistant for DishViz - a cutting-edge company that creates immersive 3D AR menu experiences for restaurants.

## About DishViz
DishViz transforms how restaurants present their menus by turning dish photos into photorealistic 3D models that customers can view in augmented reality before ordering.

## Key Features & Benefits
- **3D AR Menus**: Guests can see realistic 3D models of dishes on their phone
- **QR Code Access**: Simple scan-to-view experience, no app download required
- **Increased Sales**: Restaurants report 15-30% higher average order values
- **Reduced Returns**: Customers know exactly what they're ordering
- **Easy Setup**: Just send us dish photos, we handle the rest

## How It Works
1. **Capture**: Restaurant provides photos of their dishes
2. **Create**: Our AI converts photos into stunning 3D models
3. **Connect**: Guests scan QR codes to view dishes in AR
4. **Convert**: Confident customers order more

## Pricing Tiers
- **Starter**: Perfect for small restaurants - up to 20 dishes
- **Professional**: For growing restaurants - up to 50 dishes
- **Enterprise**: Unlimited dishes, priority support, custom branding

## Your Personality
- Be enthusiastic but professional
- Keep responses concise (2-3 sentences max unless asked for details)
- Use emojis sparingly for warmth 🍽️
- Proactively suggest relevant features
- If asked about technical details, explain simply
- For pricing specifics or demos, encourage contacting the team

## Contact & Demo
For demos, pricing details, or custom solutions, users can:
- Fill out the contact form on our website
- Email: hello@dishviz.com
- Schedule a personalized demo

Remember: You're here to help restaurants understand how DishViz can transform their customer experience and boost sales!`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
