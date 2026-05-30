import { NextRequest, NextResponse } from "next/server"

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

    if (!data.name || !data.email || !data.inquiryType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL
    const sharedSecret = process.env.INQUIRY_SHARED_SECRET

    if (!webhookUrl || !sharedSecret) {
      console.error("INQUIRY_WEBHOOK_URL or INQUIRY_SHARED_SECRET is not configured")
      return NextResponse.json(
        { error: "Inquiry intake not configured" },
        { status: 500 }
      )
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: sharedSecret,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        affiliation: data.affiliation || "",
        inquiryType: data.inquiryType,
        assetLevel: data.assetLevel || "",
        referralSource: data.referralSource || "",
        referrerName: data.referrerName || "",
      }),
      redirect: "follow",
    })

    if (!webhookResponse.ok) {
      console.error(
        "Apps Script webhook returned non-OK status:",
        webhookResponse.status,
        await webhookResponse.text()
      )
      return NextResponse.json(
        { error: "Failed to record inquiry" },
        { status: 502 }
      )
    }

    const result = await webhookResponse.json().catch(() => ({}))
    if (result?.error) {
      console.error("Apps Script reported error:", result.error)
      return NextResponse.json(
        { error: "Failed to record inquiry" },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received successfully",
    })
  } catch (error) {
    console.error("Error processing inquiry:", error)
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    )
  }
}
