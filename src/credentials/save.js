import fs from 'fs';
import path from 'path';

export const save = (name, options, command) => {
  const credentialsPath = path.join(import.meta.dirname, '../../', 'db', 'credentials.json');

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  if (credentials.find((credential) => credential.name === name)) {
    command.error('Credential with this name already exists');
  }

  credentials.push({
    name,
    storeUrl: options.store_url,
    storeCode: options.store_code,
    apiKey: options.api_key,
    httpBasicAuthUsername: options.http_basic_auth_username,
    httpBasicAuthPassword: options.http_basic_auth_password
  });

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2));

  console.log('Credentials saved successfully');
};
