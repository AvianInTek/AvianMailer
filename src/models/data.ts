import { getMongoClient } from "@/lib/mongoConnect"

export interface EmailData {
    _id: string
    recipient: string
    sender: string
    subject: string
    body: string
    status: boolean
    sentOn: Date
    failed: boolean
}
  
export interface EmailStats {
  total: number;
  successful: number;
  failed: number;
  notSent: number;
  successRate: number;
  failureRate: number;
  notSentRate: number;
  avgDeliveryTime: number;
  totalIncrease: number;
}
