import { GoogleSpreadsheet } from 'google-spreadsheet';

interface VisitorData {
  timestamp: string;
  name: string;
  email: string;
  company: string;
  purpose: string;
  citizenship: string;
  ndaAgreed: boolean;
  signature: string;
}

export async function addVisitorToSheet(data: VisitorData) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

  try {
    // Authenticate with service account
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    });

    // Load document
    await doc.loadInfo();

    // Get first sheet
    const sheet = doc.sheetsByIndex[0];

    // Add row with visitor data
    await sheet.addRow({
      Timestamp: data.timestamp,
      Name: data.name,
      Email: data.email,
      Company: data.company,
      Purpose: data.purpose,
      Citizenship: data.citizenship,
      NDA_Agreed: data.ndaAgreed ? 'Yes' : 'No',
      Signature: data.signature,
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding visitor to Google Sheet:', error);
    return { success: false, error: 'Failed to add visitor to sheet' };
  }
}