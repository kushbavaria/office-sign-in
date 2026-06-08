# Office Sign-In App

A modern office visitor sign-in application for ORNN AI INC with integrated NDA (Non-Disclosure Agreement) and Excel export functionality.

## Features

- **Visitor Registration**: Collects visitor information including name, email, company, purpose of visit, and citizenship
- **NDA Integration**: Comprehensive Non-Disclosure Agreement that visitors must accept before signing in
- **Auto-Signature Generation**: Automatically generates a signature from the visitor's name
- **Admin Dashboard**: Password-protected admin interface to manage visitor data
- **Excel Export**: Download visitor data as Excel spreadsheet
- **Local Data Storage**: Simple JSON file-based storage (easily upgradeable to database)
- **Professional UI**: Clean, modern interface optimized for office kiosks and tablets
- **Form Validation**: Client and server-side validation for data integrity
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: Local JSON file
- **Excel Export**: xlsx library
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

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
ADMIN_PASSWORD=your_secure_admin_password_here
```

**Important**: Change the default password to a secure password before deploying.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- View all visitor sign-ins
- Export data to Excel
- Clear all visitor data

Default password: `admin123` (change this in environment variables)

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Update configuration"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and log in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it as a Next.js project
5. Add environment variable in the Vercel dashboard:
   - `ADMIN_PASSWORD` - Your secure admin password
6. Click "Deploy"

### 3. Configure Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow the DNS instructions

### Important Note on Data Persistence

The current implementation uses local JSON file storage for simplicity. For production deployment on Vercel:
- Vercel's file system is ephemeral - data will be lost between deployments
- For production use, consider integrating a database (Supabase, MongoDB, etc.)
- The current storage solution is perfect for development and testing
- Database integration can be added by modifying the `lib/storage.ts` file

## Project Structure

```
office-sign-in/
├── app/
│   ├── api/
│   │   ├── submit/
│   │   │   └── route.ts       # API endpoint for form submission
│   │   ├── visitors/
│   │   │   └── route.ts       # API endpoint to fetch visitors
│   │   ├── export/
│   │   │   └── route.ts       # API endpoint for Excel export
│   │   └── clear/
│   │       └── route.ts       # API endpoint to clear data
│   ├── admin/
│   │   └── page.tsx           # Admin dashboard page
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Main page with sign-in form
│   └── globals.css            # Global styles
├── components/
│   ├── SignInForm.tsx         # Main sign-in form component
│   ├── SignatureGenerator.tsx # Auto-signature generator
│   └── NDAModal.tsx           # NDA modal component
├── lib/
│   └── storage.ts             # Local storage utility
├── data/                      # Local data directory (gitignored)
│   └── visitors.json          # Visitor data storage
├── public/                    # Static assets
├── .env.local                 # Environment variables (not in git)
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

- **Admin Password**: Always use a strong admin password and change it from the default
- **Environment Variables**: Never commit `.env.local` to version control
- **Data Privacy**: Ensure compliance with data protection regulations for visitor information
- **Production Storage**: For production use, consider implementing proper database storage
- **Access Control**: Admin dashboard should only be accessible to authorized personnel

## Troubleshooting

### Admin Login Issues

If you can't access the admin dashboard:
1. Verify the admin password in your `.env.local` file
2. Ensure the environment variable is named `ADMIN_PASSWORD`
3. If deployed to Vercel, check that the environment variable is set in the dashboard

### Form Submission Issues

If form submission fails:
1. Check browser console for JavaScript errors
2. Verify all required fields are filled
3. Ensure NDA is agreed to
4. Check that the signature is generated
5. Ensure the `data/` directory has write permissions

### Excel Export Issues

If Excel export fails:
1. Ensure you're logged into the admin dashboard
2. Check that visitor data exists in the system
3. Verify browser allows file downloads
4. Check browser console for any JavaScript errors

### Data Persistence Issues

If data is lost:
1. Remember that local file storage doesn't persist across Vercel deployments
2. Consider implementing a database for production use
3. Regularly export data using the Excel export feature
4. For development, data persists as long as the server runs continuously

## License

This project is proprietary software for ORNN AI INC.

## Support

For issues or questions, please contact the development team.