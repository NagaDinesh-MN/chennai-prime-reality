import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { properties } from "@/data/properties";

export default defineTool({
  name: "list_properties",
  title: "List properties",
  description:
    "List Chennai Prime Realty's public property listings. Optionally filter by category (Apartments, Villas, Plots, Commercial) and/or by location substring (e.g. OMR, ECR, Anna Nagar, Velachery, Porur, Adyar).",
  inputSchema: {
    category: z
      .enum(["Apartments", "Villas", "Plots", "Commercial"])
      .optional()
      .describe("Filter by property category."),
    location: z
      .string()
      .optional()
      .describe("Case-insensitive substring match on the location field."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, location }) => {
    const loc = location?.trim().toLowerCase();
    const rows = properties
      .filter((p) => (category ? p.category === category : true))
      .filter((p) => (loc ? p.location.toLowerCase().includes(loc) : true))
      .map(({ image: _image, ...rest }) => rest);

    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { count: rows.length, properties: rows },
    };
  },
});
