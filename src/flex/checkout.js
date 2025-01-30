import fs from 'fs';
import path from 'path';

export const checkout = (name, options, command) => {
  const credentialsPath = path.join(import.meta.dirname, '../../', 'db', 'credentials.json');

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  const credential = credentials.find((credential) => credential.name === name);

  if (!credential) {
    command.error('Credential not found');
  }


  fs.mkdirSync('.mmx', { recursive: true });
  fs.writeFileSync('.mmx/config.json', JSON.stringify(credential, null, 2));
};
