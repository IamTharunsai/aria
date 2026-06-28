import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#060E1E] flex items-center justify-center">
      <SignIn />
    </div>
  )
}
