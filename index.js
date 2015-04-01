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

    var filesKeys = filesObjects.map(function(obj, index) {
      return {
        filePath: files[index].filePath,
        objectPath: files[index].objectPath,
        fileKeys: Object.keys(obj)
      }
    });

    return filesKeys.map(function(obj) {
      return {
        filePath: obj.filePath,
        objectPath: obj.objectPath,
        comparedTo: _.flatten(filesKeys.map(function(otherObj){
          if(obj.filePath == otherObj.filePath && obj.objectPath == otherObj.objectPath){
            return []
          }
          return {
            filePath: otherObj.filePath,
            objectPath: otherObj.objectPath,
            inPlus: _.flatten(_.difference(obj.fileKeys, otherObj.fileKeys).map(function(differenceKeys){
              return _.flatten(obj.fileKeys.map(function(objKey, index){
                if(objKey == differenceKeys){
                  return {
                    key: objKey,
                    index: index
                  }
                }
                return []
              }))
            })),
            inLess: _.flatten(_.difference(otherObj.fileKeys, obj.fileKeys).map(function(differenceKeys){
              return _.flatten(otherObj.fileKeys.map(function(objKey, index){
                if(objKey == differenceKeys){
                  return {
                    key: objKey,
                    index: index
                  }
                }
                return []
              }))
            }))
          }
        }))
      }
    })
  }
};
