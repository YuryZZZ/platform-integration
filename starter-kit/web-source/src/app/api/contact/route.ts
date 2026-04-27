import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth, type AuthenticatedRequest } from '@/lib/api/middleware';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['Developer', 'Manager', 'Executive', 'Other']),
  message: z.string().min(10),
});

/**
 * POST /api/contact
 * Handles contact form submissions by validating fields and saving to Firestore.
 */
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // Save to Firestore 'leads' collection
    await addDoc(collection(db, 'leads'), {
      ...validatedData,
      tenantId: req.user?.tenantId || 'global',
      userId: req.user?.id || 'anonymous',
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Lead captured successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
