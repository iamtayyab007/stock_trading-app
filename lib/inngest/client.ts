import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  eventKey: process.env.INNGEST_EVENT_KEY!,
  id: "Signalists",
  ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! } },
});
