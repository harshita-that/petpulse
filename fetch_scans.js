const fs = require('fs');

function getEnv(path) {
  try {
    const env = fs.readFileSync(path, 'utf8');
    const urlMatch = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
    const keyMatch = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);
    if (urlMatch && keyMatch) {
      return { url: urlMatch[1].trim(), key: keyMatch[1].trim() };
    }
  } catch (e) {}
  return null;
}

const env = getEnv('apps/web/.env.local') || getEnv('apps/web/.env');
if (!env) {
  console.error("No env found");
  process.exit(1);
}

fetch(`${env.url}/rest/v1/scans?select=id,status,error_message,created_at&order=created_at.desc&limit=3`, {
  headers: {
    'apikey': env.key,
    'Authorization': `Bearer ${env.key}`
  }
})
.then(r => r.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(console.error);
