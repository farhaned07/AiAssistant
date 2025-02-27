import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import ChatInterface from "@/components/chat-interface"

export const metadata: Metadata = {
  title: "Shadhin AI",
  description: "AI-powered assistant built with Next.js and DeepSeek",
}

export default async function Home() {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <ChatInterface user={session.user} />
      </main>
    </div>
  )
}

