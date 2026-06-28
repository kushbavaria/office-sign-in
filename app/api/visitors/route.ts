import { NextResponse } from 'next/server';
import { getVisitors } from '@/lib/storage';

export async function GET() {
  try {
    const visitors = await getVisitors();
    return NextResponse.json(visitors);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}