import { NextResponse } from 'next/server';

const slackWebhookList = [process.env.SLACK_WEBHOOK_URL];

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

    const failedResponses = await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          const error = await response.text();
          return error;
        }
        return null;
      }),
    );
    const errors = failedResponses.filter(Boolean);

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: 'Failed to send to Slack',
          details: errors,
        },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
