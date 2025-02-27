import type { Message } from "ai"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn("flex items-start gap-4 p-4 rounded-lg", message.role === "user" ? "bg-muted/50" : "bg-background")}
    >
      <Avatar className="h-8 w-8">
        {message.role === "user" ? (
          <>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/bot-avatar.png" alt="Shadhin AI" />
            <AvatarFallback>
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="grid gap-1">
        <div className="font-semibold">{message.role === "user" ? "You" : "Shadhin AI"}</div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

