import { google } from 'googleapis';
import md5 from 'md5';
import { NextResponse } from 'next/server';

const SPREADSHEET_ID = '1yLFIhGMDi7TgtJrh9PUCEUPBVm6yQX9fGczQSCle6pw';
const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;

async function sendSlackMessage(blocks: Record<string, unknown>[]) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL as string;
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks }),
    });
    if (!response.ok) {
      const error = await response.text();
      // eslint-disable-next-line no-console
      console.error('Slack webhook error:', error);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Slack webhook request failed:', err);
  }
}

async function appendToGoogleSheets(row: string[]) {
  const serviceAccountKey = JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY as string);

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'A:E',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });
}

async function subscribeToMailchimp(email: string, tag: string) {
  const DATACENTER = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const API_KEY = process.env.MAILCHIMP_API_KEY;

  const hash = md5(email.toLowerCase());
  const authHeader = Buffer.from(`anystring:${API_KEY}`).toString('base64');

  const response = await fetch(
    `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${hash}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed',
        tags: [tag],
      }),
    },
  );

  if (!response.ok) {
    const data = await response.json();
    // eslint-disable-next-line no-console
    console.error('Mailchimp subscribe error:', data);
  }
}

export async function POST(request: Request) {
  let name = '';
  let email = '';
  let company = '';
  let message = '';

  try {
    const body = await request.json();
    ({ name, email, company, message } = body);

    const timestamp = new Date().toISOString();

    // Google Sheets is the source of truth — must succeed
    await appendToGoogleSheets([timestamp, name, email, company, message]);

    // Fire-and-forget: Slack and Mailchimp failures should not block the response
    void sendSlackMessage([
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${name}* (${email})\n${company}\n${message}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<${SPREADSHEET_URL}|View spreadsheet>`,
        },
      },
    ]);

    void subscribeToMailchimp(email, 'enterprise-inquiry');

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('Contact form error:', errorMessage);

    // Notify Slack about the failure
    void sendSlackMessage([
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🚨 *Contact form submission failed*\n*${name}* (${email}) · ${company}\n${message}\n\`\`\`${errorMessage}\`\`\``,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<${SPREADSHEET_URL}|View spreadsheet>`,
        },
      },
    ]);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
