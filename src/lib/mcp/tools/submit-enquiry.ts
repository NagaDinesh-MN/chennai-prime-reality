import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1514320703699030046/6qAjvN0_77MMkN4RFokN75ZbCBHLUm_ZTaELLfzrrNePW7QGQUt0fihvEU_yD18nxub8";

export default defineTool({
  name: "submit_enquiry",
  title: "Submit property enquiry",
  description:
    "Submit a property enquiry to Chennai Prime Realty. An advisor follows up within 24 hours. Same fields as the website contact form.",
  inputSchema: {
    name: z.string().trim().min(2).max(80),
    phone: z
      .string()
      .trim()
      .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number"),
    email: z.string().trim().email().max(120),
    propertyType: z.enum(["Apartment", "Villa", "Plot", "Commercial"]),
    location: z.string().trim().min(2).max(80).describe("Preferred location in Chennai."),
    budget: z.string().trim().min(2).max(60).describe("Budget range, e.g. '₹1 Cr – ₹2 Cr'."),
    message: z.string().trim().max(800).optional(),
  },
  annotations: { readOnlyHint: false, openWorldHint: true },
  handler: async (input) => {
    const payload = {
      username: "Chennai Prime Realty",
      embeds: [
        {
          title: "New Property Enquiry (via MCP)",
          color: 0xc9a961,
          fields: [
            { name: "Name", value: input.name, inline: true },
            { name: "Phone", value: input.phone, inline: true },
            { name: "Email", value: input.email, inline: false },
            { name: "Property Type", value: input.propertyType, inline: true },
            { name: "Preferred Location", value: input.location, inline: true },
            { name: "Budget", value: input.budget, inline: true },
            { name: "Message", value: input.message?.trim() ? input.message : "—", inline: false },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Chennai Prime Realty • MCP Lead" },
        },
      ],
    };

    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        content: [
          { type: "text", text: `Failed to submit enquiry (${res.status}). ${text}` },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Thanks ${input.name.split(" ")[0]}! Your enquiry has been received. An advisor will reach out within 24 hours.`,
        },
      ],
      structuredContent: { ok: true },
    };
  },
});
