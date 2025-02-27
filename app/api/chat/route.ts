import { StreamingTextResponse, type Message } from "ai"
import { streamText } from "ai"
import { deepseek } from "@/lib/deepseek"
import { auth } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const session = await auth()

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]

  // Prepare conversation history
  const formattedPreviousMessages = messages
    .slice(0, -1)
    .map((message: Message) => {
      return `${message.role === "user" ? "User" : "Assistant"}: ${message.content}`
    })
    .join("\n")

  // Construct the prompt with conversation history
  const prompt = formattedPreviousMessages
    ? `${formattedPreviousMessages}\nUser: ${lastMessage.content}\nAssistant:`
    : `User: ${lastMessage.content}\nAssistant:`

  // Call DeepSeek API using the AI SDK
  const result = await streamText({
    model: deepseek("deepseek-chat"),
    prompt,
    system:
      "You are Shadhin AI, a helpful and friendly AI assistant. Provide accurate, concise, and helpful responses.",
  })

  // Return a streaming response
  return new StreamingTextResponse(result.textStream)
}

