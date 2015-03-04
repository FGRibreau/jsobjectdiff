'use strict';
var fs = require('fs');
var vm = require('vm');
var _  = require('lodash');

var json = {};

process.argv.forEach(function (val, index, array) {
  if(val = '--PRE'){
    json.PRE = array[++index];
  }

  if(val = '--POST'){
    json.POST = array[++index]
  }

  if(val = '--OBJECT_PATH'){
    paths = array[++index].split(",");
  }

});
var PRE   ; // @todo make this configurable
var POST  ; // @todo make this configurable
var OBJECT;

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
