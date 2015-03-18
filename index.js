'use strict';
var fs = require('fs');
var _  = require('lodash');

var OBJECT;

module.exports = {
  /**
   * @param  {Array[Object]} files
   * @return {Array}
   */
  compare: function (pre, files, post) {
    var filesObjects = files.map(function (obj) {
      var fileContent = pre + fs.readFileSync(obj).toString('utf8') + post;
      return obj.extract(eval(fileContent));
    });

    var filesKeys = filesObjects.map(function (obj) {
      return Object.keys(obj);
    });

    return _.union(_.difference.apply(_, filesKeys), _.difference.apply(_, filesKeys.reverse()));
  }
};
