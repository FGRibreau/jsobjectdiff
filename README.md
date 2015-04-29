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

* post: retourne l'objet
* files: an array of (placer les fichiers a comparer dans le dossier fixtures)



### USE

compare two file
'en_US', 'fr_FR'
return an error if the files are not matching


### RETURN

difference between two file

```javascript
  The file ./fixtures/en_US.js have 1 key(s) added line(s) : 6
  Keys : SEARCH_TEMPLATE_INTRO
  The file ./fixtures/fr_FR.js have 1 key(s) added line(s) : 6
  Keys : SEARCH_SOURCES_RESERVED_INTRO

```

### CONTRIBUTORS

Laura Felix <laura.felix.loratus@gmail.com>, Nicolas Bruel <bruel.nicolas85@gmail.com>, authored by Francois-Guillaume Ribreau <npm@fgribreau.com> (http://fgribreau.com/)