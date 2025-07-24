# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 경기도의원 민원관리 시스템 Overview

This is a complaint management system for Gyeonggi-do Council members built with Next.js 14, Supabase, and AI integrations. The system manages civil complaints, schedules, and provides AI-powered analysis.

## Development Commands

### Development Server
```bash
npm run dev              # Start development server
npm run build           # Build for production  
npm run build:prod      # Production build with optimizations
npm start               # Start production server
```

### Database Operations  
```bash
npm run db:push         # Push database schema to Supabase
npm run db:migrate      # Run database migrations
npm run db:studio       # Open Prisma Studio GUI
npm run db:generate     # Generate Prisma client
```

### Code Quality
```bash
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
```

### Deployment
```bash
npm run deploy          # Build and deploy to GitHub Pages
```

## Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **AI Integration**: OpenAI GPT-4

### Key Architectural Patterns

1. **Static Export for GitHub Pages**: The app is configured for static export (`output: 'export'` in next.config.js). Server-side features are handled by Supabase.

2. **Supabase Integration**: All backend functionality (auth, database, storage) is handled through Supabase client SDKs. The app uses both browser and server clients.

3. **AI-Powered Analysis**: Complaints are automatically analyzed using OpenAI to:
   - Generate summaries
   - Extract keywords
   - Analyze sentiment
   - Recommend departments

4. **Prisma for Type Safety**: Database schema is managed through Prisma, providing full TypeScript types for all database operations.

### Project Structure
```
src/
├── app/                # Next.js App Router pages
│   ├── api/           # API routes (limited due to static export)
│   ├── auth/          # Authentication pages
│   ├── complaints/    # Complaint management
│   ├── dashboard/     # Main dashboard
│   └── schedules/     # Schedule management
├── components/        # React components organized by feature
├── lib/              # Core utilities and integrations
│   ├── auth/         # Authentication logic
│   ├── google/       # Google Calendar integration
│   ├── openai/       # AI analysis functions
│   ├── storage/      # File upload handling
│   └── supabase/     # Database clients
└── types/            # TypeScript type definitions
```

### Environment Configuration
Required environment variables (see `.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public Supabase key
- `SUPABASE_SERVICE_ROLE_KEY`: Server-side Supabase key
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API key
- `JWT_SECRET`: JWT signing secret

### Deployment Considerations
1. **GitHub Pages Limitations**: 
   - No server-side rendering or API routes
   - All dynamic functionality must use client-side APIs
   - File paths use `/facd-game` base path in production

2. **Supabase Setup Required**:
   - Create Supabase project
   - Run SQL setup scripts in `src/lib/storage/setup.sql` and `src/lib/data/departments.sql`
   - Configure Storage buckets for file uploads

3. **Build Process**:
   - GitHub Actions automatically builds and deploys on push to main
   - Static files are exported to `out/` directory
   - Images are unoptimized due to static export

### Data Flow
1. **Authentication**: Supabase Auth → JWT → Protected routes
2. **Complaints**: Form submission → AI analysis → Database storage → Dashboard display
3. **Files**: Upload to Supabase Storage → Store URL in database
4. **Schedules**: Calendar component → Database → Google Calendar sync (optional)

### Key Features Implementation
- **AI Analysis**: See `src/lib/openai/analyze.ts` for complaint analysis logic
- **File Upload**: See `src/lib/storage/upload.ts` for Supabase Storage integration
- **Authentication**: See `src/lib/auth/actions.ts` for auth flow
- **Database Operations**: All models defined in `prisma/schema.prisma`