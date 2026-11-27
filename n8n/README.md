# n8n setup for the Chennai Prime Realty website

Three workflow files (import the helper first):

| File | What it does |
| --- | --- |
| `1-villa-property-search-helper.json` | Search helper used by the chat. Searches the website's properties for sale and the villa rental sheet (with booking checks). Matching is done in code, not by the AI. |
| `2-website-chat-and-enquiries.json` | **Website Chat**: the chat widget on the site talks to an AI agent that answers about buying property and renting villas. **Website Enquiry Form**: the site's enquiry form sends each lead here; it is saved to the Enquiries sheet and posted to Slack. |
| `4-create-booking-helper.json` | Saves a booking for the WhatsApp bot. Before saving it re-checks name, guests, dates, capacity, minimum nights and existing bookings, and creates a unique Booking ID. If anything is wrong it saves nothing and tells the bot why. |
| `5-error-alerts.json` | Posts a Slack alert whenever any of these workflows fails. |
| `3-whatsapp-villa-booking-bot.json` | The WhatsApp villa booking bot: understands the request, suggests villas, takes the booking after the customer replies YES, saves it to the Bookings sheet, and sends the full booking to Slack. |

## Setup (about 15 minutes)

1. **Import the helper first.** In n8n: Create workflow → ⋯ → Import from file → `1-villa-property-search-helper.json`. Open **Read Villas** and **Read Bookings** and select your Google Sheets credential. Save, then **Publish**.
2. **Import the website workflow.** Import `2-website-chat-and-enquiries.json`.
3. **Connect the helper.** Open **search_properties_for_sale** and **search_villas_for_rent**, and in *Workflow* pick **Villa & Property Search (helper)** from the list.
4. **Attach credentials.** Chat Model → OpenAI (or swap in an Anthropic Chat Model with Claude Haiku 5.5). Save Website Lead → Google Sheets. Alert Team (Slack) → Slack, then pick the channel.
5. **Publish** the website workflow.
6. **Copy the two URLs:**
   - Open **Website Chat** → copy the *Chat URL*.
   - Open **Website Enquiry Form** → copy the *Production URL*.
7. **Give them to the website.** In Vercel → Project → Settings → Environment Variables, add:
   - `VITE_N8N_CHAT_WEBHOOK_URL` = the Chat URL
   - `VITE_N8N_ENQUIRY_WEBHOOK_URL` = the Production URL

   Then redeploy. (For local testing, put the same values in `.env`.)

If either variable is empty, that feature is simply switched off: no chat bubble, and the form keeps sending to Discord only.

## WhatsApp bot (optional)

Import `4-create-booking-helper.json` (Google Sheets on Read Villas, Read Bookings, Save Booking; Publish), then `3-whatsapp-villa-booking-bot.json`. In **search_villas** pick the search helper and in **create_booking** pick **Create Booking (helper)**. Attach credentials: WhatsApp Trigger (WhatsApp OAuth: App ID + App Secret), Reply on WhatsApp (WhatsApp API: permanent access token + Business Account ID, then pick the sender number), OpenAI Chat Model, Google Sheets (create_booking, Save Lead), Slack (pick the channel). Publish. Only one workflow can listen to a WhatsApp number at a time.

## Error alerts

Import `5-error-alerts.json`, attach Slack to **Alert Team (Slack)**, pick the channel and Publish. Then in each other workflow open ⋯ → Settings → *Error workflow* → **Error Alerts** → Save.

## Keeping it in sync

The properties for sale are listed inside the helper's **Filter Matches** node (`LISTINGS`). When `src/data/properties.ts` changes, update that list too.
