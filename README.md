# Compass - AI-Powered Travel Planning App

This is a complete travel planning application built with Next.js, Firebase Genkit, and Vertex AI. It provides AI-powered trip itinerary generation and destination discovery features.

This is the code for [Build gen AI features powered by your data with Firebase Genkit](https://firebase.google.com/codelabs/ai-genkit-rag) codelab.

## Features

- 🗺️ Browse and search travel destinations
- 🤖 AI-powered trip planning with Gemini
- 📅 Multi-day itinerary generation
- 🏖️ Categorized activities and attractions
- 🖼️ Image upload and AI description generation
- 📱 Responsive mobile-first design
- 🚀 Automated preview deployments for pull requests

## Prerequisites

Before you begin, ensure you have:

- Node.js 20 or 22 installed
- A Google Cloud Platform project with:
  - Vertex AI API enabled
  - Firebase project configured
- Google Cloud SDK (`gcloud`) installed

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Verify Setup (Optional but Recommended)

Run the setup verification script to check your environment:

```bash
npm run verify
```

This will check for:
- Correct Node.js version
- Installed dependencies
- Environment configuration
- Google Cloud authentication
- Project structure integrity

### 3. Configure Firebase

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Then update the `FIREBASE_PROJECT_ID` in `.env.local` with your Firebase project ID.

Alternatively, you can directly edit `src/lib/genkit/genkit.config.ts` and replace `'your-project-id'` with your actual Firebase project ID.

### 4. Authenticate with Google Cloud

```bash
gcloud auth application-default login
```

See [Genkit documentation](https://firebase.google.com/docs/genkit/plugins/vertex-ai) for more information.

### 5. Run the Application

#### Option A: Run Next.js app with Genkit UI

```bash
npm run dev
```

This starts both the Genkit UI and Next.js development server.

- Open [http://localhost:3000](http://localhost:3000) to view the app
- Open [http://localhost:4000](http://localhost:4000) to view Genkit UI

#### Option B: Run Next.js only

```bash
npm run dev:next
```

#### Option C: Run Genkit UI standalone

```bash
npm run dev:genkit
```

## Building for Production

```bash
npm run build
```

This command:
1. Builds the Next.js application
2. Copies prompt files to the output directory

To start the production server:

```bash
npm start
```

### Google Cloud Build

The repository includes a `cloudbuild.yaml` configuration file for building the application with Google Cloud Build. The build process:
1. Uses Node.js 20
2. Installs dependencies with `npm ci`
3. Builds the application with `npm run build`

Cloud Build will automatically detect and use this configuration file when triggered.

## Preview Deployments

This repository includes an automated preview deployment system for pull requests. When you open or update a PR, a preview environment is automatically deployed to Google Cloud Run and a comment is added to the PR with the preview URL.

For detailed setup instructions and configuration, see [PREVIEW_DEPLOYMENT.md](PREVIEW_DEPLOYMENT.md).

**Quick Setup:**
1. Enable Cloud Run and Container Registry APIs in your GCP project
2. Create a service account with Cloud Run Admin, Storage Admin, and Service Account User roles
3. Add `GCP_PROJECT_ID` and `GCP_SA_KEY` secrets to your GitHub repository

Preview deployments are automatically cleaned up when PRs are closed.

## Development

### Project Structure

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

### Key Files

- `src/lib/genkit/itineraryFlow.ts` - AI itinerary generation flow
- `src/app/gemini/page.tsx` - AI trip planning UI
- `src/app/page.tsx` - App home page
- `src/lib/genkit/genkit.config.ts` - Genkit and Vertex AI configuration

### Linting

```bash
npm run lint
```

## Technologies Used

- **Next.js 14** - React framework
- **Firebase Genkit** - AI orchestration framework
- **Vertex AI** - Google's AI platform
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Sass** - CSS preprocessing

## Preview Deployments

This repository is configured with automated preview deployments for pull requests. When you open a PR, GitHub Actions will automatically build and prepare your changes for preview.

For detailed information about setting up and using preview deployments, see [Preview Deployments Guide](docs/PREVIEW_DEPLOYMENTS.md).

Quick preview commands:
```bash
# Deploy to a preview channel
firebase hosting:channel:deploy pr-123 --expires 7d

# List active previews
firebase hosting:channel:list

# Delete a preview
firebase hosting:channel:delete pr-123
```

## License

Copyright 2024 Google LLC - Apache License 2.0

See [LICENSE](LICENSE) for details.
