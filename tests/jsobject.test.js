'use strict';

var jsobjectDiff = require('../');
var fs = require('fs');
var t = require('chai').assert;
var path = require('path');
var json = require('./test.json');

describe('jsobject-diff', function () {
  describe('compare(files) with two files', function () {
    it('should return an error if the files are not matching', function (done) {
      var files = json.files.map(function (fileTab) {
        var absolutePath = path.resolve(__dirname, fileTab.filePath);
        return {
          filePath: fileTab.filePath,
          objectPath: fileTab.objectPath,
          content: fs.readFileSync(absolutePath, 'utf-8')
        };
      });

      t.deepEqual(jsobjectDiff.compare(json.pre, files, json.post), [{
        "filePath": "./fixtures/en_US.js",
        "objectPath": "i18n.en_US",
        "comparedTo": [{
          "filePath": "./fixtures/fr_FR.js",
          "objectPath": "i18n.fr_FR",
          "inPlus": [{
            "key": "SEARCH_TEMPLATE_INTRO",
            "index": 1
          }],
          "inLess": [{
            "key": "SEARCH_SOURCES_RESERVED_INTRO",
            "index": 1
          }]
        }]
      }, {
        "filePath": "./fixtures/fr_FR.js",
        "objectPath": "i18n.fr_FR",
        "comparedTo": [{
          "filePath": "./fixtures/en_US.js",
          "objectPath": "i18n.en_US",
          "inPlus": [{
            "key": "SEARCH_SOURCES_RESERVED_INTRO",
            "index": 1
          }],
          "inLess": [{
            "key": "SEARCH_TEMPLATE_INTRO",
            "index": 1
          }]
        }]
      }]);
      done();
    });
  });
});
