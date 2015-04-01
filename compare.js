'use strict';
var _ = require('lodash');
var objectPathTraverser = require('object-path');
var assert = require('assert');

module.exports = {
  /**
   * @param  {Array[Object]} files
   * @return {Array}
   */
  compare: function (pre, files, post) {
    return files.map(function (file) {
        assert.strictEqual(typeof file.objectPath, 'string');
        var fileContent = pre + file.content + post;
        return {
          path: file.filePath,
          object: file.objectPath,
          // @todo eval use a try/catch
          keys: Object.keys(objectPathTraverser.get(eval(fileContent), file.objectPath))
        };
      })
      .map(function (file, index, filesKeys) {
        return {
          file: file,
          comparedTo: filesKeys
            // skip files that are the same as `file`
            .filter(not(_.curry(areSameFiles)(file)))
            // compare `file` with each over files
            .map(function (otherFile) {
              return {
                file: otherFile,
                added: compareObject(file, otherFile),
                removed: compareObject(otherFile, file)
              };
            })
        };
      });
  }
};

function areSameFiles(a, b) {
  return a.path === b.path && a.object === b.object;
}

function not(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

function compareObject(otherObj, obj) {
  return _.difference(otherObj.keys, obj.keys).reduce(function (memo, differenceKeys) {
    return otherObj.keys.reduce(function (memo, objKey, index) {
      if (objKey === differenceKeys) {
        memo.push({
          key: objKey,
          index: index
        });
      }
      return memo;
    }, memo);
  }, []);
}
