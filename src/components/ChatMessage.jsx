"use client";

import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "lucide-react";
import { TypingIndicator } from "./TypingIndicator";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { translateText, summarizeText } from "@/services/api";

const supportedLanguages = [
  { label: "English", value: "en" },
  { label: "Portuguese", value: "pt" },
  { label: "Spanish", value: "es" },
  { label: "Russian", value: "ru" },
  { label: "Turkish", value: "tr" },
  { label: "French", value: "fr" },
];

export const ChatMessages = ({ messages, isThinking, setMessages }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom();

  const handleTranslate = async (content) => {
    try {
      const translatedText = await translateText(content, selectedLanguage);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: `Translated to ${
            supportedLanguages.find(
              (language) => language.value === selectedLanguage
            )?.label
          }: ${translatedText}`,
        },
      ]);
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed. Please try again.");
    }
  };

  const handleSummarize = async (content) => {
    try {
      const summary = await summarizeText(content);
      setMessages((prev) => [
        ...prev,
        { role: "system", content: `Summary: ${summary}` },
      ]);
    } catch (error) {
      console.error("Summarization failed:", error);
      alert("Summarization failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={messagesContainerRef}
      className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto custom-scrollbar p-4 rounded-xl md:max-h-[60vh]"
      role="log"
      aria-live="polite"
    >
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`flex items-start gap-3 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "user" ? (
            <div className="bg-muted text-primary p-3 rounded-lg max-w-[80%] space-y-3">
              <div className="whitespace-pre-wrap">{message.content}</div>

              <hr className="border-muted-foreground/50" />

              <div className="flex flex-col gap-3">
                <div className="flex flex-col items-start gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Select
                        onValueChange={(value) => setSelectedLanguage(value)}
                      >
                        <SelectTrigger
                          id="language"
                          className="md:min-w-64 focus-visible:ring-1"
                          aria-label="Select a language to translate to"
                        >
                          <span>
                            Language:{" "}
                            <SelectValue placeholder="Select a language" />
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {supportedLanguages.map((language) => (
                            <SelectItem
                              key={language.value}
                              value={language.value}
                              disabled={language.value === "en"}
                            >
                              {language.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={() => handleTranslate(message.content)}
                      disabled={!selectedLanguage}
                      aria-label="Translate"
                    >
                      Translate
                    </Button>
                  </div>

                  {message.content.length > 150 && (
                    <Button
                      onClick={() => handleSummarize(message.content)}
                      aria-label="Summarize"
                    >
                      Summarize
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-muted p-3 rounded-lg max-w-[80%] flex items-start gap-3">
              <Bot className="size-6 flex-shrink-0" />
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          )}
        </motion.div>
      ))}

      <AnimatePresence>
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-start gap-3"
          >
            <Bot className="size-6 flex-shrink-0" />
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </motion.div>
  );
};
