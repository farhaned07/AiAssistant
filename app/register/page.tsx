import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import RegisterForm from "@/components/register-form"

export const metadata: Metadata = {
  title: "Register - Shadhin AI",
  description: "Create a new Shadhin AI account",
}

export default async function RegisterPage() {
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
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
          </div>
          <RegisterForm />
        </div>
      </main>
    </div>
  )
}

