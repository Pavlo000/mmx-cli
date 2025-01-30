import fs from 'fs';
import path from 'path';

export const remove = (name, options, command) => {
  const credentialsPath = path.join(import.meta.dirname, '../../', 'db', 'credentials.json');

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  const updatedCredentials = credentials.filter((credential) => credential.name !== name);

  fs.writeFileSync(credentialsPath, JSON.stringify(updatedCredentials, null, 2));
};
