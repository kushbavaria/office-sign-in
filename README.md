# Office Sign-In App

A modern office visitor sign-in application for ORNN AI INC with integrated NDA (Non-Disclosure Agreement) and Google Sheets data storage.

## Features

- **Visitor Registration**: Collects visitor information including name, email, company, purpose of visit, and citizenship
- **NDA Integration**: Comprehensive Non-Disclosure Agreement that visitors must accept before signing in
- **Auto-Signature Generation**: Automatically generates a signature from the visitor's name
- **Google Sheets Integration**: Automatically stores all visitor data in a Google Sheet
- **Professional UI**: Clean, modern interface optimized for office kiosks and tablets
- **Form Validation**: Client and server-side validation for data integrity
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: Google Sheets API
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kushbavaria/office-sign-in.git
cd office-sign-in
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Google Sheets Setup

#### Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Search for "Google Sheets API" and enable it

#### Create a Service Account
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name it (e.g., "office-sign-in-service")
4. Grant it "Editor" role for Google Sheets
5. Click "Create and Continue"
6. Skip granting users access (optional)
7. Click "Done"
8. Click on the service account you just created
9. Go to "Keys" tab and click "Add Key" > "Create New Key"
10. Choose "JSON" and download the key file
11. **Keep this file secure and never commit it to git**

#### Create a Google Sheet
1. Create a new Google Sheet with the following columns in the first row:
   - Timestamp
   - Name
   - Email
   - Company
   - Purpose
   - Citizenship
   - NDA_Agreed
   - Signature
2. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
3. Share the sheet with your service account email (give it Editor access)

#### Configure Environment Variables
1. Copy the service account JSON file content
2. Create a `.env.local` file in the project root:

```env
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

- `GOOGLE_SPREADSHEET_ID`: The ID from your Google Sheet URL
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The client_email from your service account JSON
- `GOOGLE_PRIVATE_KEY`: The private_key from your service account JSON (preserve the `\n` characters)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and log in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it as a Next.js project
5. Add environment variables in the Vercel dashboard:
   - `GOOGLE_SPREADSHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
6. Click "Deploy"

### 3. Configure Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow the DNS instructions

## Project Structure

```
office-sign-in/
├── app/
│   ├── api/
│   │   └── submit/
│   │       └── route.ts       # API endpoint for form submission
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Main page with sign-in form
│   └── globals.css            # Global styles
├── components/
│   ├── SignInForm.tsx         # Main sign-in form component
│   ├── SignatureGenerator.tsx # Auto-signature generator
│   └── NDAModal.tsx           # NDA modal component
├── lib/
│   └── googleSheets.ts        # Google Sheets API integration
├── public/                    # Static assets
├── .env.local                 # Environment variables (not in git)
├── .env.local.example         # Environment variables template
├── .gitignore
├── README.md
├── SETUP.md                   # Detailed setup instructions
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## NDA Agreement

The app includes a comprehensive Non-Disclosure Agreement for ORNN AI INC that covers:

- Confidential information definition
- Visitor obligations
- Exclusions from confidential information
- Protection of company property
- No license or rights granted
- Term and termination
- Remedies for breach
- Governing law (Delaware)
- Entire agreement clause

The NDA text is also available as a Word document in the project root for reference.

## Security Considerations

- **Environment Variables**: Never commit `.env.local` to version control
- **Service Account Key**: Keep the service account JSON file secure
- **API Rate Limits**: Google Sheets API has usage quotas (typically sufficient for office use)
- **Data Privacy**: Ensure compliance with data protection regulations for visitor information

## Troubleshooting

### Google Sheets API Errors

If you encounter authentication errors:
1. Verify your service account email is correct
2. Ensure the service account has Editor access to the Google Sheet
3. Check that the private key is properly formatted with `\n` characters
4. Verify the Google Sheets API is enabled in your Google Cloud project

### Form Submission Issues

If form submission fails:
1. Check browser console for JavaScript errors
2. Verify all required fields are filled
3. Ensure NDA is agreed to
4. Check that the signature is generated
5. Review API route logs for detailed error messages

### Deployment Issues

If Vercel deployment fails:
1. Ensure all environment variables are set in Vercel dashboard
2. Check that the private key is properly formatted in the Vercel environment variables
3. Review Vercel deployment logs for specific errors

## License

This project is proprietary software for ORNN AI INC.

## Support

For issues or questions, please contact the development team.