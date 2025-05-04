import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailIdentity } from '@/lib/auth';
import { getMongoClient } from '@/lib/mongoConnect';

export async function POST(req: NextRequest) {
  const verify = await verifyEmailIdentity(req);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { sender, recipient, subject, body  } = await req.json();
  console.log('sender', sender);
  console.log('recipient', recipient);
  console.log('subject', subject);
  console.log('body', body);

  if ( !sender || !recipient || !subject || !body ) {
    return NextResponse.json(
      { success: false, message: 'sender, recipient, subject and body are required.' },
      { status: 400 }
    );
  }

  const db = await getMongoClient();
  await db.collection('email').insertOne({ sender, recipient, subject, body, status: false, sentOn: null });
  return NextResponse.json({ success: true });
}


export async function GET(req: NextRequest) {

  const verify = await verifyEmailIdentity(req);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const db = await getMongoClient();
  const emails = await db.collection('email').findOne({ status: false });

  return NextResponse.json({ success: true, emails });
}


export async function PUT(req: NextRequest) {
  const verify = await verifyEmailIdentity(req);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const { _id  } = await req.json();

  const db = await getMongoClient();
  const email = await db.collection('email').findOne({ _id });
  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Email not found.' },
      { status: 404 }
    );
  }

  await db.collection('email').updateOne({ _id }, { status: true });

  return NextResponse.json({ success: true });
}