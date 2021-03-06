import figures from 'figures';
import fs from 'fs';
import globby from 'globby';
import gh from 'parse-github-url';
import path from 'path';
import readPkg, { PackageJson } from 'read-pkg';
import { UpdateManager } from 'stdout-update';

import { AvailableMediaFile, IGitHubInfo } from './types';

const TIMEOUT = 80;
const INDENT = 2;

const manager = UpdateManager.getInstance();
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export default class Builder {
  #dir: string;
  #type: string;
  #message = '';
  #timer: NodeJS.Timeout | null = null;
  #frame = 0;

  constructor(dir: string, type: string) {
    this.#dir = path.relative(process.cwd(), dir);
    this.#type = type;
  }

  async generate(): Promise<void> {
    this.start();

    try {
      const paths = await globby([`${this.#dir}/**/*.*`], { gitignore: false });
      const pkg = await readPkg({ normalize: false });
      const url = typeof pkg.repository === 'object' ? pkg.repository.url : pkg.repository;

      if (url) {
        const git = gh(url);

        if (git && git.repo) {
          if (paths.length) {
            const data = JSON.stringify(this.build(paths, pkg, git.repo), null, INDENT);

            await fs.promises.writeFile(path.relative(process.cwd(), '.ghinfo'), data);
          }

          this.end();
        } else {
          throw new Error('Invalid package repository url!');
        }
      } else {
        throw new Error('Package repository is undefined!');
      }
    } catch (error) {
      this.error(error);
    }
  }

  build(paths: string[], pkg: PackageJson, repo: string): IGitHubInfo {
    const { name, version, description, homepage, keywords } = pkg;
    const availableFiles = Object.values(AvailableMediaFile);

    if (!name) throw new Error('Package name is undefined!');
    if (!version) throw new Error('Package name is undefined!');
    if (!description) throw new Error('Package name is undefined!');

    return {
      name,
      version,
      description,
      keywords,
      repo,
      type: this.#type,
      links: {
        git: `https://github.com/${repo}`,
        ...(pkg.isPrivate ? {} : { npm: `https://www.npmjs.com/package/${name}` }),
        ...(homepage ? { homepage } : {}),
      },
      files: paths.reduce((acc, filePath) => {
        const { name: fileName } = path.parse(filePath);

        return ~availableFiles.indexOf(fileName as AvailableMediaFile) ? { ...acc, [fileName]: filePath } : acc;
      }, {}),
    };
  }

  private start(): void {
    manager.hook();

    this.#timer = setInterval(() => {
      manager.update([`${frames[(this.#frame = ++this.#frame % frames.length)]} process: ${this.#message}`]);
    }, TIMEOUT);
  }

  private end(msg = [`${figures.tick} .ghinfo created!`]): void {
    if (this.#timer) {
      clearInterval(this.#timer);
      manager.update(msg, 0);
      manager.unhook(false);
    }
  }

  private error(error: Error): never {
    this.end([`${figures.cross} Error!`]);

    throw error;
  }
}
