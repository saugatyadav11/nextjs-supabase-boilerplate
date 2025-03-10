# Next.js Supabase Boilerplate

A modern, full-featured Next.js boilerplate with Supabase authentication, ShadCN UI components, React Query, and TailwindCSS. This project provides a solid foundation for building web applications with a complete authentication system and user management.

## Features

- 🚀 **Next.js App Router**: Latest Next.js features with App Router architecture
- 🔐 **Complete Authentication System**: 
  - Email/Password login and registration
  - Social login (Google, GitHub)
  - Password reset functionality
  - Email verification
  - Protected routes
- 👤 **User Management**:
  - User profile management
  - Password updates
  - Profile information updates
- 💅 **ShadCN UI**: Beautiful UI components based on Radix UI and Tailwind CSS
- ⚡ **React Query**: Powerful data fetching and state management
- 🎨 **TailwindCSS**: Utility-first CSS framework for rapid UI development
- 📱 **Responsive Design**: Mobile-first approach for all pages
- 🔒 **Protected Routes**: Route protection for authenticated users
- 📝 **TypeScript**: Full type safety throughout the codebase
- 🧩 **Modular Architecture**: Well-organized code structure for scalability

## Project Structure

```
/
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── (auth)/        # Authentication routes
│   │   │   ├── login/     # Login page
│   │   │   ├── register/  # Registration page
│   │   │   ├── forgot-password/ # Password reset request page
│   │   │   └── reset-password/  # Password reset page
│   │   ├── (protected)/   # Protected routes requiring authentication
│   │   │   ├── dashboard/ # Dashboard page
│   │   │   └── profile/   # User profile management page
│   │   ├── auth/          # Auth API routes
│   │   │   └── callback/  # OAuth and email verification callback handler
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # Reusable components
│   │   ├── layout/        # Layout components (navbar, etc.)
│   │   ├── providers/     # Provider components
│   │   │   ├── auth-provider.tsx # Authentication provider
│   │   │   └── query-provider.tsx # React Query provider
│   │   └── ui/            # ShadCN UI components
│   └── lib/               # Utility functions and libraries
│       ├── auth.ts        # Auth utilities and hooks
│       ├── supabase.ts    # Supabase client setup
│       └── utils.ts       # General utilities
└── package.json           # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A Supabase account (for authentication and database)

### Installation

1. Clone this repository:

```bash
git clone https://github.com/saugat-rimal/nextjs-supabase-boilerplate.git
cd nextjs-supabase-boilerplate
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Authentication

This boilerplate provides a complete authentication system using Supabase. The following authentication features are included:

### Email/Password Authentication

1. **Login**: Users can sign in with their email and password at `/login`
2. **Registration**: New users can create an account at `/register`
3. **Password Reset**: Users can reset their password through the forgot password flow at `/forgot-password`

### Social Authentication

The boilerplate includes social login options with:
- Google
- GitHub

### User Management

1. **Profile Management**: Users can update their profile information at `/profile`
2. **Password Updates**: Users can change their password from their profile page

### Protected Routes

All routes under the `(protected)` directory are automatically protected and require authentication. The system will redirect unauthenticated users to the login page.

### Setting Up Supabase

1. Sign up for a Supabase account at [supabase.com](https://supabase.com/)
2. Create a new project and get your API credentials
3. Enable Email/Password authentication in the Auth settings
4. For social login, configure OAuth providers in the Auth > Providers section:
   - For Google: Create OAuth credentials in the Google Cloud Console
   - For GitHub: Create an OAuth App in GitHub Developer Settings
5. Configure email templates for password reset and email verification in Auth > Email Templates
6. Create a test user through the Supabase dashboard or use the registration functionality

## Extending the Project

### Adding New ShadCN Components

To add new ShadCN UI components, use the shadcn CLI:

```bash
npx shadcn@latest add [component-name]
```

For example, to add the Dialog component:

```bash
npx shadcn@latest add dialog
```

### Creating New Protected Routes

To create a new protected route, add a new page under the `src/app/(protected)` directory. The existing authentication protection in the layout will ensure the user is authenticated before accessing the page.

### Adding Database Functionality

To add database functionality, use the Supabase client in `src/lib/supabase.ts`:

```typescript
import { supabase } from '@/lib/supabase';

// Query data
const { data, error } = await supabase
  .from('your-table')
  .select('*');
```

### Adding Custom API Routes

Create new API routes in the `src/app/api` directory using Next.js Route Handlers.

### Customizing the Authentication Flow

The authentication logic is centralized in the `src/components/providers/auth-provider.tsx` file. You can modify this file to customize the authentication flow or add additional authentication methods.

### Adding Role-Based Access Control

To implement role-based access control:

1. Store user roles in Supabase user metadata or a separate table
2. Extend the `AuthProvider` to include role information
3. Create role-specific layouts or components that conditionally render based on user roles

## Deployment

You can deploy this project on Vercel, Netlify, or any other platform that supports Next.js applications. Make sure to add your environment variables to your deployment platform.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy the project

### Supabase Production Settings

For production deployments, make sure to:

1. Update the Site URL in Supabase Auth settings to match your production URL
2. Configure the redirect URLs for OAuth providers to use your production domain
3. Set up proper Row Level Security (RLS) policies for your database tables

## Contributing

Feel free to fork this repository and submit pull requests to contribute to this project. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).
