import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import LoginForm from "@/components/login-form"

export const metadata: Metadata = {
  title: "Login - Shadhin AI",
  description: "Login to your Shadhin AI account",
}

export default async function LoginPage() {
  const session = await auth()

  // Redirect to home if already authenticated
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}

