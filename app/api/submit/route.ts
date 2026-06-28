import { NextRequest, NextResponse } from 'next/server';
import { addVisitor } from '@/lib/storage';
import { generateNDAPdf } from '@/lib/pdf-generator';

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

    // Generate the signed NDA PDF
    let pdfBuffer: Buffer;
    try {
      pdfBuffer = await generateNDAPdf({
        name,
        email,
        company,
        purpose,
        citizenship,
        timestamp,
        signature,
      });
    } catch (pdfError) {
      console.error('Error generating NDA PDF:', pdfError);
      return NextResponse.json(
        { error: 'Failed to generate NDA PDF' },
        { status: 500 }
      );
    }

    // Add visitor data + PDF to blob storage
    const result = await addVisitor({
      timestamp,
      name,
      email,
      company,
      purpose,
      citizenship,
      ndaAgreed,
      citizenshipDeclaration,
      signature,
    }, pdfBuffer);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to submit data' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Visitor data submitted successfully', ndaPdfUrl: result.ndaPdfUrl },
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
