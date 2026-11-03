const fs = require('fs');
const path = require('path');

const apiKey = process.env.GEMINI_API_KEY || process.env.NG_APP_GEMINI_API_KEY || '';
const prodEnvPath = path.resolve(__dirname, '../src/environments/environment.prod.ts');
const devEnvPath = path.resolve(__dirname, '../src/environments/environment.ts');

if (apiKey) {
  [prodEnvPath, devEnvPath].forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(
        /geminiApiKey:\s*.*?,/,
        `geminiApiKey: '${apiKey}',`
      );
      fs.writeFileSync(filePath, content);
      console.log(`✅ [set-env.js] Injected GEMINI_API_KEY into ${path.basename(filePath)}`);
    }
  });
} else {
  console.log('ℹ️ [set-env.js] No GEMINI_API_KEY found in process.env, skipping injection.');
}

