<p align="center"><img src="https://cdn.jsdelivr.net/gh/tagproject/art/packages/ghinfo/banner.svg" alt="Package logo"></p>

<p align="center">
    <a href="https://github.com/keindev/ghinfo/actions"><img src="https://github.com/keindev/ghinfo/actions/workflows/build.yml/badge.svg" alt="Build Status"></a>
    <a href="https://codecov.io/gh/keindev/ghinfo"><img src="https://codecov.io/gh/keindev/ghinfo/branch/master/graph/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/ghinfo"><img alt="npm" src="https://img.shields.io/npm/v/ghinfo.svg"></a>
    <a href="https://github.com/tagproject/ts-package-shared-config"><img src="https://img.shields.io/badge/standard--shared--config-nodejs%2Bts-green?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAfCAYAAACh+E5kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJQSURBVHgB1VftUcMwDFU4/tMNyAZ0A7IBbBA2CExAmIBjApcJChO0TFA2SJkgMIGRyDNV3TSt26RN353OX/LHUyTZIdoB1tqMZcaS0imBDzxkeWaJWR51SX0HrJ6pdsJyifpdb4loq3v9A+1CaBuWMR0Q502DzuJRFD34Y9z3DXIRNy/QPWKZY27COlM6BtZZHWMJ3CkVa28KZMTJkDpCVLOhs/oL2gMuEhYpxeenPPah9EdczLkvpwZgnQHWnlNLiNQGYiWx5gu6Ehz4m+WNN/2i9Yd75CJmeRDXogbIFxECrqQ2wIvlLBOXaViuYbGQNSQLFSGZyOnulb2wadaGnyoSSeC8GBJkNDf5kloESAhy2gFIIPG2+ufUMtivn/gAEi+Gy4u6FLxh/qer8/xbLq7QlNh6X4mbtr+A3pylDI0Lb43YrmLmXP5v3a4I4ABDRSI4xjB/ghveoj4BCVm37JQADhGDgOA+YJ48TSaoOwKpt27aOQG1WRES3La65WPU3dysTjE8de0Aj8SsKS5sdS9lqCeYI08bU6d8EALYS5OoDW4c3qi2gf7f+4yODfj2DIcqdVzYKnMtEUO7RP2gT/W1AImxXSC3i7R7rfRuMT5G2xzSYzaCDzOyyzDeuNHZx1a3fOdJJwh28fRwwT1QY6Xzf7TvWG6ob/BIGPQ59ymUngRyRn2El6Fy5T7G0zl+JmoC3KRQXyT1xpfiJKIeAemzqBl6U3V5ocZNf4hHg61u223wn4nOqF8IzvF9IxCMkyfQ+i/lnnhlmW6h9+Mqv1SmQhehji4JAAAAAElFTkSuQmCC" alt="Standard Shared Config"></a>
</p>

CLI util for generating a GitHub project information file.

> The main purpose of creating a package is to save on the number of requests to the [GitHub GraphQL API](https://docs.github.com/en/graphql/overview/resource-limitations) to get information about the repository (for example, to display packages on your [website](https://keindev.com/projects))

## Install

```console
npm install ghinfo --save-dev
```

## Usage

```console
ghinfo generate -d media -t utils
```

Generate `.ghinfo` with logo, social-preview and package description:

```json
{
  "name": "ghinfo",
  "version": "2.0.3",
  "description": "CLI util for generating a GitHub project information file",
  "keywords": ["automated", "repo", "info", "cli", "github", "util"],
  "repo": "keindev/ghinfo",
  "type": "utils",
  "links": {
    "git": "https://github.com/keindev/ghinfo",
    "npm": "https://www.npmjs.com/package/ghinfo",
    "homepage": "https://github.com/keindev/ghinfo#readme"
  },
  "files": {
    "logo": "media/logo.svg",
    "social-preview": "media/social-preview.png"
  }
}
```

## API

Read the [API documentation](docs/api/index.md) for more information.
