import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailIdentity } from '@/lib/auth';
import { getMongoClient } from '@/lib/mongoConnect';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  const { sender, recipient, subject, body, identity } = await req.json();

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
  await db.collection('email').insertOne({ sender, recipient, subject, body, status: false, sentOn: null, failed: false });
  return NextResponse.json({ success: true });
}


export async function PUT(req: NextRequest) {
  const { _id, identity, status } = await req.json();
  const verify = await verifyEmailIdentity(identity);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const db = await getMongoClient();
  const email = await db.collection('email').findOne({ _id: new ObjectId(String(_id)) });
  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Email not found.' },
      { status: 404 }
    );
  }

  await db.collection('email').updateOne(
    { _id: new ObjectId(String(_id)) },
    { $set: { status: status, failed: !status } }
  );

  return NextResponse.json({ success: true });
}


export async function GET(req: NextRequest) {
  // const _id = req.nextUrl.searchParams.get('_id');
  const identity = req.headers.get('identity');
  if (!identity) {
    return NextResponse.json(
      { success: false, message: 'Identity is required.' },
      { status: 400 }
    );
  }

  const verify = await verifyEmailIdentity(identity);
  if (!verify) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const db = await getMongoClient();
  
  const emails = await db.collection('email').find({ status: false }).toArray();
  if (!emails) {
    return NextResponse.json(
      { success: false, message: 'No emails found.' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, emails });
}