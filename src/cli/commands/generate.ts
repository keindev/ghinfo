import { Arguments } from 'yargs';

import Builder from '../../Builder.js';

type IArguments = Arguments<{ dir: string; type: string }>;

const generate = async ({ dir, type }: IArguments): Promise<void> => {
  const builder = new Builder(dir, type);

  await builder.generate();
};

export default {
  command: 'generate',
  desc: 'Generate .ghinfo file',
  showInHelp: true,
  builder: {
    dir: {
      string: true,
      alias: 'd',
      description: 'Directory with media files',
      default: 'media',
    },
    type: {
      string: true,
      alias: 't',
      description: 'Repository content type',
      default: '',
    },
  },
  handler: (args: IArguments): Promise<void> => generate(args),
};
