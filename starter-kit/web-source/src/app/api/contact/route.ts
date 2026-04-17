import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/firebase';

const contactSchema = z.object({
  name: z.string(),
  company: z.string(),
  email: z.string().email(),
  role: z.string(),
  message: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const validatedData = contactSchema.parse(body);

    // Add to Firestore leads collection
    await db.collection('leads').add({
      ...validatedData,
      status: 'new',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Contact API Error]:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
