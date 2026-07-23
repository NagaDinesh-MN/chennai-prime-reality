import { defineMcp } from "@lovable.dev/mcp-js";
import listPropertiesTool from "./tools/list-properties";
import submitEnquiryTool from "./tools/submit-enquiry";

export default defineMcp({
  name: "chennai-prime-realty-mcp",
  title: "Chennai Prime Realty",
  version: "0.1.0",
  instructions:
    "Tools for Chennai Prime Realty, a premium Chennai real estate agency. Use `list_properties` to browse public listings (optionally filtered by category or location). Use `submit_enquiry` to send a lead — an advisor follows up within 24 hours.",
  tools: [listPropertiesTool, submitEnquiryTool],
});
