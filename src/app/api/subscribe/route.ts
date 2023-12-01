import { NextRequest, NextResponse } from 'next/server';

import md5 from 'md5';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const DATACENTER = process.env.MAILCHIMP_API_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const API_KEY = process.env.MAILCHIMP_API_KEY;

  const subscriber = {
    email_address: email,
    status_if_new: 'subscribed',
    tags: ['newsletter'],
  };

  const hash = md5(email.toLowerCase());

  const auth = Buffer.from(`anystring:${API_KEY}`).toString('base64');

  try {
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${hash}`,
      {
        body: JSON.stringify(subscriber),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        method: 'PUT',
      },
    );

    if (response.status >= 400) {
      const data = await response.json();

      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(null, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || err?.toString() || '' }, { status: 500 });
  }
}
