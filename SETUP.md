# Environment Variables Setup

To set up the Google Sheets integration, you'll need to configure the following environment variables:

## Google Sheets Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Sheets API

2. **Create a Service Account**
   - Go to IAM & Admin > Service Accounts
   - Create a new service account
   - Grant it "Editor" role for Google Sheets
   - Create a JSON key for the service account
   - Download the JSON file

3. **Create a Google Sheet**
   - Create a new Google Sheet with the following columns:
     - Timestamp
     - Name
     - Email
     - Company
     - Purpose
     - Citizenship
     - NDA_Agreed
     - Signature
   - Share the sheet with the service account email (give it Editor access)

4. **Configure Environment Variables**

   Add the following to your `.env.local` file:

   ```
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

   - `GOOGLE_SPREADSHEET_ID`: The ID from your Google Sheet URL (the long string between `/d/` and `/edit`)
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The email address of your service account
   - `GOOGLE_PRIVATE_KEY`: The private key from your service account JSON file (make sure to preserve the `\n` characters)

## For Vercel Deployment

When deploying to Vercel, add these environment variables in the Vercel dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add the three variables listed above
4. Redeploy your application