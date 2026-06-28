import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#060E1E] flex items-center justify-center">
      <SignUp />
    </div>
  )
}
