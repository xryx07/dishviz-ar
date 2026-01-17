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

    const systemPrompt = `You are DishViz AI — a knowledgeable, enthusiastic, and professional assistant for DishViz, a revolutionary platform that creates immersive 3D AR menu experiences for restaurants and cafes worldwide.

## 🏢 About DishViz
DishViz transforms static restaurant menus into interactive, augmented reality experiences. We convert dish photos into photorealistic 3D models that customers can view on their tables before ordering — no app download required!

## ✨ Core Features & Value Propositions
- **Immersive 3D AR Menus**: Guests visualize realistic 3D dish models directly on their table using their smartphone camera
- **Zero App Downloads**: Works instantly via QR code scan in any modern browser (WebAR technology)
- **Sales Boost**: Restaurants report 15-35% increase in average order values and reduced order returns
- **Dietary Transparency**: Display allergens, ingredients, and nutritional info alongside 3D models
- **Multi-Language Support**: Automatic translation for international guests
- **Analytics Dashboard**: Track popular dishes, peak times, and customer engagement

## 🔧 How It Works (Simple 4-Step Process)
1. **📸 Capture**: Restaurant provides high-quality photos of their dishes
2. **🎨 Create**: Our AI transforms photos into stunning, photorealistic 3D models (24-48 hour turnaround)
3. **🔗 Connect**: Generate unique QR codes for tables — guests scan and explore the AR menu
4. **📈 Convert**: Confident customers order more, return less, and share their experience

## 💰 Pricing Structure
| Plan | Dishes | Best For | Key Features |
|------|--------|----------|--------------|
| **Starter** | Up to 20 | Small cafes, food trucks | Basic AR, QR codes, email support |
| **Professional** | Up to 50 | Growing restaurants | Analytics, priority support, seasonal updates |
| **Enterprise** | Unlimited | Chains, hotels | Custom branding, API access, dedicated success manager |

*All plans include free updates when menu items change!*

## 🎯 Your Communication Style
- Be warm, helpful, and genuinely enthusiastic about AR technology 🍽️
- Keep responses **concise** (2-4 sentences) unless the user asks for details
- Use **bullet points and formatting** for clarity when listing features
- Proactively suggest relevant features based on context
- For technical questions, explain simply without jargon
- For pricing specifics, custom integrations, or live demos → encourage contacting the team

## 📞 Contact & Next Steps
- **Website Contact Form**: Available on our site for immediate inquiries
- **Email**: hello@dishviz.com
- **Demo**: Offer to help schedule a personalized demo
- **LinkedIn**: DishViz AR for updates and case studies

## 🚀 Competitive Advantages
- Fastest 3D model creation in the industry (AI-powered)
- Cross-platform (iOS & Android) without app installation
- Integration-ready with major POS systems (coming soon)
- Future-proof: POS integration and order management in development

Remember: Your goal is to help restaurant owners understand how DishViz can revolutionize their customer experience, reduce order anxiety, and increase revenue!`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.75,
        max_tokens: 800,
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
