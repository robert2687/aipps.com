# Preview Deployment System

This repository includes an automated preview deployment system for pull requests using Google Cloud Run.

## How It Works

When you open or update a pull request:
1. The GitHub Action builds your Next.js application into a Docker container
2. The container is pushed to Google Container Registry (GCR)
3. A Cloud Run service is deployed with a unique name (e.g., `compass-pr-123`)
4. The PR is automatically commented with the preview URL
5. When the PR is closed, the Cloud Run service and container images are cleaned up

## Setup Instructions

### Prerequisites

1. A Google Cloud Platform project
2. Cloud Run API enabled
3. Container Registry API enabled
4. A service account with appropriate permissions

### Required GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **`GCP_PROJECT_ID`**: Your Google Cloud Project ID
   ```
   example: my-firebase-project
   ```

2. **`GCP_SA_KEY`**: Service Account JSON key
   
   Create a service account with these roles:
   - Cloud Run Admin
   - Storage Admin
   - Service Account User
   
   Then download the JSON key:
   ```bash
   gcloud iam service-accounts create github-actions \
     --display-name="GitHub Actions"
   
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:github-actions@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/run.admin"
   
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:github-actions@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/storage.admin"
   
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:github-actions@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"
   
   gcloud iam service-accounts keys create key.json \
     --iam-account=github-actions@PROJECT_ID.iam.gserviceaccount.com
   ```
   
   Copy the entire contents of `key.json` as the secret value.

**Security Note:** For enhanced security, consider using [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation) instead of service account JSON keys. This eliminates the need to store long-lived credentials and provides better security through automatic credential rotation.

### Enable Required APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## Workflows

### Preview Deployment (`.github/workflows/preview-deploy.yml`)

Triggers on:
- Pull request opened
- Pull request synchronized (new commits)
- Pull request reopened

Actions:
- Builds Docker image
- Pushes to GCR
- Deploys to Cloud Run
- Comments on PR with preview URL

### Preview Cleanup (`.github/workflows/preview-cleanup.yml`)

Triggers on:
- Pull request closed (merged or not)

Actions:
- Deletes Cloud Run service
- Deletes container images
- Comments on PR confirming cleanup

## Cost Considerations

- Cloud Run charges for:
  - Container CPU and memory usage when serving requests
  - Container image storage in GCR
- With the default configuration, costs should be minimal for preview environments
- Services are automatically cleaned up when PRs are closed to minimize costs

## Customization

### Change Region

Edit the `REGION` environment variable in both workflow files:
```yaml
env:
  REGION: us-central1  # Change to your preferred region
```

### Adjust Cloud Run Resources

Add resource limits to the deployment command in `preview-deploy.yml`:
```yaml
gcloud run deploy $SERVICE_NAME \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  # ... other flags
```

### Custom Domain

To use custom domains for previews, configure Cloud Run domain mappings after deployment.

## Troubleshooting

### Build Fails

- Check that all dependencies are correctly specified in `package.json`
- Verify the `Dockerfile` is valid
- Check workflow logs for specific error messages

### Deployment Fails

- Ensure the service account has the correct permissions
- Verify the GCP project ID is correct
- Check that required APIs are enabled

### Preview URL Not Accessible

- Cloud Run services must allow unauthenticated access for public previews
- Check IAM permissions on the Cloud Run service
- Verify no organization policies are blocking public access

## Security Notes

- Preview deployments are public by default
- Do not commit sensitive data or API keys to the repository
- Use environment variables or Google Secret Manager for sensitive configuration
- Consider adding authentication for internal projects

## Alternative Approaches

If you prefer not to use Cloud Run, consider:

1. **Vercel**: Automatic PR previews with zero configuration
2. **Firebase Hosting Preview Channels**: Good for static sites
3. **Google Cloud Build with App Engine**: Alternative serverless option
4. **Self-hosted runners**: For more control over the preview environment
