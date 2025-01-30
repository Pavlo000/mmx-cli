#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';

import { credentialsService } from '../src/credentials/index.js';
import { flexService } from '../src/flex/index.js';

const program = new Command();

const usage = chalk.hex
  ('#800080')
  (
    `mmx command <options>
      ${boxen(
        chalk.green('\n Miva Merchant Flex Components CLI \n'),
        { padding: 1, borderColor: 'green', dimBorder: true }
      )}
  `);


// credentials
const credentials = new Command();
// commands
const saveCredentials = new Command();
const listCredentials = new Command();
const removeCredentials = new Command();
const updateCredentials = new Command();

saveCredentials
  .name('save')
  .description('Save credentials')
  .argument('<name>')
  .requiredOption('-u, --store_url <store_url>', 'Store URL')
  .requiredOption('-s, --store_code <store_code>', 'Store code')
  .requiredOption('-k, --api_key <api_key>', 'API key')
  .option('--http_basic_auth_username [username]', 'HTTP Basic Auth username')
  .option('--http_basic_auth_password [password]', 'HTTP Basic Auth password')
  .action(credentialsService.save);


listCredentials
  .name('list')
  .description('List credentials')
  .action(credentialsService.list);

removeCredentials
  .name('remove')
  .description('Remove credentials')
  .argument('<name>')
  .action(credentialsService.remove);

updateCredentials
  .name('update')
  .description('Update credentials')
  .argument('<name>')
  .requiredOption('-u, --store_url <store_url>', 'Store URL')
  .requiredOption('-s, --store_code <store_code>', 'Store code')
  .requiredOption('-k, --api_key <api_key>', 'API key')
  .option('--http_basic_auth_username [username]', 'HTTP Basic Auth username')
  .option('--http_basic_auth_password [password]', 'HTTP Basic Auth password')
  .action(credentialsService.update);

credentials
  .name('credentials')
  .description('Manage credentials')
  .addCommand(saveCredentials)
  .addCommand(listCredentials)
  .addCommand(removeCredentials)
  .addCommand(updateCredentials);


// flex
const flex = new Command();
// commands
const checkoutFlex = new Command();

checkoutFlex
  .name('checkout')
  .description('Checkout flex components')
  .argument('<name>')
  .action(flexService.checkout);

flex
  .name('flex')
  .description('Manage flex components')
  .addCommand(checkoutFlex);


// program
program
  .name('mmx')
  .description('Miva Merchant Flex Components CLI')
  .version('1.0.0')
  .addCommand(credentials)
  .addCommand(flex)
  .usage(usage);


program.parse();
