import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const BARD_API_URL =
  "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const bardApiKey = process.env.BARD_API_URL;
  if (!bardApiKey) {
    return res.status(500).json({ error: "BARD_API_KEY is not set" });
  }

  try {
    const response = await axios.post(
      `${BARD_API_URL}?key=${bardApiKey}`,
      {
        prompt: {
          text: message,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data.candidates[0]?.output;

    res.status(200).json({ response: generatedText });
  } catch (error) {
    console.error("Error fetching from Bard API:", error);
    res.status(500).json({ error: "Failed to fetch from Bard API" });
  }
}
