# 🚀 Preview Deployments Guide

This guide explains how preview deployments work for the Compass app and how to set them up.

## 📋 Overview

The Compass app supports preview deployments for pull requests, allowing you to test changes before merging to main.

## 🤖 Automated Preview Workflow

When you open a pull request, GitHub Actions automatically:

1. ✅ Builds the Next.js application
2. ✅ Verifies the build output
3. ✅ Uploads the build artifact
4. ✅ Comments on the PR with build status

## 🔧 Setting Up Firebase Preview Deployments

### Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project configured (see `.env.example`)
- Appropriate Firebase permissions

### Manual Preview Deployment

After the automated build completes, you can deploy to a Firebase preview channel:

```bash
# 1. Authenticate with Firebase
firebase login

# 2. Set your project
firebase use your-project-id

# 3. Deploy to a preview channel
firebase hosting:channel:deploy pr-123 --expires 7d
```

Replace `pr-123` with your actual PR number.

### Automated Preview Deployment (Advanced)

To enable fully automated preview deployments, you need to:

1. **Add Firebase token to GitHub Secrets**:
   ```bash
   firebase login:ci
   # Copy the token and add it as FIREBASE_TOKEN in GitHub Secrets
   ```

2. **Update the workflow** (`.github/workflows/preview-deploy.yml`):
   - Uncomment the Firebase deployment step
   - Add the `FIREBASE_TOKEN` secret

3. **Configure Firebase App Hosting**:
   The app uses Firebase App Hosting (see `apphosting.yaml`), which provides:
   - Automatic scaling
   - Server-side rendering support
   - Built-in CDN

## 📱 Preview URL Format

Once deployed, your preview will be available at:

```
https://your-project-id--pr-NUMBER-HASH.web.app
```

Example: `https://compass-app--pr-123-xyz789.web.app`

## ⏱️ Preview Expiration

Preview deployments expire after 7 days by default. You can customize this:

```bash
firebase hosting:channel:deploy pr-123 --expires 14d  # 14 days
firebase hosting:channel:deploy pr-123 --expires 30d  # 30 days
```

## 🎯 Preview Use Cases

### 1. Feature Development
Create a preview for each feature branch to test:
- New UI components
- AI-powered features
- Route changes
- Styling updates

### 2. Code Reviews
Reviewers can:
- Test the live application
- Verify UI/UX changes
- Check mobile responsiveness
- Validate functionality

### 3. Stakeholder Demos
Share preview links with:
- Product managers
- Designers
- QA testers
- Stakeholders

## 🔒 Security Considerations

### Environment Variables

Preview deployments need access to:
- `FIREBASE_PROJECT_ID` - Set in GitHub Secrets
- Google Cloud credentials - For AI features

### API Keys

Never commit API keys or secrets. Use:
- GitHub Secrets for CI/CD
- Firebase Environment Config for runtime
- `.env.local` for local development

## 🐛 Troubleshooting

### Build Failures

If the preview build fails:

1. Check the GitHub Actions logs
2. Verify `npm run build` works locally
3. Check for missing dependencies
4. Validate environment variables

### Deployment Failures

If Firebase deployment fails:

1. Verify Firebase authentication: `firebase login`
2. Check project permissions: `firebase projects:list`
3. Ensure Firebase hosting is enabled
4. Verify `firebase.json` configuration

### Preview Not Loading

If the preview URL doesn't work:

1. Wait a few minutes for DNS propagation
2. Check Firebase Console for deployment status
3. Verify the build output in artifacts
4. Check browser console for errors

## 📊 Monitoring Previews

### List Active Previews

```bash
firebase hosting:channel:list
```

### View Preview Details

```bash
firebase hosting:channel:open pr-123
```

### Delete Old Previews

```bash
firebase hosting:channel:delete pr-123
```

## 🎨 Preview vs Production

| Feature | Preview | Production |
|---------|---------|------------|
| URL | Temporary subdomain | Custom domain |
| Duration | 7-30 days | Permanent |
| SSL | Automatic | Automatic |
| Analytics | Limited | Full |
| Authentication | Test users | Production users |

## 📖 Additional Resources

- [Firebase App Hosting Docs](https://firebase.google.com/docs/app-hosting)
- [Firebase Hosting Channels](https://firebase.google.com/docs/hosting/test-preview-deploy)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

## ✨ Quick Commands Reference

```bash
# Deploy preview
firebase hosting:channel:deploy pr-123 --expires 7d

# List previews
firebase hosting:channel:list

# Open preview in browser
firebase hosting:channel:open pr-123

# Delete preview
firebase hosting:channel:delete pr-123

# Clone preview to another channel
firebase hosting:channel:clone pr-123:pr-456
```

## 🎉 Best Practices

1. **Name your channels consistently**: Use `pr-NUMBER` format
2. **Set appropriate expiration**: 7 days for quick reviews, 30 days for long-term testing
3. **Clean up old previews**: Delete after PR is merged
4. **Document changes**: Include preview link in PR description
5. **Test thoroughly**: Use previews to catch issues before production

---

**Need help?** Check the [main documentation](README.md) or open an issue on GitHub.
