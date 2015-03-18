'use strict';
var jsobjectDiff = require('../');
var fs = require('fs');
var t = require('chai').assert;
var json = JSON.parse(fs.readFileSync('test.json', 'utf8'));


describe('jsobject-diff', function () {
  describe('compare(files) with two files', function () {
    it('should return an error if the files are not matching', function (done) {
      var files = json.files.map(function (fileTab) {
        return {
          filepath: fileTab[0],
          objectpath: fileTab[1].split('.'),
          extract: function (object) {
            function findObject(object, path, i) {
              if (i < path.length - 1) {
                return findObject(object[path[i]], path, ++i);
              }
              return object[path[i]];
            }
            return findObject(object, this.objectpath, 0);
          }
        };
      });
      t.deepEqual(jsobjectDiff.compare(json.pre, files, json.post), ["SEARCH_TEMPLATE_INTRO", "SEARCH_SOURCES_RESERVED_INTRO"]);
      done();
    });
  });
});
