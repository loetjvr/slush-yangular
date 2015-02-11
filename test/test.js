var gulp = require('gulp');
var mockGulpDest = require('mock-gulp-dest')(gulp);
var chai = require('chai');
var fs = require('fs');

var slushfile = require('../slushfile');

chai.should();

describe('slush-yangular', function() {
  before(function() {
    process.chdir(__dirname);
  });

  describe('default generator', function() {
    before(function(done) {
      gulp.start('default').once('stop', function() {
        done();
      });
    });

    it('should put all project files in current working directory',
      function() {
      mockGulpDest.cwd().should.equal(__dirname);
      mockGulpDest.basePath().should.equal(__dirname);
    });

    it('should add dot files to project root', function(done) {
      mockGulpDest.assertDestContains([
        '.bowerrc',
        '.jscsrc',
        '.editorconfig',
        '.gitignore',
        '.jshintrc'
      ]);

      done();
    });

    it('should add bower.json and package.json to project root',
      function(done) {
      mockGulpDest.assertDestContains([
        'package.json',
        'bower.json'
      ]);

      done();
    });

    it('should add a gulpfile to project root', function(done) {
      mockGulpDest.assertDestContains('gulpfile.js');

      done();
    });

    it('should add a karma config file to project root', function(done) {
      mockGulpDest.assertDestContains('test/karma.conf.js');

      done();
    });

    it('should add an index.html to the app folder', function(done) {
      mockGulpDest.assertDestContains('app/index.html');

      done();
    });

    it('should add a JavaScript app module definition file by default',
      function(done) {
      mockGulpDest.assertDestContains('app/scripts/app.js');

      done();
    });

    it('should add a JavaScript main controller',
      function(done) {
      mockGulpDest.assertDestContains('app/scripts/controllers/main.js');

      done();
    });

    it('should add a LESS file',
      function(done) {
      mockGulpDest.assertDestContains('app/styles/main.less');

      done();
    });
  });

  describe('generator task function', function() {
    before(function(done) {
      slushfile._genTestFile('controller', {appName: 'test', name: 'test'},
        function() {
        done();
      });
    });

    it('genTestFile should add Javascript file to test',
      function(done) {
      mockGulpDest.basePath().should.equal(__dirname +
        '/test/spec/controllers');
      mockGulpDest.assertDestContains('test.js');

      done();
    });
  });

  describe('generator task', function() {
    before(function(done) {
      gulp.args = ['test'];

      fs.writeFile('bower.json', '{"name": "test"}', function(err) {
        if (err) {
          throw err;
        }

        done();
      });
    });

    it('view should add HTML file to views', function(done) {
      gulp.start('view').once('stop', function() {
        mockGulpDest.basePath().should.equal(__dirname + '/app/views');
        mockGulpDest.assertDestContains('test.html');

        done();
      });
    });

    it('controller should add Javascript file to controllers', function(done) {
      gulp.start('controller').once('stop', function() {
        mockGulpDest.basePath().should.equal(__dirname +
          '/app/scripts/controllers');
        mockGulpDest.assertDestContains('test.js');

        done();
      });
    });

    it('directive should add Javascript file to directives', function(done) {
      gulp.start('directive').once('stop', function() {
        mockGulpDest.basePath().should.equal(__dirname +
          '/app/scripts/directives');
        mockGulpDest.assertDestContains('test.js');

        done();
      });
    });

    it('filter should add Javascript file to filters', function(done) {
      gulp.start('filter').once('stop', function() {
        mockGulpDest.basePath().should.equal(__dirname +
          '/app/scripts/filters');
        mockGulpDest.assertDestContains('test.js');

        done();
      });
    });

    it('service should add Javascript file to services', function(done) {
      gulp.start('service').once('stop', function() {
        mockGulpDest.basePath().should.equal(__dirname +
          '/app/scripts/services');
        mockGulpDest.assertDestContains('test.js');

        done();
      });
    });

    it('factory should add Javascript file to services', function(done) {
      gulp.start('factory').once('stop', function() {
        mockGulpDest.basePath().should.equal(__dirname +
          '/app/scripts/services');
        mockGulpDest.assertDestContains('test.js');

        done();
      });
    });

    it('constant should add Javascript file to services', function(done) {
      gulp.start('constant').once('stop', function() {
        mockGulpDest.basePath().should.equal(__dirname +
          '/app/scripts/services');
        mockGulpDest.assertDestContains('test.js');

        done();
      });
    });

    after(function() {
      fs.unlink('bower.json', function(err) {
        if (err) {
          throw err;
        }
      });
    });
  });
});
