import { NextRequest, NextResponse } from "next/server"

// TODO: Configure your email service provider
// Supported options: Resend, SendGrid, Nodemailer, Postmark, etc.
// Add your API key to environment variables (e.g., RESEND_API_KEY)

const RECIPIENT_EMAIL = "jasmine.jiang@sunstoneinvestment.com"

interface InquiryData {
  name: string
  email: string
  phone?: string
  affiliation?: string
  inquiryType: string
  assetLevel?: string
  referralSource?: string
  referrerName?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: InquiryData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.inquiryType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Format the email content
    const emailSubject = `New Private Inquiry from ${data.name}`
    const referrerLine = data.referrerName?.trim()
      ? `NAME OF REFERRER: ${data.referrerName.trim()}\n`
      : ""
    const emailBody = `
New Private Inquiry - Sapphire Life Club

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NAME: ${data.name}
EMAIL: ${data.email}
PHONE: ${data.phone || "Not provided"}
AFFILIATION: ${data.affiliation || "Not provided"}
NATURE OF INQUIRY: ${data.inquiryType}
ASSET LEVEL: ${data.assetLevel || "Not provided"}
REFERRAL SOURCE: ${data.referralSource || "Not provided"}
${referrerLine}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This inquiry was submitted through the Sapphire Life Club website.
    `.trim()

    // ============================================================
    // EMAIL SERVICE CONFIGURATION
    // ============================================================
    // Uncomment and configure ONE of the following email services:
    
    // -------- OPTION 1: Resend (Recommended) --------
    // Add RESEND_API_KEY to your environment variables
    /*
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      )
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Sapphire Life Club <inquiries@yourdomain.com>", // Must be a verified domain in Resend
        to: RECIPIENT_EMAIL,
        subject: emailSubject,
        text: emailBody,
        reply_to: data.email,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json()
      console.error("Resend API error:", errorData)
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }
    */

    // -------- OPTION 2: SendGrid --------
    // Add SENDGRID_API_KEY to your environment variables
    /*
    const sendgridApiKey = process.env.SENDGRID_API_KEY
    if (!sendgridApiKey) {
      console.error("SENDGRID_API_KEY is not configured")
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      )
    }

    const sendgridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: RECIPIENT_EMAIL }] }],
        from: { email: "inquiries@yourdomain.com", name: "Sapphire Life Club" },
        subject: emailSubject,
        content: [{ type: "text/plain", value: emailBody }],
        reply_to: { email: data.email },
      }),
    })

    if (!sendgridResponse.ok) {
      console.error("SendGrid API error:", await sendgridResponse.text())
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }
    */

    // ============================================================
    // TEMPORARY: Log submission (remove when email service is configured)
    // ============================================================
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("NEW PRIVATE INQUIRY RECEIVED")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("To:", RECIPIENT_EMAIL)
    console.log("Subject:", emailSubject)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log(emailBody)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    
    // Return success (email service not yet configured - logging only)
    // TODO: Remove this comment and enable actual email sending above
    
    return NextResponse.json({ 
      success: true,
      message: "Inquiry received successfully" 
    })

  } catch (error) {
    console.error("Error processing inquiry:", error)
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    )
  }
}
