import { NextResponse } from 'next/server';
import { getVisitors } from '@/lib/storage';
import * as XLSX from 'xlsx';

export async function GET() {
  try {
    const visitors = await getVisitors();

    // Format data for Excel
    const excelData = visitors.map(visitor => ({
      'Date & Time': new Date(visitor.timestamp).toLocaleString(),
      'Name': visitor.name,
      'Email': visitor.email,
      'Company': visitor.company,
      'Purpose': visitor.purpose,
      'Citizenship': visitor.citizenship,
      'NDA Agreed': visitor.ndaAgreed ? 'Yes' : 'No',
      'Citizenship Declaration': visitor.citizenshipDeclaration ? 'Yes' : 'No',
      'NDA PDF': visitor.ndaPdfUrl || '',
      'Signature': '[See NDA PDF]',
    }));

    // Create workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Visitors');

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Return as downloadable file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="visitor-sign-in-${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Error exporting Excel:', error);
    return NextResponse.json(
      { error: 'Failed to export Excel file' },
      { status: 500 }
    );
  }
}