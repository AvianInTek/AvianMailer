
"use client";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import emailAniData from "@/assets/lottie/email.json";
import SigninForm from "@/components/signin-form";


export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-1">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* <div className="mb-8">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                <h1 className="text-xl font-bold">SmartSave</h1>
              </div>
            </div> */}

            <div className="absolute top-5 left-5">
              <div className="flex items-center gap-2">
                <img src="/android-chrome-512x512.png" draggable={false} className="h-12 w-12" alt="Logo" />
                <h1 className="text-2xl font-bold">AvianMailer</h1>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-left mb-6">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Let's not keep the login box waiting—your details, please!</p>
              </div>

              <SigninForm />

              <div className="mt-8 text-justify text-sm text-muted-foreground">
                <p>
                  Welcome to AvianMailer! Manage your email communications effortlessly. Log in to track sent emails, monitor delivery status, and identify any errors—all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:flex-1 bg-gradient-to-br from-blue-400 to-blue-600">
          <div className="h-full w-full flex items-center justify-center p-8">
            <div className="relative w-120 h-120">
            <div className="w-120 h-120" draggable={false}> {/* Adjust size as needed */}
                <Lottie animationData={emailAniData} loop autoplay/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
