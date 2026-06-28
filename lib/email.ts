// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMagicLinkEmail(email: string, url: string) {
  // TEMPORARY: Only allow testing with your own email
  const allowedEmails = ['kanilany@gmail.com'];
  if (!allowedEmails.includes(email)) {
    console.log(`Blocked email: ${email} - Only ${allowedEmails.join(', ')} allowed in testing mode`);
    return { success: false, error: 'Email not allowed in testing mode' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Fatura <noreply@fatura.one>',
      to: [email],
      subject: '🔐 Sign in to Fatura',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Sign in to Fatura</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                background-color: #f8fafc;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }
              .header {
                background: linear-gradient(135deg, #4F46E5, #7C3AED);
                padding: 32px 24px;
                text-align: center;
              }
              .header h1 {
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
                margin: 0;
                letter-spacing: -0.5px;
              }
              .content {
                padding: 40px 32px;
              }
              .content h2 {
                color: #0f172a;
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 16px;
              }
              .content p {
                color: #475569;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 24px;
              }
              .button {
                display: inline-block;
                background: linear-gradient(135deg, #4F46E5, #7C3AED);
                color: #ffffff;
                font-weight: 600;
                font-size: 16px;
                padding: 14px 32px;
                border-radius: 10px;
                text-decoration: none;
                transition: transform 0.2s, box-shadow 0.2s;
                box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
              }
              .button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(79, 70, 229, 0.4);
              }
              .footer {
                text-align: center;
                padding: 24px 32px;
                border-top: 1px solid #e2e8f0;
                color: #94a3b8;
                font-size: 14px;
              }
              .footer a {
                color: #4F46E5;
                text-decoration: none;
              }
              .footer a:hover {
                text-decoration: underline;
              }
              .spacer {
                height: 16px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📄 Fatura</h1>
              </div>
              <div class="content">
                <h2>Welcome back! 👋</h2>
                <p>
                  Click the button below to sign in to your Fatura account. This magic link will expire in 24 hours.
                </p>
                <div style="text-align: center; margin: 32px 0;">
                  <a href="${url}" class="button">🔐 Sign in to Fatura</a>
                </div>
                <p style="font-size: 14px; color: #94a3b8;">
                  If you didn't request this email, you can safely ignore it.
                </p>
                <div class="spacer"></div>
                <p style="font-size: 14px; color: #94a3b8;">
                  <strong>Magic Link:</strong><br>
                  <span style="word-break: break-all; font-size: 13px; color: #64748b;">
                    ${url}
                  </span>
                </p>
              </div>
              <div class="footer">
                <p>
                  Fatura - Simple Invoicing for Everyone<br>
                  <a href="https://fatura.one">fatura.one</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        Sign in to Fatura
        
        Click the link below to sign in to your account:
        ${url}
        
        This link will expire in 24 hours.
        
        If you didn't request this email, you can safely ignore it.
        
        ---
        Fatura - Simple Invoicing for Everyone
        https://fatura.one
      `,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}