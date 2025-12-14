# Preview Deployment Example

This document shows what you can expect when the automated preview workflow runs on your pull request.

## 📝 Example PR Comment

When you open a pull request, the GitHub Actions workflow will automatically comment with:

---

## 🎉 Preview Build Successful!

Your preview build has completed successfully.

### 📦 Build Details
- **Commit**: `abc1234`
- **Branch**: `refs/pull/123/merge`
- **Build Time**: 2024-12-14T18:30:00.000Z

### 🚀 Next Steps

To deploy this preview to Firebase App Hosting:

```bash
# Authenticate with Firebase
firebase login

# Deploy to preview channel
firebase hosting:channel:deploy pr-123 --expires 7d
```

### 📋 Preview Checklist
- ✅ Build successful
- ✅ No build errors
- ✅ Ready for manual deployment

> **Note**: This workflow builds the app and verifies the build output. 
> For actual deployment, Firebase credentials would be required.
> See [PREVIEW.md](../blob/main/PREVIEW.md) for more information.

---

## 🔍 What Happens During the Workflow

The preview deployment workflow performs these steps:

1. **Checkout Code** - Gets the latest code from your PR
2. **Setup Node.js** - Configures Node.js 20 environment
3. **Install Dependencies** - Runs `npm ci` to install packages
4. **Build Application** - Runs `npm run build` to create production build
5. **Verify Build** - Checks that `.next` directory was created successfully
6. **Comment on PR** - Posts build status and instructions to the PR
7. **Upload Artifact** - Stores the build output for 7 days

## 📊 Build Artifacts

After the workflow completes, you can download the build artifact:

1. Go to the "Actions" tab in the repository
2. Click on your workflow run
3. Scroll down to "Artifacts"
4. Download `preview-build-pr-123` (where 123 is your PR number)

The artifact contains:
- Complete `.next` directory
- All compiled pages and assets
- Server-side rendering files
- Static assets

## 🎯 Using the Preview

### Option 1: Manual Firebase Deployment

After the build completes, deploy manually:

```bash
# Set your project
firebase use your-project-id

# Deploy to preview channel
firebase hosting:channel:deploy pr-123 --expires 7d

# Your preview will be available at:
# https://your-project-id--pr-123-HASH.web.app
```

### Option 2: Download and Test Locally

```bash
# Download the artifact from GitHub Actions
# Extract it to .next/

# Run the production server
npm start
```

### Option 3: Automated Deployment (Requires Setup)

To enable fully automated deployments:

1. Add `FIREBASE_TOKEN` to GitHub Secrets
2. Update the workflow to include Firebase deployment step
3. Future PRs will automatically deploy to Firebase

## ⚡ Quick Tips

- **Preview URLs** are unique for each PR and deployment
- **Expiration** can be customized (7d, 14d, 30d)
- **Multiple deployments** to the same channel will update the preview
- **Clean up** old previews to save resources

## 🐛 Troubleshooting

### Build Failed

Check the GitHub Actions logs for errors:
- Missing dependencies
- TypeScript errors
- Build configuration issues

### Can't Deploy to Firebase

Make sure you have:
- Firebase CLI installed: `npm install -g firebase-tools`
- Logged in: `firebase login`
- Correct project selected: `firebase use PROJECT_ID`
- Appropriate permissions in the Firebase project

## 📚 Additional Resources

- [Preview Deployments Guide](PREVIEW_DEPLOYMENTS.md) - Complete documentation
- [Firebase Hosting Channels](https://firebase.google.com/docs/hosting/test-preview-deploy)
- [GitHub Actions Artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)

---

**Happy previewing! 🚀**
