import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = '1yLFIhGMDi7TgtJrh9PUCEUPBVm6yQX9fGczQSCle6pw';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, databaseUsers, message } = body;

    const serviceAccountKey = JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY as string);

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, email, company, databaseUsers, message]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('Google Sheets append error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
