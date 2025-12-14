# Quick Start Guide

This guide will help you get the Compass application running quickly.

## Prerequisites Checklist

- [ ] Node.js 20 or 22 installed
- [ ] npm installed (comes with Node.js)
- [ ] Google Cloud SDK (`gcloud`) installed
- [ ] A Google Cloud Platform project created
- [ ] Firebase project configured in your GCP project

## Setup Steps

### 1. Clone and Install

```bash
# Clone your repository
git clone <your-repository-url>
cd aipps.com
npm install
```

### 2. Verify Your Environment

```bash
npm run verify
```

This command checks if everything is properly configured. Follow the suggestions if any warnings appear.

### 3. Configure Your Project

**Option A: Using Environment Variables (Recommended)**

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your Firebase project ID:
```
FIREBASE_PROJECT_ID=your-actual-project-id
```

**Option B: Direct Configuration**

Edit `src/lib/genkit/genkit.config.ts` and replace:
```typescript
projectId: process.env.FIREBASE_PROJECT_ID || 'your-project-id',
```
with:
```typescript
projectId: 'your-actual-project-id',
```

### 4. Authenticate with Google Cloud

```bash
gcloud auth application-default login
```

Follow the browser prompts to complete authentication.

### 5. Start the Application

```bash
npm run dev
```

This starts both the Next.js app and Genkit UI.

### 6. Access the Application

- **Main App**: http://localhost:3000
- **Genkit UI**: http://localhost:4000

## Alternative Run Modes

### Next.js Only
```bash
npm run dev:next
```
Visit: http://localhost:3000

### Genkit UI Only
```bash
npm run dev:genkit
```
Visit: http://localhost:4000

## Troubleshooting

### Port Already in Use

If ports 3000 or 4000 are already in use:

1. Stop the conflicting process
2. Or modify the ports in `package.json` scripts

### Authentication Issues

If you see authentication errors:

1. Ensure you've run `gcloud auth application-default login`
2. Check that your GCP project has Vertex AI API enabled
3. Verify your Firebase project is properly configured

### Build Errors

If the build fails:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check Node.js version: `node --version` (should be 20.x or 22.x)

### Module Not Found Errors

1. Ensure all dependencies are installed: `npm install`
2. Clear Next.js cache: `rm -rf .next`
3. Restart the development server

## What's Next?

1. **Explore the App**: Browse destinations and activities
2. **Try AI Features**: Use the "Plan my dream trip with AI" button
3. **Customize**: Modify components in `src/components/`
4. **Add Data**: Update `src/data/destinations.json` and `activities.json`
5. **Modify AI Prompts**: Edit `.prompt` files in the `prompts/` directory

## Key Files to Know

- `src/app/page.tsx` - Home page
- `src/app/gemini/page.tsx` - AI trip planning page
- `src/lib/genkit/itineraryFlow.ts` - AI itinerary generation logic
- `prompts/itineraryGen.prompt` - AI prompt template
- `src/data/` - Destination and activity data

## Getting Help

- Review the main [README.md](README.md) for detailed documentation
- Check [Firebase Genkit documentation](https://firebase.google.com/docs/genkit)
- Visit the [Next.js documentation](https://nextjs.org/docs)

## Production Build

To create a production build:

```bash
npm run build
```

The output will be in the `.next` directory.

To run the production build locally:

```bash
npm start
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `FIREBASE_PROJECT_ID` | Yes | Your Firebase/GCP project ID |

## Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run verify` | Verify setup |
| `npm run dev` | Start dev server with Genkit UI |
| `npm run dev:next` | Start Next.js only |
| `npm run dev:genkit` | Start Genkit UI only |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |

---

Happy coding! 🚀
