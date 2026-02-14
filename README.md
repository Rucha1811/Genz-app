# MindFlow

MindFlow is a Gen-Z mental health and career clarity web app with AI-assisted overthinking analysis, mood tracking, and wellness tools.

## Features
- Auth flow with Supabase
- Mood check-ins and progress tracking
- AI overthinking analyzer
- Career insights and guidance
- Wellness toolkit, audio stories, and community feed

## Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Supabase (auth + database)
- Vercel AI SDK

## Getting Started

### 1) Install dependencies
```bash
pnpm install
```

### 2) Configure environment
Create a `.env.local` file in the project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 3) Run the app
```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Database Setup (Supabase)
SQL scripts are available in the `scripts/` folder to create tables and seed data. Run them in your Supabase SQL editor in order.

## Scripts
```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Deployment
- Works well on Vercel.
- Ensure the environment variables from `.env.local` are set in your hosting provider.

## License
MIT
