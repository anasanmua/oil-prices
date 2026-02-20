# Oil Prices - Copilot Instructions

## Project Overview
A web application that tracks and displays up-to-date olive oil prices. It scrapes data from multiple sources and stores it in MongoDB.

## Tech Stack
- **Frontend**: Next.js 15, TypeScript, React
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Charts**: Chart.js with react-chartjs-2
- **UI Components**: Custom components (button, table)
- **Styling**: Tailwind CSS with custom colors palette

## Project Structure
```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API endpoints
│   └── prices/         # Price pages
├── lib/
│   ├── mongo.ts        # MongoDB connection
│   ├── models/         # Data models (Price interface)
│   └── repositories/   # Data access layer (pricesRepo)
├── charts/             # Chart components
├── components/         # Reusable UI components
└── scrapers/           # Web scrapers
```

## Code Conventions
- Use TypeScript for all files
- Follow async/await pattern for database operations
- Repository pattern for data access
- Server Components by default in Next.js
- API routes in `/api/` directory with GET/POST naming convention
- Import colors from `@/colors` (centralized color palette)

## Key Features
- Scrape olive oil prices from multiple sources
- Store prices in MongoDB with unique index (source + product + marketDate)
- GET `/api/prices` - Get all prices
- GET `/api/prices?limit=4` - Get last 4 prices
- POST `/api/prices` - Insert new price
- Display prices in table and chart formats

## Important Notes
- Use relative imports with `@/` alias
- Always handle errors in async functions
- Prevent duplicate prices using MongoDB unique indexes
- Use `cache: "no-store"` in fetch calls for fresh data
