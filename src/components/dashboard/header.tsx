import { User, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ModeToggle } from "./mode-toggle"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Email Analytics Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={()=>window.location.href = "/dashboard/email"} variant="ghost" size="sm" className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            <span>Send Email</span>
          </Button>
          <Button onClick={()=>window.location.href = "/dashboard/signup"} variant="ghost" size="sm" className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Register</span>
          </Button>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  )
}
