"use client"

import type React from "react"

import { useState } from "react"
import { Check, AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveEmail } from "@/lib/email"
import { TOKEN_AUTH_IDENTITY } from "@/lib/config"

interface FormData {
  sender: string
  recipient: string
  subject: string
  body: string
}

export default function EmailForm() {
  const [formData, setFormData] = useState<FormData>({
    sender: "",
    recipient: "",
    subject: "",
    body: "",
  })

  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // List of sender options
  const senderOptions = [
    { value: "no-reply@avianintek.com", label: "Notifications" },
  ]

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validate email on change
    if (name === "recipient") {
      if (value === "") {
        setIsEmailValid(null)
      } else {
        setIsEmailValid(validateEmail(value))
      }
    }
  }

  // Handle sender selection
  const handleSenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sender: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!formData.sender) {
      alert("Please select a sender")
      return
    }

    if (!formData.recipient || !isEmailValid) {
      alert("Please enter a valid recipient email")
      return
    }

    if (!formData.subject) {
      alert("Please enter a subject")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFormData({
        sender: "",
        recipient: "",
        subject: "",
        body: "",
      })
      setIsEmailValid(null)

      var send = await saveEmail({ ...formData, identity: process.env.NEXT_PUBLIC_TOKEN_AUTH_IDENTITY })
      if (send.success) {
        alert("Message sent successfully!")
        window.location.href = "/dashboard";
      } else {
        alert("Failed to send message. Please try again.")
      }

    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-700">
      <form onSubmit={handleSubmit}>
        <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-t-lg">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">New Message</h2>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Sender Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="sender" className="text-sm font-medium">
              From
            </Label>
            <Select value={formData.sender} onValueChange={handleSenderChange}>
              <SelectTrigger id="sender" className="w-full">
                <SelectValue placeholder="Select sender" />
              </SelectTrigger>
              <SelectContent>
                {senderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label} ({option.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Email with validation */}
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-sm font-medium">
              To
            </Label>
            <div className="relative">
              <Input
                id="recipient"
                name="recipient"
                type="email"
                value={formData.recipient}
                onChange={handleChange}
                placeholder="recipient@example.com"
                className={`pr-10 ${
                  isEmailValid === false
                    ? "border-red-300 focus-visible:ring-red-500"
                    : isEmailValid === true
                      ? "border-green-300 focus-visible:ring-green-500"
                      : ""
                }`}
              />
              {isEmailValid !== null && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {isEmailValid ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {isEmailValid === false && <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter message subject"
            />
          </div>

          {/* Message Body */}
          <div className="space-y-2">
            <Label htmlFor="body" className="text-sm font-medium">
              Message
            </Label>
            <Textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="min-h-[200px] resize-y"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 rounded-b-lg">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
