#jsobject-diff
-------------

Ensure that two JS files containing objects have the same keys.

We use it at @Bringr for diffing traduction files.

### What does ?

jsobject-diff permet de comparer la différence entre chaque clé de chaque objet, et l'affiche dans des tables


### CONFIGURATION

make this configurable

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

post: retourne l'objet
files: an array of 
placer les fichiers a comparer dans le dossier fixtures


### USE

compare two file
'en_US', 'fr_FR'
return an error if the files are not matching


### RETURN

difference between two file

```javascript
  {
    "filePath": "/www/jsobjectdiff/tests/test.json",
    "objectPath": "i18n.en_US",
    "inPlus": [
      "SEARCH_TEMPLATE_INTRO"
    ],
    "inLess": [
      "SEARCH_SOURCES_RESERVED_INTRO"
    ]
  },
  {
    "filePath": "/www/jsobjectdiff/tests/test.json",
    "objectPath": "i18n.fr_FR",
    "inPlus": [
      "SEARCH_SOURCES_RESERVED_INTRO"
    ],
    "inLess": [
      "SEARCH_TEMPLATE_INTRO"
    ]
  }
```