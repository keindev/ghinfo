// @see https://github.com/facebook/jest/issues/9430
import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';

// eslint-disable-next-line node/no-extraneous-import
import { jest } from '@jest/globals';

import Builder from '../Builder';

jest.useFakeTimers();

const PACKAGE = JSON.stringify({
  name: 'test-package',
  version: '1.0.0',
  description: 'Some description',
  keywords: ['test', 'jest'],
  repository: {
    type: 'git',
    url: 'git+https://github.com/keindev/ghinfo.git',
  },
});

describe('Builder', () => {
  it('Generate .ghinfo file', async () => {
    const builder = new Builder(process.cwd(), 'test');
    let output = '';

    jest
      .spyOn(fs, 'readFile')
      .mockImplementation(filePath =>
        Promise.resolve(path.basename(filePath as string) === 'package.json' ? PACKAGE : '')
      );

    jest.spyOn(fs, 'writeFile').mockImplementation((filePath, data) => {
      if (path.basename(filePath as string) === '.ghinfo') output = data as string;

      return Promise.resolve();
    });

    jest.spyOn(glob, 'sync').mockImplementation(() => ['media/logo.svg', 'media/logo.jpg', 'media/demo.gif']);

    await builder.generate();

    expect(output).toMatchSnapshot();
  });
});
