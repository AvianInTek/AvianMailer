import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailIdentity } from '@/lib/auth';
import { getMongoClient } from '@/lib/mongoConnect';

export async function POST(req: NextRequest) {
  const { sender, recipient, subject, body, identity } = await req.json();
  console.log('sender', sender);
  console.log('recipient', recipient);
  console.log('subject', subject);
  console.log('body', body);
  console.log('identity', identity);

  const verify = await verifyEmailIdentity(identity);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

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


export async function PUT(req: NextRequest) {
  
  const { _id, identity  } = await req.json();
  const verify = await verifyEmailIdentity(identity);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

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