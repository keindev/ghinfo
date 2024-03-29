import { ArgumentsCamelCase, CommandModule, Options } from 'yargs';

import Builder from '../../Builder.js';

export type IArguments = {
  dir: string;
  type: string;
};

const generate = async ({ dir, type }: IArguments): Promise<void> => {
  const builder = new Builder(dir, type);

  await builder.generate();
};

export const command: CommandModule<{ [key: string]: Options }, IArguments> = {
  command: 'generate',
  describe: 'Generate .ghinfo file',
  builder: {
    dir: { string: true, alias: 'd', description: 'Directory with media files', default: 'media' } satisfies Options,
    type: { string: true, alias: 't', description: 'Repository content type', default: '' } satisfies Options,
  },
  handler: (args: ArgumentsCamelCase<IArguments>): Promise<void> => generate(args),
};
