# Copilot Instructions for Compass

## Project Overview

Compass is an AI-powered travel planning application built with Next.js, Firebase Genkit, and Vertex AI. It provides intelligent trip itinerary generation and destination discovery features. This is the codebase for the [Build gen AI features powered by your data with Firebase Genkit](https://firebase.google.com/codelabs/ai-genkit-rag) codelab.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **AI/ML**: Firebase Genkit 0.9.x, Vertex AI
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Sass
- **Runtime**: Node.js 20 or 22
- **Backend**: Firebase Admin

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── gemini/       # AI-powered trip planning
│   │   └── legacy/       # Traditional destination browsing
│   ├── components/       # React components
│   ├── lib/              # Utilities and Genkit flows
│   │   ├── genkit/       # Genkit configuration and flows
│   │   └── ...
│   └── data/             # Static destination and activity data
├── prompts/              # Genkit prompt files
└── public/               # Static assets
```

## Key Files

- `src/lib/genkit/itineraryFlow.ts` - AI itinerary generation flow
- `src/lib/genkit/genkit.config.ts` - Genkit and Vertex AI configuration
- `src/app/gemini/page.tsx` - AI trip planning UI
- `src/app/page.tsx` - App home page
- `src/index.ts` - Main entry point for Genkit flows

## Development Guidelines

### Prerequisites

- Node.js version 20 or 22 (specified in package.json engines)
- Google Cloud Platform project with Vertex AI API enabled
- Firebase project configured
- Google Cloud SDK (`gcloud`) installed and authenticated

### Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and configure `FIREBASE_PROJECT_ID`
3. Authenticate with Google Cloud: `gcloud auth application-default login`
4. Verify setup (optional): `npm run verify`

### Development Commands

- `npm run dev` - Start both Genkit UI and Next.js development server
- `npm run dev:next` - Start Next.js only (port 3000)
- `npm run dev:genkit` - Start Genkit UI standalone (port 4000)
- `npm run build` - Build for production (includes copying prompts)
- `npm run lint` - Run ESLint
- `npm start` - Start production server

### Code Style

- Use TypeScript for all new code
- Follow existing ESLint configuration (`.eslintrc.json`)
- Use Prettier for formatting (`.prettierrc`)
- Use functional components with hooks for React
- Use Tailwind CSS utility classes for styling
- Use Sass for custom styles in `globals.scss`

### Testing

- No test infrastructure currently exists in this project
- Manual testing via development server is the primary verification method
- Verify changes by running the dev server and testing UI interactions

### Making Changes

#### When modifying Genkit flows:
- Update files in `src/lib/genkit/`
- Test using Genkit UI at http://localhost:4000
- Ensure prompt files in `prompts/` are in sync
- Remember that prompts are copied to `.next/prompts` during build

#### When modifying UI components:
- Update files in `src/app/` or `src/components/`
- Test on mobile viewports (mobile-first design)
- Ensure Tailwind classes are used consistently
- Verify responsive behavior

#### When adding dependencies:
- Check compatibility with Node.js 20/22
- Use exact or caret versions as appropriate
- Update package.json and run `npm install`
- Verify compatibility with Firebase Genkit 0.9.x

### Environment Configuration

- `.env.local` - Local environment variables (git-ignored)
- `.env.example` - Template for environment variables
- Required variable: `FIREBASE_PROJECT_ID`
- Firebase configuration can also be set in `src/lib/genkit/genkit.config.ts`

### Build Process

The build process includes:
1. Next.js build (`next build`)
2. Copying prompt files to output directory (`cp -r ./prompts ./.next/prompts`)

Always ensure prompt files are properly maintained for production builds.

### Common Issues

- **Font loading**: App uses system fonts to avoid external dependencies
- **Firebase auth**: Requires Google Cloud authentication for AI features
- **Genkit UI**: Runs on port 4000, Next.js on port 3000
- **Prompt files**: Must be copied to `.next/prompts` for production

### AI Features

The app uses Vertex AI through Firebase Genkit for:
- Trip itinerary generation
- Image description from uploads
- Smart activity recommendations
- RAG (Retrieval-Augmented Generation) for personalized planning

When working with AI features:
- Test flows in Genkit UI first
- Ensure GCP authentication is configured
- Verify Vertex AI API is enabled in GCP project
- Check prompt templates in `prompts/` directory

### Pull Request Guidelines

- Keep changes minimal and focused
- Test all affected pages manually
- Run `npm run lint` before submitting
- Ensure builds complete successfully
- Document any new environment variables or setup steps
- Update README.md if adding new features or changing setup process

## Important Notes

- This is a codelab project with Firebase integration
- Requires active GCP project and billing for AI features
- Mobile-first responsive design approach
- Uses Next.js App Router (not Pages Router)
- Genkit version 0.9.x has specific API patterns - refer to official docs
