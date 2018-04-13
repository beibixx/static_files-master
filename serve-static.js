var fs = require('fs');

module.exports = StaticServer; 

function StaticServer() {
  this.rootPath;
}

StaticServer.prototype.setRoot = function(rootPath) {
  var rootStats = fs.statSync(rootPath);
  if (!rootStats.isDirectory()) {
      throw new Error('must configure root to be a directory');
  }

  this.rootPath = rootPath;
}

StaticServer.prototype.requestHandler = function(req, res) {

  var reqPath = req.params[0];
  var reqPathParts = this.pathParts(reqPath);
  var resourceLocation = this.concatAbsolutePath(reqPath);

  fs.stat(resourceLocation, (err, stats) => {
    if (err) {
      console.log('err', err);
      res.send('file not found');
      return;
    }

    if (stats.isFile()) {
      res.sendFile(resourceLocation, { root: __dirname });   
      return;
    } 


    var currentDirectory = new Directory(resourceLocation, reqPath);

    currentDirectory.build((err, files, directories) => {
      res.status(200).render('explorer', {
        pathParts: reqPathParts,
        files: files,
        directories: directories
      });
    });
  });
}

StaticServer.prototype.concatAbsolutePath = function(reqPath) {
  if (!this.rootPath) {
    throw new Error('must configure root path prior to handling request');
  }
  
  return this.rootPath + '/' + reqPath;
}

StaticServer.prototype.pathParts = function(reqPath) {
  var lastIdx = reqPath.lastIndexOf('/');
  
  if (lastIdx === -1) {
    return {
      current: reqPath.length ? reqPath : 'root',
      prevPath: '/'
    }
  } 
  
  var currentName = reqPath.slice(lastIdx);
  var prevPath = reqPath.slice(0, lastIdx);

  return {
    current: currentName,
    prevPath: '/' + prevPath
  }
} 

StaticServer.prototype.buildDirectory = function(path, callback) {
  var currentDirectory = new Directory(path);
  currentDirectory.build(callback);
}

function Directory(path, linkPath) {
  this.path = path;
  this.linkPath = linkPath;
  this.resourceNames;
  this.files = [];
  this.directories = [];
}

Directory.prototype.build = function(callback) {
  fs.readdir(this.path, (err, resourceNames) => {
    this.resourceNames = resourceNames;
    this.definePaths(resourceNames, callback);
  });
};

Directory.prototype.definePaths = function(resourceNames, callback) {
  this.resourceNames.forEach((resourceName) => {
    var resourcePath = this.path + '/' + resourceName;
    fs.stat(resourcePath, (err, stats) => {
      if (err) {
        console.log('error', err);
        callback(err);
        return;
      }
      
      var bucket = stats.isDirectory() ? this.directories : this.files;
      
      var resourceObject = {
        name: resourceName,
        url: this.buildUrl(this.linkPath, resourceName)
      };

      bucket.push(resourceObject);

      var statsComplete = this.files.length + this.directories.length === this.resourceNames.length;
     
      if (statsComplete) {
        callback(null, this.files, this.directories);
      }
      
    });
  });
}

Directory.prototype.buildUrl = function(directoryPath, resourceName) {
  return directoryPath.length ? '/' + directoryPath + '/' + resourceName : resourceName;
}