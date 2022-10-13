# @sutton-signwriting/font-ttf
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sutton-signwriting/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![version](https://img.shields.io/npm/v/@sutton-signwriting/font-ttf)](https://www.npmjs.com/package/@sutton-signwriting/font-ttf)
[![npm downloads](https://img.shields.io/npm/dm/@sutton-signwriting/font-ttf)](https://npm-stat.com/charts.html?package=@sutton-signwriting/font-ttf&from=2019-12-09)

![SignWriting](./signwriting.png)

@sutton-signwriting/font-ttf is a javascript package for the browser that generates SVG and PNG images for individual symbols and complete signs using TrueType Fonts.  The package covers the entire set of the International SignWritnig Alphabet 2010 (ISWA 2010).

This package supports both Formal SignWriting in ASCII (FSW) and SignWriting in Unicode (SWU) character sets, along with the style string.  See [draft-slevinski-formal-signwriting](https://tools.ietf.org/id/draft-slevinski-formal-signwriting-09.html) for detailed specification.

> Author: https://SteveSlevinski.me  
> Channel: https://www.youtube.com/channel/UCXu4AXlG0rXFtk_5SzumDow  
> Sponsor: https://www.patreon.com/signwriting  
> Donate: https://paypal.me/signwriting

## Useful links

- Source: https://github.com/sutton-signwriting/font-ttf
- Distribution: https://unpkg.com/browse/@sutton-signwriting/font-ttf/
- Documentation: https://www.sutton-signwriting.io/font-ttf/
- Issue Tracker: https://github.com/sutton-signwriting/font-ttf/issues
- Online Discussion: https://gitter.im/sutton-signwriting/community

## Installation

## Install TrueType Font

The TrueType Fonts can be installed on Windows, Mac, and Linux.  For iOS, [two mobile configurations](https://github.com/Slevinski/signwriting_2010_fonts) are available. Installation is not possible on Android.

### Install with NPM
```
    npm install @sutton-signwriting/font-ttf
```

### Install with GIT
```
    # download package
    git clone https://github.com/sutton-signwriting/font-ttf.git

    # install dependencies
    cd font-ttf
    npm install

    # create project documentation
    npm run docs

    # create project files
    npm run build
```

## Usage

### Using as a module
```
    // import entire library
    import * as ttf from '@sutton-signwriting/font-ttf'

    // import individual module
    import {font} from '@sutton-signwriting/font-ttf'
```

### Using in the Browser

#### Local files
```
    // import entire library
    // available as ssw.ttf
    <script src="index.js"></script>

    // import individual module
    // available as ssw.ttf.font
    <script src="font/font.js"></script>
```

#### Unpkg
```
    // import entire library
    // available as ssw.ttf
    <script src="https://unpkg.com/@sutton-signwriting/font-ttf@1.4.2"></script>

    // import individual module
    // available as ssw.ttf.font
    <script src="https://unpkg.com/@sutton-signwriting/font-ttf@1.4.2/font/font.min.js"></script>
```

## Configure font for VS Code

File >> Preferences >> Settings

Search for "font family".  Append SuttonSignWritingOneD to the list of fonts.  Restart VS Code.

## License
MIT

## SignWriting General Interest
- SignWriting Website: https://signwriting.org/
- Sutton SignWriting Resources: https://www.sutton-signwriting.io/
- Wikipedia page: https://en.wikipedia.org/wiki/SignWriting
- Email Discussion: https://www.signwriting.org/forums/swlist/
- Facebook Group: https://www.facebook.com/groups/SuttonSignWriting/
