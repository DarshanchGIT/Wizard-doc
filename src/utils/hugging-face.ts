import { HfInference, TextGenerationOutput } from "@huggingface/inference";

// Initialize the Hugging Face Inference API with your API Key
const hf = new HfInference(
  process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY as string
);

// Function to remove HTML tags from a string
const stripHtmlTags = (text: string): string => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.textContent || "";
};

// Function to generate text using Hugging Face
export async function generateText(description: string): Promise<string> {
  try {
    const response: TextGenerationOutput = await hf.textGeneration({
      model: "gpt2", // Specify the gpt2 model
      inputs: description, // Use the dynamic description input
      parameters: {
        max_length: 3000, // Specify the max length of the generated text
        temperature: 0.9, // Adjust temperature for more creative outputs
        top_k: 50, // Include top-k sampling
        top_p: 0.95, // Use nucleus sampling
        num_return_sequences: 1, // Number of sequences to return
      },
    });

    // Check if the response has the expected structure
    if (response && response.generated_text) {
      const cleanText = stripHtmlTags(response.generated_text); // Strip HTML tags
      console.log(cleanText); // Log the cleaned text
      return cleanText; // Return the cleaned text
    } else {
      throw new Error(
        "Unexpected response structure: " + JSON.stringify(response)
      );
    }
  } catch (error) {
    console.error("Error fetching from Hugging Face API:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}
