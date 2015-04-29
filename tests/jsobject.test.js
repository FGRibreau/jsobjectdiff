'use strict';

var jsobjectDiff = require('../');
var fs = require('fs');
var t = require('chai').assert;
var path = require('path');
var json = require('./test.json');

describe('jsobject-diff', function() {
  describe('compare(files) with two files', function() {
    it('should return an error if the files are not matching', function(done) {
      var files = json.files.map(function(fileTab) {
        var absolutePath = path.resolve(__dirname, fileTab.filePath);
        return {
          filePath: fileTab.filePath,
          objectPath: fileTab.objectPath,
          content: fs.readFileSync(absolutePath, 'utf-8')
        };
      });

      var output = jsobjectDiff.compare(json.pre, files, json.post);
      t.deepEqual(output, [{
        "file": {
          "path": "./fixtures/en_US.js",
          "object": "i18n.en_US",
          "content": "/*global Bringr */\n'use strict';\n\n(Bringr.i18n = Bringr.i18n || {}).en_US = {\n  'SEARCH_SOURCES_RESERVED': 'Those sources are for our clients only and are not available during the test.<hr/><a class=\"btn btn-success\" href=\"//bringr.net/pricing-tarifs-bringr/\">Please choose a plan to use them.</a>',\n  'SEARCH_TEMPLATE_INTRO': 'Dear user,',\n  'SEARCH_SOURCES': 'Sources'\n};\n",
          "keys": [
            "SEARCH_SOURCES_RESERVED",
            "SEARCH_TEMPLATE_INTRO",
            "SEARCH_SOURCES"
          ]
        },
        "comparedTo": [{
          "file": {
            "path": "./fixtures/fr_FR.js",
            "object": "i18n.fr_FR",
            "content": "/*global Bringr */\n'use strict';\n\n(Bringr.i18n = Bringr.i18n || {}).fr_FR = {\n  'SEARCH_SOURCES_RESERVED': 'Ces sources sont réservées à nos clients et ne sont pas disponibles lors de la phase de test.<hr/><a class=\"btn btn-success\" href=\"//bringr.net/pricing-tarifs-bringr/\">Choisissez l\\'offre qui vous convient</a>',\n  'SEARCH_SOURCES_RESERVED_INTRO': 'Cher testeur',\n  'SEARCH_SOURCES': 'Sources'\n};\n",
            "keys": [
              "SEARCH_SOURCES_RESERVED",
              "SEARCH_SOURCES_RESERVED_INTRO",
              "SEARCH_SOURCES"
            ]
          },
          "added": [{
            "key": "SEARCH_TEMPLATE_INTRO",
            "line": 6
          }]
        }]
      }, {
        "file": {
          "path": "./fixtures/fr_FR.js",
          "object": "i18n.fr_FR",
          "content": "/*global Bringr */\n'use strict';\n\n(Bringr.i18n = Bringr.i18n || {}).fr_FR = {\n  'SEARCH_SOURCES_RESERVED': 'Ces sources sont réservées à nos clients et ne sont pas disponibles lors de la phase de test.<hr/><a class=\"btn btn-success\" href=\"//bringr.net/pricing-tarifs-bringr/\">Choisissez l\\'offre qui vous convient</a>',\n  'SEARCH_SOURCES_RESERVED_INTRO': 'Cher testeur',\n  'SEARCH_SOURCES': 'Sources'\n};\n",
          "keys": [
            "SEARCH_SOURCES_RESERVED",
            "SEARCH_SOURCES_RESERVED_INTRO",
            "SEARCH_SOURCES"
          ]
        },
        "comparedTo": [{
          "file": {
            "path": "./fixtures/en_US.js",
            "object": "i18n.en_US",
            "content": "/*global Bringr */\n'use strict';\n\n(Bringr.i18n = Bringr.i18n || {}).en_US = {\n  'SEARCH_SOURCES_RESERVED': 'Those sources are for our clients only and are not available during the test.<hr/><a class=\"btn btn-success\" href=\"//bringr.net/pricing-tarifs-bringr/\">Please choose a plan to use them.</a>',\n  'SEARCH_TEMPLATE_INTRO': 'Dear user,',\n  'SEARCH_SOURCES': 'Sources'\n};\n",
            "keys": [
              "SEARCH_SOURCES_RESERVED",
              "SEARCH_TEMPLATE_INTRO",
              "SEARCH_SOURCES"
            ]
          },
          "added": [{
            "key": "SEARCH_SOURCES_RESERVED_INTRO",
            "line": 6
          }]
        }]
      }]);
      done();
    });
  });
});