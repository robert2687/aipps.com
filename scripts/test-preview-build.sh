#!/bin/bash

# Preview Build Test Script
# This script simulates the GitHub Actions preview workflow locally

set -e  # Exit on error

echo "🚀 Starting Preview Build Test..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check Node.js version
echo -e "${BLUE}Step 1: Checking Node.js version...${NC}"
NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -eq 20 ] || [ "$NODE_VERSION" -eq 22 ]; then
    echo -e "${GREEN}✓ Node.js version $NODE_VERSION is supported${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Node.js $NODE_VERSION detected. Recommended: 20 or 22${NC}"
fi
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}Step 2: Installing dependencies...${NC}"
npm ci
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 3: Build application
echo -e "${BLUE}Step 3: Building application...${NC}"
npm run build
echo -e "${GREEN}✓ Build completed${NC}"
echo ""

# Step 4: Verify build output
echo -e "${BLUE}Step 4: Verifying build output...${NC}"
if [ ! -d ".next" ]; then
    echo -e "${YELLOW}✗ Error: .next directory was not created by the build${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build output verified: .next directory exists${NC}"
echo ""

# Step 5: Show build statistics
echo -e "${BLUE}Step 5: Build statistics...${NC}"
echo "Directory size:"
du -sh .next
echo ""
echo "Build contents:"
ls -lh .next/
echo ""

# Step 6: Success summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Preview Build Test Completed Successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Next steps:"
echo "  1. Test the build: npm start"
echo "  2. Deploy preview: firebase hosting:channel:deploy pr-test --expires 7d"
echo "  3. Open PR to trigger automated preview workflow"
echo ""
echo "For more information, see docs/PREVIEW_DEPLOYMENTS.md"
