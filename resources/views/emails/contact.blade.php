<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }

        .content {
            background: #f9fafb;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-top: none;
            border-radius: 0 0 8px 8px;
        }

        .field {
            margin-bottom: 16px;
        }

        .label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
            margin-bottom: 4px;
        }

        .value {
            background: white;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }

        .message-content {
            white-space: pre-wrap;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9;">From {{ config('app.name') }}</p>
    </div>

    <div class="content">
        <div class="field">
            <div class="label">From</div>
            <div class="value">{{ $name }} ({{ $email }})</div>
        </div>

        <div class="field">
            <div class="label">Subject</div>
            <div class="value">{{ $subject }}</div>
        </div>

        <div class="field">
            <div class="label">Message</div>
            <div class="value message-content">{{ $messageContent }}</div>
        </div>
    </div>
</body>

</html>