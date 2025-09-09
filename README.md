# CS12N Blog

A modern, responsive blog platform built with Next.js 15, featuring authentication, real-time updates, and a beautiful Persian/Arabic RTL interface.

## Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Authentication**: Secure user authentication with NextAuth.js
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **RTL Support**: Full Persian right-to-left language support
- **Dark Mode**: Built-in dark theme with smooth transitions
- **Real-time Updates**: React Query for efficient data fetching
- **Form Handling**: React Hook Form with Zod validation
- **Accessibility**: React Aria Components for better accessibility
- **State Management**: Zustand for lightweight state management
- **SVG Support**: Custom SVG handling with SVGR
- **Performance**: Turbopack for faster development builds

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/) (recommended) or npm

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cs12n-blog
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your configuration:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   NEXT_PUBLIC_API_URL=http://some-url.com
   ```

## Running the Application

### Development Mode

```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build the application
yarn build
# or
npm run build

# Start the production server
yarn start
# or
npm start
```

## Key Components

### Authentication

- **NextAuth.js**: Secure authentication with multiple providers
- **Session Management**: Server-side and client-side session handling
- **Protected Routes**: Automatic route protection

### UI/UX

- **Tailwind CSS**: Utility-first CSS framework
- **React Aria**: Accessible component primitives
- **Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach

### Data Management

- **React Query**: Server state management
- **Axios**: HTTP client for API calls
- **Zustand**: Lightweight state management

## Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Environment Configuration

The application supports various environment variables for configuration:

### Required

- `NEXTAUTH_URL` - Your application URL (used by NextAuth)
- `NEXTAUTH_SECRET` - Secret key for NextAuth authentication
- `NEXT_PUBLIC_API_URL` - Base URL for your public API requests

## Features Overview

### Blog Features

- Article categories and filtering
- Weekly challenges
- User-generated content
- Responsive post layout

### User Management

- User registration and login
- Profile management
- Settings panel
- Password change functionality

### Technical Features

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Husky for git hooks

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/cs12-org/cs12n-blog/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## Updates

Stay updated with the latest changes by:

- Watching the repository
- Following the release notes
- Checking the changelog

---

**Built with ❤️ using Next.js, React, and TypeScript**
