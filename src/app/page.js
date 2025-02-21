"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ChatMessages = dynamic(() =>
  import("../components/ChatMessage").then((module) => module.ChatMessages)
);
const MessageInputArea = dynamic(() =>
  import("../components/MessageInputArea").then(
    (module) => module.MessageInputArea
  )
);
const BackgroundBeamsWithCollisionDemo = dynamic(() =>
  import("../components/ui/background-beams-with-collision").then(
    (module) => module.BackgroundBeamsWithCollision
  )
);

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hello! How can I assist you today?",
      detectedLanguage: "en",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Please enter some text.");
      return;
    }

    setIsThinking(true);

    // Simulate as if my AI is thinking :) 😅
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { role: "system", content: `Detected Language: English` },
      ]);
    }, 2000);

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setError(null);
  };

  return (
    <BackgroundBeamsWithCollisionDemo>
      <main className="w-full max-w-2xl flex flex-col gap-4 p-4 min-h-screen">
        <div>
          <h1 className="text-[22px] font-bold sm:text-2xl">
            Chrome AI Powered Text Processor
          </h1>
          <p className="text-sm txt-muted">
            Detect, Translate and Summarize your text
          </p>
        </div>

        <ChatMessages
          messages={messages}
          setMessages={setMessages}
          isThinking={isThinking}
        />

        {error && <p className="text-red-500">{error}</p>}

        <MessageInputArea
          onSendMessage={handleSendMessage}
          input={input}
          handleInputChange={(e) => setInput(e.target.value)}
        />
      </main>
    </BackgroundBeamsWithCollisionDemo>
  );
}
