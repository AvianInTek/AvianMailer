import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, MailX, SendHorizonal } from "lucide-react"
import type { EmailStats } from "@/models/data"

interface EmailStatsCardsProps {
  stats: EmailStats | null
}

export function EmailStatsCards({ stats }: EmailStatsCardsProps) {
  if (!stats || Object.values(stats).every(value => value === 0)) {
    return <p className="text-center text-muted-foreground">No data available</p>
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
          <SendHorizonal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">+{stats.totalIncrease}% from yesterday</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Successful Deliveries</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.successful}</div>
          <p className="text-xs text-muted-foreground">{stats.successRate}% success rate</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Failed Deliveries</CardTitle>
          <MailX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.failed}</div>
          <p className="text-xs text-muted-foreground">{stats.failureRate}% failure rate</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Delivery Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgDeliveryTime}</div>
          <p className="text-xs text-muted-foreground">seconds</p>
        </CardContent>
      </Card>
    </div>
  )
}
