// /api/enquiry.js
// Vercel Serverless Function — handles the enquiry form submission
// and sends an email to infoyellowpest@gmail.com using Resend (https://resend.com)
//
// SETUP:
// 1. Sign up free at https://resend.com (no credit card needed for free tier)
// 2. Get your API key from the Resend dashboard
// 3. In Vercel: Project -> Settings -> Environment Variables
//    Add: RESEND_API_KEY = <your key>
// 4. (Optional) Verify your own domain in Resend to send from
//    e.g. enquiries@yourdomain.com. Until then, Resend's default
//    onboarding sender (onboarding@resend.dev) works for testing.

export default async function handler(req, res) {
  // Allow CORS for safety if form is on same domain (not strictly needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, service, address, message } = req.body;

    if (!name || !phone || !email || !service || !address || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const emailHtml = `
      <h2>New Pest Control Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service Required:</strong> ${service}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p style="color:#888;font-size:12px;">Sent from Yellow Pest Control Services website enquiry form.</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Yellow Pest Website <onboarding@resend.dev>',
        to: ['infoyellowpest@gmail.com'],
        reply_to: email,
        subject: `New Enquiry: ${service} - ${name}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resend error:', errText);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Enquiry API error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
