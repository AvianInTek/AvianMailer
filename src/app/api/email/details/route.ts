import { getMongoClient } from '@/lib/mongoConnect';
import { EmailData, EmailStats } from '@/models/data';
import { NextRequest, NextResponse } from 'next/server';


async function getEmailStats(): Promise<{ emailData: EmailData[]; stats: EmailStats }> {
    var emailData: EmailData[] = [];
    const db = await getMongoClient()

    emailData = (await db.collection("email").find().toArray()).map(doc => ({
        _id: doc._id.toString(),
        recipient: doc.recipient,
        sender: doc.sender,
        subject: doc.subject,
        body: doc.body,
        status: doc.status,
        sentOn: new Date(doc.sentOn),
    })) as EmailData[]
    const total = emailData.length
    const successful = emailData.filter((email) => email.status === true).length
    const failed = total - successful
    const successRate = Math.round((successful / total) * 100)
    const failureRate = Math.round((failed / total) * 100)
  
    const stats: EmailStats = {
      total,
      successful,
      failed,
      successRate,
      failureRate,
      avgDeliveryTime: Math.round(Math.random() * 5 * 10) / 10,
      totalIncrease: Math.round(Math.random() * 15),
    }
  
    return { emailData, stats }
}
  

export async function GET(req: NextRequest) {
  var data = await getEmailStats()
  return NextResponse.json({ success: true, data });
}