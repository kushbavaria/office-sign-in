# Environment Variables Setup

To set up the office sign-in app, you'll need to configure the following environment variable:

## Environment Variables

Add the following to your `.env.local` file:

```
ADMIN_PASSWORD=your_secure_admin_password_here
```

- `ADMIN_PASSWORD`: The password for accessing the admin dashboard to export visitor data

**Important**: Change the default password to a secure password before deploying.

## Admin Dashboard

Access the admin dashboard at `/admin` to:
- View all visitor sign-ins
- Export data to Excel
- Clear all visitor data

## For Vercel Deployment

When deploying to Vercel, add the environment variable in the Vercel dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add the `ADMIN_PASSWORD` variable
4. Redeploy your application

## Data Storage

The app uses local JSON file storage for visitor data:
- Data is stored in the `data/visitors.json` file
- The `data/` directory is automatically created if it doesn't exist
- This directory is excluded from git for security
- For production deployment on Vercel, consider using a database or external storage solution for persistence