import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { command } from './commands/generate.js';

const argv = yargs(hideBin(process.argv));

argv.command(command).demandCommand().wrap(argv.terminalWidth()).help().parse();
