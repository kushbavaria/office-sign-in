import { NextRequest, NextResponse } from 'next/server';
import { addVisitor } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, company, purpose, citizenship, ndaAgreed, citizenshipDeclaration, signature, timestamp } = body;

    // Validate required fields
    if (!name || !email || !company || !purpose || !citizenship || !ndaAgreed || !citizenshipDeclaration || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Add visitor data to local storage
    const result = addVisitor({
      timestamp,
      name,
      email,
      company,
      purpose,
      citizenship,
      ndaAgreed,
      citizenshipDeclaration,
      signature,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to submit data' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Visitor data submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}