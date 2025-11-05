# Email Setup Guide for Bhojan Mitra Contact Form

The contact form now sends email notifications to `kanhaiya@aarohitavigyan.com` whenever someone submits the form.

## Setup Steps

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Step Verification on your Gmail account:**
   - Go to https://myaccount.google.com/security
   - Click on "2-Step Verification" and follow the setup process

2. **Create an App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other" → Name it "Bhojan Mitra"
   - Click "Generate"
   - Copy the 16-character password (remove spaces)

3. **Update your `.env` file:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=kanhaiya@aarohitavigyan.com
   SMTP_PASS=abcd efgh ijkl mnop  # Your 16-char app password
   ```

### Option 2: SendGrid (Recommended for Production)

SendGrid offers 100 free emails per day, which is ideal for production use.

1. **Create SendGrid account:**
   - Sign up at https://signup.sendgrid.com/

2. **Create API Key:**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name: "Bhojan Mitra Website"
   - Permissions: "Full Access"
   - Copy the API key (shown only once!)

3. **Verify sender email:**
   - Go to Settings → Sender Authentication
   - Verify your domain OR single sender email
   - Follow verification steps

4. **Update your `.env` file:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxx  # Your SendGrid API key
   ```

### Option 3: Other SMTP Services

You can use any SMTP service (Mailgun, AWS SES, etc.):

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Testing Locally

1. **Ensure `.env` file is configured:**
   ```bash
   cat .env  # Should show your SMTP credentials
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Test the contact form:**
   - Visit http://localhost:3000/contact
   - Fill out the form and submit
   - Check server console for "Contact email sent: <message-id>"
   - Check `kanhaiya@aarohitavigyan.com` inbox for the email

## Deploying to Hostinger

### Important: Environment Variables on Hostinger

Hostinger doesn't support `.env` files by default. You have two options:

#### Option A: Use cPanel Environment Variables (Recommended)

1. Log into cPanel
2. Go to "Select PHP Version"
3. Click "Switch To PHP Options"
4. Add environment variables:
   - `SMTP_HOST` = smtp.gmail.com
   - `SMTP_PORT` = 587
   - `SMTP_USER` = kanhaiya@aarohitavigyan.com
   - `SMTP_PASS` = your-app-password

#### Option B: Hardcode in server.js (Less Secure)

Replace the email configuration in `server.js`:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'kanhaiya@aarohitavigyan.com',
    pass: 'your-app-password-here'
  }
});
```

**⚠️ Warning:** This exposes your credentials in the code. Only use for testing.

#### Option C: Upload .env file (Not Recommended)

Since the static build doesn't use server.js on Hostinger, you'll need to:

1. Keep `.env` out of `.gitignore` temporarily
2. Deploy with `./scripts/deploy.sh`
3. The `.env` file will be uploaded
4. Add `.env` back to `.gitignore`

## Troubleshooting

### "Invalid login" error
- Gmail: Ensure you're using an App Password, not your regular password
- Check that 2-Step Verification is enabled
- Verify SMTP_USER is the correct email address

### "Connection timeout"
- Check firewall settings
- Try port 465 with `secure: true` instead of port 587
- Some networks block SMTP - try a different network

### Email not received
- Check spam/junk folder
- Verify sender email is correct in server.js
- Check server console for error messages
- Test with a tool like Mailtrap.io for debugging

### "EAUTH" error
- App Password may be incorrect (no spaces)
- 2-Step Verification must be enabled
- Try regenerating the App Password

## Email Template Customization

The email template is in `server.js` in the `sendContactEmail()` function:

```javascript
function sendContactEmail(contactData) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'kanhaiya@aarohitavigyan.com',  // Change recipient here
    subject: `New Contact Request - ${contactData.name}`,
    html: `...`,  // Customize HTML template here
    text: `...`   // Customize plain text version here
  };
  return transporter.sendMail(mailOptions);
}
```

## Monitoring

- Check `data/contacts.jsonl` for backup of all submissions (even if email fails)
- Monitor server logs for email sending status
- Consider adding email alerts for failed sends in production

## Security Best Practices

1. ✅ Never commit `.env` file to Git (already in `.gitignore`)
2. ✅ Use App Passwords instead of account passwords
3. ✅ Rotate credentials periodically
4. ✅ Use SendGrid/dedicated service for production (not personal Gmail)
5. ✅ Keep backup of form submissions in `data/contacts.jsonl`
6. Consider adding CAPTCHA to prevent spam submissions
