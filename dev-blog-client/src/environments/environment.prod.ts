export const environment = {
  production: true,
  // apiUrl: 'http://localhost:3000/api',
  apiUrl: 'https://blog-dev-33836-default-rtdb.asia-southeast1.firebasedatabase.app',
  firebase: {
    projectId: 'blog-dev-33836',
    databaseURL: 'https://blog-dev-33836-default-rtdb.asia-southeast1.firebasedatabase.app'
  },
  geminiApiKey: (typeof process !== 'undefined' && (process?.env?.GEMINI_API_KEY || process?.env?.NG_APP_GEMINI_API_KEY)) || ''
};
