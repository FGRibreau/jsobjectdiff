jsobject-diff
-------------

Ensure that two JS files containing objects have the same keys.

We use it at @Bringr for  diffing traduction files.


#CONFIGURATION:

make this configurable

var PRE = '(function (Bringr) {';
var POST = 'return Bringr;})({});';


#USE:

compare two file
'en_US', 'fr_FR'
return an error if the files are not matching


#RETURN:

difference between two file

Diff: [
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
]