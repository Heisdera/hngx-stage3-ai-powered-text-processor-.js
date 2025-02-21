"use client";

import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export const MessageInputArea = ({
  onSendMessage,
  input,
  handleInputChange,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      onSendMessage(e); // Submit the form
    }
  };

  return (
    <form
      onSubmit={onSendMessage}
      className="relative w-full flex flex-col gap-4 mt-auto"
    >
      <Textarea
        ref={textareaRef}
        placeholder="Send a message in any language..."
        className="custom-scrollbar min-h-[90px] max-h-[200px] overflow-y-auto resize-none rounded-2xl !text-base bg-muted pb-3 dark:ring-offset-black border-zinc-700 focus-visible:ring-offset-primary-foreground focus-visible:ring-2 focus-visible:ring-offset-2"
        autoFocus
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label="Message input"
      />

      <Button
        type="submit"
        className="rounded-full border dark:border-zinc-600 size-9 absolute bottom-3 right-3 flex flex-row items-center justify-center"
        aria-label="Send message"
      >
        <Send className="!size-5" />
      </Button>
    </form>
  );
};
