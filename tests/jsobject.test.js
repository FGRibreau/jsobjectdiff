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

      var output = jsobjectDiff.compare(json.pre, files, json.post);
      t.deepEqual(output, [
        {
          "file": {
            "path": "./fixtures/en_US.js",
            "object": "i18n.en_US",
            "keys": [
            "SEARCH_SOURCES_RESERVED",
            "SEARCH_TEMPLATE_INTRO",
            "SEARCH_SOURCES"
          ]
          },
          "comparedTo": [
            {
              "file": {
                "path": "./fixtures/fr_FR.js",
                "object": "i18n.fr_FR",
                "keys": [
                "SEARCH_SOURCES_RESERVED",
                "SEARCH_SOURCES_RESERVED_INTRO",
                "SEARCH_SOURCES"
              ]
              },
              "added": [
                {
                  "key": "SEARCH_TEMPLATE_INTRO",
                  "index": 1
              }
            ],
              "removed": [
                {
                  "key": "SEARCH_SOURCES_RESERVED_INTRO",
                  "index": 1
              }
            ]
          }
        ]
      }, {
          "file": {
            "path": "./fixtures/fr_FR.js",
            "object": "i18n.fr_FR",
            "keys": [
            "SEARCH_SOURCES_RESERVED",
            "SEARCH_SOURCES_RESERVED_INTRO",
            "SEARCH_SOURCES"
          ]
          },
          "comparedTo": [
            {
              "file": {
                "path": "./fixtures/en_US.js",
                "object": "i18n.en_US",
                "keys": [
                "SEARCH_SOURCES_RESERVED",
                "SEARCH_TEMPLATE_INTRO",
                "SEARCH_SOURCES"
              ]
              },
              "added": [
                {
                  "key": "SEARCH_SOURCES_RESERVED_INTRO",
                  "index": 1
              }
            ],
              "removed": [
                {
                  "key": "SEARCH_TEMPLATE_INTRO",
                  "index": 1
              }
            ]
          }
        ]
      }
      ]);
      done();
    });
  });
});
