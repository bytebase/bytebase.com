import { NextResponse } from 'next/server';

const slackWebhookList = [
  'https://hooks.slack.com/services/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',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formId, firstname, lastname, email, company, message } = body;

    const responses = await Promise.all(
      slackWebhookList.map((webhookUrl) =>
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: `${formId} by ${firstname} ${lastname} (${email}) from ${company}\n\n${message}`,
          }),
        }),
      ),
    );

    if (!responses.every((response) => response.ok)) {
      return NextResponse.json({ error: 'Failed to send to Slack' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
