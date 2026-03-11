import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = '1yLFIhGMDi7TgtJrh9PUCEUPBVm6yQX9fGczQSCle6pw';
const SHEET_NAME = 'Inbound Inquiries';

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
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, email, company, databaseUsers, message]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to append to Google Sheets' }, { status: 500 });
  }
}
