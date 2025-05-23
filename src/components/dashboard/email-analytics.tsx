"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartLegend, ChartLegendItem, ChartPie, ChartTooltip } from "@/components/ui/chart"
import type { EmailData } from "@/models/data"

interface EmailAnalyticsProps {
  data: EmailData[] | null
}

export function EmailAnalytics({ data }: EmailAnalyticsProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>24 Hour Email Delivery</CardTitle>
          <CardDescription>No data available for the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">No email analytics data to display.</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate success and failure counts
  const successCount = data.filter((email) => email.status === true).length
  const failureCount = data.filter((email) => email.status === false).length

  const pieData = [
    { name: "Success", value: successCount, color: "#10b981" },
    { name: "Failed", value: failureCount, color: "#ef4444" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>24 Hour Email Delivery</CardTitle>
        <CardDescription>Overview of email delivery success and failure rates in the last 24 hours</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px]">
          <ChartContainer>
            <>
              <Chart className="h-[300px]">
                <ChartPie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                />
                <ChartTooltip />
              </Chart>
              <div className="mt-4">
                <ChartLegend>
                  {pieData.map((entry, index) => (
                    <ChartLegendItem key={`item-${index}`} color={entry.color} name={entry.name} />
                  ))}
                </ChartLegend>
              </div>
            </>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
