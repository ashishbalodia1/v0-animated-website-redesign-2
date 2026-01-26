import { Resend } from 'resend'

// Initialize Resend (get API key from https://resend.com)
const resendApiKey = process.env.RESEND_API_KEY
const isEmailConfigured = Boolean(resendApiKey)

const resend = isEmailConfigured && resendApiKey ? new Resend(resendApiKey) : null

interface EmailData {
  to: string
  subject: string
  html: string
}

// Send email using Resend
export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  if (!isEmailConfigured || !resend) {
    console.log('📧 Email not configured. Would have sent:', data.subject)
    return { success: false, message: 'Email service not configured' }
  }

  try {
    await resend.emails.send({
      from: 'ElectronicsHub <onboarding@resend.dev>', // Change to your domain
      to: data.to,
      subject: data.subject,
      html: data.html,
    })

    return { success: true, message: 'Email sent successfully' }
  } catch (error: any) {
    console.error('Email send error:', error)
    return { success: false, message: error.message || 'Failed to send email' }
  }
}

// Welcome email template
export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2874F0 0%, #1e5bb8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #FF9900; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to ElectronicsHub!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name}! 👋</h2>
            <p>Thank you for creating an account with ElectronicsHub. We're excited to have you join our community of makers and electronics enthusiasts!</p>
            
            <p><strong>What you can do now:</strong></p>
            <ul>
              <li>Browse thousands of electronics components</li>
              <li>Get exclusive discounts and offers</li>
              <li>Track your orders in real-time</li>
              <li>Access technical support from our experts</li>
            </ul>

            <a href="https://your-domain.com/products" class="button">Start Shopping →</a>

            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Happy building! 🔧</p>
            <p><strong>Team ElectronicsHub</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 ElectronicsHub. All rights reserved.</p>
            <p>Campus Plaza, University Ave</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: email,
    subject: '🎉 Welcome to ElectronicsHub - Account Created Successfully!',
    html,
  })
}

// Login notification email
export const sendLoginNotification = async (email: string, name: string): Promise<void> => {
  const now = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2874F0 0%, #1e5bb8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; border-left: 4px solid #2874F0; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Login Notification</h1>
          </div>
          <div class="content">
            <h2>Hello ${name}!</h2>
            <p>We detected a login to your ElectronicsHub account.</p>
            
            <div class="info-box">
              <strong>Login Details:</strong><br>
              📅 Time: ${now}<br>
              🌍 Location: India<br>
              💻 Device: Web Browser
            </div>

            <p><strong>Was this you?</strong></p>
            <p>If you recognize this activity, you can safely ignore this email.</p>
            
            <p>If you didn't log in, please secure your account immediately by changing your password.</p>
            
            <p>Stay safe! 🔒</p>
            <p><strong>Team ElectronicsHub</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 ElectronicsHub. All rights reserved.</p>
            <p>This is an automated security notification.</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: email,
    subject: '🔐 Login Alert - ElectronicsHub Account',
    html,
  })
}
