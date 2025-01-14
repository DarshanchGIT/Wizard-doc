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
import { Loader, Copy } from "lucide-react";
import { generateTextGemini } from "@/utils/gemini";

interface DrawerProps {
  description: string | null;
}

const DrawerAI = ({ description }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const [wizardSuggestion, setWizardSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWizardSuggestion = async () => {
    if (!description) {
      console.error("Description is required for text generation.");
      return;
    }
    setIsLoading(true);
    try {
      const darshan = await generateTextGemini(description);
      setWizardSuggestion(darshan);
    } catch (error) {
      console.error("Error generating text:", error);
      setWizardSuggestion("Failed to generate text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (wizardSuggestion) {
      navigator.clipboard.writeText(wizardSuggestion);
      alert("Copied to clipboard!");
      setOpen(false); // Close the drawer
    } else {
      alert("Nothing to copy!");
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
          <DrawerHeader className="flex justify-between items-center">
            <div>
              <DrawerTitle>
                🧙‍♂️ Your Wizard is here to help with storytelling or resume
                writing! 🪄✨
              </DrawerTitle>
            </div>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)} // Close drawer
              aria-label="Close drawer"
            >
              ✖️
            </button>
          </DrawerHeader>
          {isLoading ? (
            <Loader className="flex mx-auto justify-center animate-spin" />
          ) : (
            <DrawerDescription className="whitespace-pre-wrap">
              {wizardSuggestion && (
                <div className="p-4 w-[90%] mx-auto border-4 border-gray-300 rounded-2xl shadow-lg  text-gray-500">
                  <p>{wizardSuggestion}</p>
                </div>
              )}
            </DrawerDescription>
          )}
          <div className="flex justify-center mt-4">
            {wizardSuggestion && (
              <button
                className="flex items-center py-2 px-4 rounded-xl hover:opacity-80 border-2 border-gray-300"
                onClick={handleCopyToClipboard}
                aria-label="Copy to clipboard"
              >
                <span className="mr-2">Copy</span>
                <Copy size={20} />
              </button>
            )}
          </div>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerAI;
