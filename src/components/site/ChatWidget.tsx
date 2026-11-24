import { useEffect } from "react";

// n8n chat widget, loaded from the CDN in the browser only.
// Set VITE_N8N_CHAT_WEBHOOK_URL to the "Chat URL" of the n8n Chat Trigger node.
// If it is not set, the widget is simply not shown.
const CHAT_URL = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL as string | undefined;
const CHAT_VERSION = "1.45.3";
const CDN = `https://cdn.jsdelivr.net/npm/@n8n/chat@${CHAT_VERSION}/dist`;

export function ChatWidget() {
  useEffect(() => {
    if (!CHAT_URL || typeof window === "undefined") return;
    if (document.getElementById("n8n-chat-css")) return; // already loaded

    const css = document.createElement("link");
    css.id = "n8n-chat-css";
    css.rel = "stylesheet";
    css.href = `${CDN}/style.css`;
    document.head.appendChild(css);

    let cancelled = false;
    import(/* @vite-ignore */ `${CDN}/chat.bundle.es.js`)
      .then(({ createChat }) => {
        if (cancelled) return;
        createChat({
          webhookUrl: CHAT_URL,
          mode: "window",
          showWelcomeScreen: false,
          loadPreviousSession: true,
          initialMessages: [
            "Hi! Welcome to Chennai Prime Realty.",
            "I can help you find a property to buy, or a villa to rent for a stay. What are you looking for?",
          ],
          i18n: {
            en: {
              title: "Chennai Prime Realty",
              subtitle: "Ask about properties to buy or villas to rent.",
              footer: "",
              getStarted: "New conversation",
              inputPlaceholder: "Type your question...",
              closeButtonTooltip: "Close chat",
            },
          },
        });
      })
      .catch((err) => console.error("Could not load the chat widget", err));

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
