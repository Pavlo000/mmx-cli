import fs from 'fs';
import path from 'path';

export const list = (name, options, command) => {
  const credentialsPath = path.join(import.meta.dirname, '../../', 'db', 'credentials.json');

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  console.table(credentials);
};

