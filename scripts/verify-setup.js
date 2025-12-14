#!/usr/bin/env node

/**
 * Setup Verification Script
 * This script checks if your environment is properly configured to run the application.
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 Verifying Compass Application Setup...\n');

let hasErrors = false;
let hasWarnings = false;

// Check Node.js version
console.log('✓ Checking Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
if (majorVersion !== 20 && majorVersion !== 22) {
  console.error(`  ❌ Node.js version ${nodeVersion} is not supported. Please use Node.js 20 or 22.`);
  hasErrors = true;
} else {
  console.log(`  ✓ Node.js ${nodeVersion} is supported`);
}

// Check if node_modules exists
console.log('\n✓ Checking dependencies...');
if (!fs.existsSync('./node_modules')) {
  console.error('  ❌ Dependencies not installed. Run: npm install');
  hasErrors = true;
} else {
  console.log('  ✓ Dependencies are installed');
}

// Check for environment configuration
console.log('\n✓ Checking environment configuration...');
const hasEnvLocal = fs.existsSync('./.env.local');
const hasEnvExample = fs.existsSync('./.env.example');

if (!hasEnvLocal) {
  console.warn('  ⚠️  No .env.local file found.');
  console.warn('     Copy .env.example to .env.local and set FIREBASE_PROJECT_ID');
  hasWarnings = true;
} else {
  const envContent = fs.readFileSync('./.env.local', 'utf-8');
  if (envContent.includes('your-project-id')) {
    console.warn('  ⚠️  .env.local still contains placeholder values');
    console.warn('     Update FIREBASE_PROJECT_ID with your actual project ID');
    hasWarnings = true;
  } else {
    console.log('  ✓ .env.local is configured');
  }
}

// Check Firebase configuration
console.log('\n✓ Checking Firebase/Genkit configuration...');
const configPath = './src/lib/genkit/genkit.config.ts';
if (fs.existsSync(configPath)) {
  const configContent = fs.readFileSync(configPath, 'utf-8');
  if (configContent.includes('REPLACE_WITH_YOUR_PROJECT_ID')) {
    console.error('  ❌ genkit.config.ts contains REPLACE_WITH_YOUR_PROJECT_ID');
    console.error('     Update with your actual Firebase project ID');
    hasErrors = true;
  } else if (configContent.includes('your-project-id') && !hasEnvLocal) {
    console.warn('  ⚠️  genkit.config.ts uses default project ID');
    console.warn('     Set FIREBASE_PROJECT_ID in .env.local');
    hasWarnings = true;
  } else {
    console.log('  ✓ Genkit configuration looks good');
  }
} else {
  console.error('  ❌ genkit.config.ts not found');
  hasErrors = true;
}

// Check gcloud authentication
console.log('\n✓ Checking Google Cloud authentication...');
try {
  execSync('gcloud auth application-default print-access-token', { 
    stdio: 'pipe',
    timeout: 5000 
  });
  console.log('  ✓ Google Cloud credentials are configured');
} catch (error) {
  console.warn('  ⚠️  Google Cloud credentials not found or expired');
  console.warn('     Run: gcloud auth application-default login');
  hasWarnings = true;
}

// Check required directories and files
console.log('\n✓ Checking project structure...');
const requiredPaths = [
  'src/app',
  'src/components',
  'src/lib',
  'src/data',
  'prompts',
  'package.json',
  'next.config.mjs',
];

requiredPaths.forEach(path => {
  if (!fs.existsSync(path)) {
    console.error(`  ❌ Missing: ${path}`);
    hasErrors = true;
  }
});

if (!hasErrors) {
  console.log('  ✓ All required files and directories present');
}

// Final summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ Setup verification FAILED - Please fix the errors above');
  process.exit(1);
} else if (hasWarnings) {
  console.warn('⚠️  Setup verification completed WITH WARNINGS');
  console.warn('   The app may work but some features might not function properly');
  console.log('\nNext steps:');
  console.log('  1. Configure your Firebase project ID');
  console.log('  2. Authenticate with gcloud');
  console.log('  3. Run: npm run dev');
  process.exit(0);
} else {
  console.log('✅ Setup verification PASSED!');
  console.log('\nYou can now run the application:');
  console.log('  npm run dev        - Start Next.js with Genkit UI');
  console.log('  npm run dev:next   - Start Next.js only');
  console.log('  npm run dev:genkit - Start Genkit UI only');
  process.exit(0);
}
