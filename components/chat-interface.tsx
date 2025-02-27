"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import type { User } from "next-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Send } from "lucide-react"
import ChatMessage from "@/components/chat-message"

interface ChatInterfaceProps {
  user: User
}

export default function ChatInterface({ user }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `This is an AI assistant powered by DeepSeek AI and built with Next.js and the AI SDK. It uses the \`streamText\` function in the server and the \`useChat\` hook on the client to create a seamless chat experience.`,
      },
    ],
  })

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages]) //Corrected dependency

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      handleSubmit(e)
      setInputValue("")
    }
  }

  return (
    <div className="flex flex-col w-full max-w-3xl h-[calc(100vh-80px)] mx-auto">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <div className="p-4 border-t dark:border-gray-800">
        <form onSubmit={handleFormSubmit} className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              handleInputChange(e)
            }}
            placeholder="Send a message..."
            className="pr-24 py-6 bg-background"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button type="button" size="icon" variant="ghost" className="rounded-full" disabled={isLoading}>
              <Mic className="h-5 w-5" />
              <span className="sr-only">Use voice input</span>
            </Button>
            <Button type="submit" size="icon" className="rounded-full" disabled={isLoading || !inputValue.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

