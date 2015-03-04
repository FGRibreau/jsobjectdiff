'use strict';
var fs = require('fs');
var vm = require('vm');
var _ = require('lodash');

var PRE = '(function (Bringr) {'; // @todo make this configurable
var POST = 'return Bringr;})({});'; // @todo make this configurable

module.exports = {
  /**
   * @param  {Array[Object]} files
   * @return {Array}
   */
  compare: function (files) {
    var filesObjects = files.map(function (obj) {
      var fileContent = PRE + fs.readFileSync(obj.filepath).toString('utf8') + POST;
      return obj.extract(eval(fileContent));
    });

    var filesKeys = filesObjects.map(function (obj) {
      return Object.keys(obj);
    });

    return _.union(_.difference.apply(_, filesKeys), _.difference.apply(_, filesKeys.reverse()));
  }
};
