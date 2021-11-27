export enum AvailableMediaFile {
  Icon = 'icon',
  Logo = 'logo',
  Demo = 'demo',
  Preview = 'social-preview',
}

export interface ILinks {
  git?: string;
  homepage?: string;
  npm?: string;
}

export type IFiles = {
  [key in AvailableMediaFile]?: string;
};

export interface IGitHubInfo {
  description: string;
  files: IFiles;
  keywords?: string[];
  links: ILinks;
  name: string;
  repo: string;
  type?: string;
  version: string;
}
