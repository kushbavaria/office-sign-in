import { NextResponse } from 'next/server';
import { clearVisitors } from '@/lib/storage';

export async function POST() {
  try {
    const result = clearVisitors();
    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Visitor data cleared successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to clear data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error clearing data:', error);
    return NextResponse.json(
      { error: 'Failed to clear visitor data' },
      { status: 500 }
    );
  }
}