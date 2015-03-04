'use strict';
var jsobjectDiff = require('../');
var p = require('path');
var t = require('chai').assert;

describe('jsobject-diff', function () {
  describe('compare(files) with two files', function () {
    it('should return an error if the files are not matching', function (done) {
      var files = ['en_US', 'fr_FR'].map(function (lang) {
        return {
          filepath: p.resolve(__dirname, './fixtures', lang + '.js'),
          extract: function (object) {
            return object.i18n[lang];
          }
        };
      });
      t.deepEqual(jsobjectDiff.compare(files), ["SEARCH_TEMPLATE_INTRO", "SEARCH_SOURCES_RESERVED_INTRO"]);
      done();
    });
  });
});
