import axios from "axios";

export async function generateTextGemini(description: string): Promise<string> {
  const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

  if (!geminiApiKey) {
    throw new Error("Gemini API key is not defined");
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: description,
              },
            ],
          },
        ],
      }
    );
    // Extracting the response
    const candidates = response.data?.candidates;
    if (candidates && candidates.length > 0) {
      const contentParts = candidates[0]?.content?.parts;
      if (contentParts && contentParts.length > 0) {
        return contentParts[0]?.text || "No content generated.";
      }
    }

    throw new Error("Unexpected response structure or no content generated.");
  } catch (error: any) {
    console.error("Error fetching from Gemini API:", error.message || error);
    throw new Error("Failed to generate text");
  }
}
