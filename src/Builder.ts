import figures from 'figures';
import { promises as fs } from 'fs';
import { glob } from 'glob';
import { Package } from 'package-json-helper';
import gh from 'parse-github-url';
import path from 'path';
import UpdateManager from 'stdout-update';

import { AvailableMediaFile, IGitHubInfo } from './types.js';

const TIMEOUT = 80;
const INDENT = 2;
const manager = UpdateManager.getInstance();
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const GLOB_OPTIONS = { dot: true, strict: true, nodir: true };

/** Generate .ghinfo files with repo, npm package and media information */
export class Builder {
  readonly #dir: string;
  #frame = 0;
  readonly #message = '';
  #timer: NodeJS.Timeout | null = null;
  readonly #type: string;

  /**
   * @param dir - Directory with media files
   * @param type - Repository content type
   */
  constructor(dir: string, type: string) {
    this.#dir = dir;
    this.#type = type;
  }

  /** create or rewrite .ghinfo file */
  async generate(): Promise<void> {
    this.start();

    try {
      const paths = glob.sync(`${this.#dir}/**/*.*`, GLOB_OPTIONS);
      const pkg = new Package();

      await pkg.read();

      if (pkg.repository?.url) {
        const git = gh(pkg.repository?.url);

        if (git && git.repo) {
          await fs.writeFile('.ghinfo', JSON.stringify(this.build(paths, pkg, git.repo), null, INDENT));

          this.end();
        } else {
          throw new Error('Invalid package repository url!');
        }
      } else {
        throw new Error('Package repository is undefined!');
      }
    } catch (error) {
      if (error instanceof Error) {
        this.end([`${figures.cross} Error!`]);

        throw error;
      }
    }
  }

  /**
   * Build .ghinfo file structure
   * @param paths - media file paths
   * @param pkg - package.json content
   * @param repo - repository name
   * @returns .ghinfo content
   */
  private build(paths: string[], pkg: Package, repo: string): IGitHubInfo {
    const { name, version, description, homepage } = pkg;
    const availableFiles = Object.values(AvailableMediaFile);

    if (!name) throw new Error('Package name is undefined!');
    if (!version) throw new Error('Package name is undefined!');
    if (!description) throw new Error('Package name is undefined!');

    return {
      name,
      version,
      description,
      keywords: [...pkg.keywords.values()],
      repo,
      type: this.#type,
      links: {
        homepage,
        git: `https://github.com/${repo}`,
        ...(pkg.private ? {} : { npm: `https://www.npmjs.com/package/${name}` }),
      },
      files: paths.reduce((acc, filePath) => {
        const { name: fileName } = path.parse(filePath);

        return ~availableFiles.indexOf(fileName as AvailableMediaFile) ? { ...acc, [fileName]: filePath } : acc;
      }, {}),
    };
  }

  private end(msg = [`${figures.tick} .ghinfo created!`]): void {
    if (this.#timer) {
      clearInterval(this.#timer);
      manager.update(msg, 0);
      manager.unhook(false);
    }
  }

  private start(): void {
    manager.hook();

    this.#timer = setInterval(() => {
      manager.update([`${frames[(this.#frame = ++this.#frame % frames.length)]} process: ${this.#message}`]);
    }, TIMEOUT);
  }
}

export default Builder;
