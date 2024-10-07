"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Loader } from "lucide-react";
import { generateText } from "@/utils/hugging-face"; // Import the Hugging Face function

interface DrawerProps {
  description: string | null; // Prop for description
}

const DrawerAI = ({ description }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const [wizardSuggestion, setWizardSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWizardSuggestion = async () => {
    if (!description) {
      console.error("Description is required for text generation.");
      return; // Early exit if description is null or empty
    }

    console.log(
      "Using Hugging Face API Key:",
      process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY
    );

    setIsLoading(true);
    try {
      const response = await generateText(description!); // Call the Hugging Face function
      setWizardSuggestion(response);
    } catch (error) {
      console.error("Error generating text:", error);
      setWizardSuggestion("Failed to generate text. Please try again."); // Provide feedback to the user
    } finally {
      setIsLoading(false); // Ensure loading state is reset regardless of success or failure
    }
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          className="flex float-right border border-1 py-2 px-4 rounded hover:opacity-80"
          onClick={handleWizardSuggestion}
        >
          Ask Your Wizard 🧙‍♂️
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              🧙‍♂️ Oyyy! Wizard here! I&apos;m helping you with your wizarly
              storytelling or resume writing 🪄✨Apereciiiuuummm✨?
            </DrawerTitle>
            {isLoading ? (
              <Loader className="flex mx-auto justify-center animate-spin" />
            ) : (
              <DrawerDescription className="whitespace-pre-wrap">
                {wizardSuggestion && <p>{wizardSuggestion}</p>}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerAI;
