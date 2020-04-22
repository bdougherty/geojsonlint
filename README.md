# geojsonlint
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbdougherty%2Fgeojsonlint.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbdougherty%2Fgeojsonlint?ref=badge_shield)


> A better CLI for [@mapbox/geojsonhint](https://github.com/mapbox/geojsonhint).

## Features

* Supports multiple files with globbing
* Supports scanning directories
* Formats output with [eslint-formatter-pretty](https://github.com/sindresorhus/eslint-formatter-pretty)

## Install

```
$ npm install --global geojsonlint
```

## Usage

```
$ geojsonlint --help

  A better CLI for @mapbox/geojsonhint.

  Usage:
    geojsonlint [options] <file|glob>...

  Options:
    --disable-precision-warning  Disable the precision warning for coordinates.

  Examples:
    geojsonlint *.geojson
    geojsonlint files/
    geojsonlint --disable-precision-warning precise.geojson
```

Supports any combination of files and globs, in addition to directories (see [globby](https://github.com/sindresorhus/globby#globbing-patterns) for a quick cheat-sheet).

## License

MIT © [Brad Dougherty](https://brad.is)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbdougherty%2Fgeojsonlint.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbdougherty%2Fgeojsonlint?ref=badge_large)