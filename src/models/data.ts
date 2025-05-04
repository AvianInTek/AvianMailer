import { getMongoClient } from "@/lib/mongoConnect"

export interface EmailData {
    _id: string
    recipient: string
    sender: string
    subject: string
    body: string
    status: boolean
    sentOn: Date
}
  
export interface EmailStats {
    total: number
    successful: number
    failed: number
    successRate: number
    failureRate: number
    avgDeliveryTime: number
    totalIncrease: number
}
