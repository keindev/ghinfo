import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import generate from './commands/generate.js';

const argv = yargs(hideBin(process.argv));
const { command, description, builder, handler } = generate;

argv.command(command, description, builder, handler).demandCommand().wrap(argv.terminalWidth()).help().parse();
