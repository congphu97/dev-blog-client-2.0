const fs = require('fs');
const path = require('path');

const apiKey = (process.env.GEMINI_API_KEY || process.env.NG_APP_GEMINI_API_KEY || '').trim();
const prodEnvPath = path.resolve(__dirname, '../src/environments/environment.prod.ts');
const devEnvPath = path.resolve(__dirname, '../src/environments/environment.ts');

console.log('🔍 [set-env.js] Checking for GEMINI_API_KEY in environment...');

if (apiKey) {
  console.log(`🔑 [set-env.js] Found GEMINI_API_KEY (length: ${apiKey.length}, starts with: ${apiKey.substring(0, 8)}...)`);
  [prodEnvPath, devEnvPath].forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(
        /geminiApiKey:[\s\S]*?(?=[,\n\r}])/,
        `geminiApiKey: '${apiKey}'`
      );
      fs.writeFileSync(filePath, content);
      console.log(`✅ [set-env.js] Successfully injected GEMINI_API_KEY into ${path.basename(filePath)}`);
    }
  });
} else {
  console.warn('⚠️ [set-env.js] No GEMINI_API_KEY found in process.env. Skipping file injection.');
}


