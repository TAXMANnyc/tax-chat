// pages/api/chat.js  (or app/api/chat/route.js — same code works)

import OpenAI from "openai";

// This will automatically use OPENAI_API_KEY from Vercel — no need to pass it
const openai = new OpenAI(); // ← This is the modern, safe way (2025)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, model = "gpt-4o-mini" } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
}