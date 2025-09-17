import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Inquiry</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #007bff; }
            .footer { background: #1a1a1a; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Inquiry</h1>
              <p>ZaneMvula</p>
            </div>
            
            <div class="content">
              <h2>Contact Details</h2>
              
              <div class="field">
                <div class="label">Full Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address:</div>
                <div class="value">${email}</div>
              </div>
              
              ${
                phone
                  ? `
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${phone}</div>
              </div>
              `
                  : ""
              }
              
              ${
                subject
                  ? `
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, "<br>")}</div>
              </div>
              
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>This message was sent from the ZaneMvula contact form</p>
              <p>Please respond to the customer at: ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: `ZaneMvula <${process.env.EMAIL_SENDER}>`,
      to: [`${process.env.EMAIL_RECEIVER}`],
      subject: `New Inquiry: ${subject || "General Inquiry"} - ${name}`,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      console.error("Email sending error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
