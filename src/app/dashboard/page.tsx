"use client"


import { EmailAnalytics } from "@/components/dashboard/email-analytics"
import { EmailStatsCards } from "@/components/dashboard/email-stats-cards"
import { EmailTable } from "@/components/dashboard/email-table"
import { DashboardHeader } from "@/components/dashboard/header"
import { useEffect, useState } from "react"
import { fetchEmails } from "@/lib/email"

export default function DashboardPage() {
  const [xemailData, setEmailData] = useState([])
  const [xstats, setStats] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    notSent: 0,
    successRate: 0,
    failureRate: 0,
    notSentRate: 0,
    avgDeliveryTime: 0,
    totalIncrease: 0,
  })
  
  useEffect(() => {
    const fetchData = async () => {
      const { emailData, stats } = (await fetchEmails()).data;
      setEmailData(emailData);
      setStats(stats);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <EmailAnalytics data={xemailData} />
          <EmailStatsCards stats={xstats} />
        </div>
        <EmailTable data={xemailData} />
      </main>
    </div>
  )
}
