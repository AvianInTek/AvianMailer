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
        failed: doc.failed,
    })) as EmailData[]
    const total = emailData.length
    const successful = emailData.filter((email) => email.status === true && email.failed === false).length
    const failed = emailData.filter((email) => email.failed === true).length
    const notSent = emailData.filter((email) => email.status !== true && email.failed !== true).length
    const successRate = total > 0 ? Math.round((successful / total) * 100) : 0
    const failureRate = total > 0 ? Math.round((failed / total) * 100) : 0
    const notSentRate = total > 0 ? Math.round((notSent / total) * 100) : 0
  
    const stats: EmailStats = {
      total,
      successful,
      failed,
      notSent,
      successRate,
      failureRate,
      notSentRate,
      avgDeliveryTime: Math.round(Math.random() * 5 * 10) / 10,
      totalIncrease: Math.round(Math.random() * 15),
    }

    return { emailData, stats }
}
  

export async function GET(_req: NextRequest) {
  var data = await getEmailStats()
  return NextResponse.json({ success: true, data });
}