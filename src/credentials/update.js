import fs from 'fs';
import path from 'path';

export const update = (name, options, command) => {
  const credentialsPath = path.join(import.meta.dirname, '../../', 'db', 'credentials.json');

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  const credential = credentials.find((credential) => credential.name === name);

  if (!credential) {
    command.error('Credential not found');
  }

  credential.storeUrl = options.store_url;
  credential.storeCode = options.store_code;
  credential.apiKey = options.api_key;

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2));
};
