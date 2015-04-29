# jsobjectdiff [![Build Status](https://drone.io/github.com/FGRibreau/jsobjectdiff/status.png)](https://drone.io/github.com/FGRibreau/jsobjectdiff/latest) [![Deps](https://david-dm.org/FGRibreau/jsobjectdiff.png)](https://david-dm.org/FGRibreau/jsobjectdiff) [![Version](http://badge.fury.io/js/jsobjectdiff.png)](https://david-dm.org/FGRibreau/jsobjectdiff)
----------------------------

Ensure that two JavaScript files containing objects have the same keys and display differences.

We use it at @Bringr for diffing i18n files.

### Setup

```shell
npm install jsobjectdiff -g
```

<p align="center">
<img src="https://cloud.githubusercontent.com/assets/138050/7396618/d95fbfe4-eea2-11e4-95a5-10e728402354.gif" />
</p>


### Usage

```shell
$ jsobjectdiff

config argument is required

Usage: node jsobjectdiff [options]

Options:
   -c, --config   JSON configuration path
```

Where the configuration file must be something like:

```javascript
{
  "pre": "(function (Bringr) {",
  "post": "return Bringr;})({});",
  "files": [{
    "filePath": "./fixtures/en_US.js",
    "objectPath": "i18n.en_US"
  }, {
    "filePath": "./fixtures/fr_FR.js",
    "objectPath": "i18n.fr_FR"
  }]
}
```

* pre/post: javacript code that will wrap the file content in order to yield the object
* files: an array of files to compare along with their object path

### Output sample

```shell
  The file ./fixtures/en_US.js have 1 key(s) added line(s) : 6
  Keys : SEARCH_TEMPLATE_INTRO
  The file ./fixtures/fr_FR.js have 1 key(s) added line(s) : 6
  Keys : SEARCH_SOURCES_RESERVED_INTRO
```

### Contributors

Laura Felix <laura.felix.loratus@gmail.com>, Nicolas Bruel <bruel.nicolas85@gmail.com>, authored by Francois-Guillaume Ribreau <npm@fgribreau.com> (http://fgribreau.com/)
