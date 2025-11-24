import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: question }],
            temperature: 0.7,
        });

        res.status(200).json({ answer: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ answer: "Error getting response from AI." });
    }
}
