import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "../../../types";
import { openRouterChat } from "../../services/openRouter";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "1",
      role: "assistant",
      content: [
        {
          type: "text",
          text: "Hello! I'm your AI assistant. I can help you visualize products, answer questions, or just chat. You can also upload images or use voice input!",
        },
      ],
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string, image?: File) => {
    const newMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      role: "user",
      content: [
        {
          type: "text",
          text,
        },
      ],
      timestamp: Date.now(),
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newMessage.content.push({
          type: "input_image",
          image_url: reader.result as string,
        });
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        simulateAIResponse(updatedMessages);
      };
      reader.readAsDataURL(image);
    } else {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      simulateAIResponse(updatedMessages);
    }
  };

  const simulateAIResponse = async (currentMessages: ChatMessageType[]) => {
    setIsTyping(true);

    try {
      const apiMessages = currentMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const response = await openRouterChat({ messages: apiMessages });

      if (response.choices && response.choices[0]) {
        const aiMessage: ChatMessageType = {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: [
            {
              type: "text",
              text: response.choices[0].message.content,
            },
          ],
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error calling AI:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      <div className="bg-base-100 rounded-t-2xl shadow-sm border border-border-light p-4 flex items-center gap-3 z-10">
        <div className="p-2 bg-brand-primary/10 rounded-lg">
          <MessageSquare className="w-6 h-6 text-brand-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-content-100">Chat With AI</h1>
          <p className="text-sm text-content-300">Powered by Advanced Models</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-50 scroll-smooth">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex gap-4 p-4 rounded-xl bg-base-200/50 w-fit">
            <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center">
              <BotIcon />
            </div>
            <div className="flex items-center gap-1">
              <span
                className="w-2 h-2 bg-content-300 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-2 h-2 bg-content-300 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 bg-content-300 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-base-100 rounded-b-2xl shadow-lg border-t border-border-light">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}

function BotIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
