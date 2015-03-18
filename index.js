'use strict';
var _ = require('lodash');
var objectPath = require('object-path');
var assert = require('assert');

module.exports = {
  /**
   * @param  {Array[Object]} files
   * @return {Array}
   */
  compare: function (pre, files, post) {
    var filesObjects = files.map(function (file) {
      assert.strictEqual(typeof file.objectPath, 'string');
      var fileContent = pre + file.content + post;
      return objectPath.get(eval(fileContent), file.objectPath);
    });

    var filesKeys = filesObjects.map(function (obj) {
      return Object.keys(obj);
    });

    return _.union(_.difference.apply(_, filesKeys), _.difference.apply(_, filesKeys.reverse()));
  }
};
