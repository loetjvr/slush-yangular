var gulp = require('gulp');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var inject = require('gulp-inject');
var inquirer = require('inquirer');
var _ = require('underscore.string');
var rename = require('gulp-rename');
var data = require('gulp-data');

//////////// FUNCTIONS ///////////////////
function getNameProposal() {
  var path = require('path');
  
  try {
    return require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    return path.basename(process.cwd());
  }
}

function getArgs() {
  if (gulp.args.length > 0) {
    return gulp.args[0];
  }
  else {
    console.log('Please provide name');
    process.exit();
  }
}

function getAppName(callback) {
  gulp.src('./bower.json')
    .pipe(data(function(file) {
      var json = JSON.parse(file.contents.toString('utf8'));

      callback(json.name);
    }));
}

///////////// TASKS //////////////////////
gulp.task('default', function (done) {
  inquirer.prompt([
    {type: 'input', name: 'name', message: 'What do you want to name your AngularJS app?', default: getNameProposal()},
  ],
  function (answers) {
    answers.slugAppName = _.slugify(answers.name);
    answers.appName = _.camelize(answers.slugAppName);

    var files = [__dirname + '/templates/**'];
    
    return gulp.src(files)
      .pipe(template(answers))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('finish', function () {
        done();
      });
  });
});

gulp.task('view', function () {
  var name = getArgs();

  var file = [__dirname + '/task_templates/view.html'];
  
  var variables = {
    name: name
  };

  gulp.src(file)
    .pipe(template(variables))
    .pipe(rename(function (file) {
      file.basename = name.toLowerCase();
    }))
    .pipe(conflict('./'))
    .pipe(gulp.dest('./app/views'));
});

gulp.task('controller', function () {
  var name = getArgs();

  var file = [__dirname + '/task_templates/controller.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: _.capitalize(name)
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function (file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/controllers'))
      .pipe(gulp.dest('./app/scripts/controllers'))
      .on('finish', function() {
        gulp.src('./app/index.html')
          .pipe(inject(gulp.src('./app/scripts/**/*.js'), {starttag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->', endtag: '<!-- endbuild -->', relative: true}))
          .pipe(gulp.dest('./app'));
      });
  });
});

gulp.task('route', ['view', 'controller'], function () {
  var name = getArgs();

  var file = [__dirname + '/task_templates/app.js'];

  var variables = {
    name: _.capitalize(name)
  };

  var appFile = gulp.src(file)
    .pipe(template(variables));

  gulp.src('./app/scripts/app.js')
    .pipe(inject(appFile, {starttag: '})', endtag: '.otherwise({', transform: function (filePath, file) {
      return file.contents.toString('utf8');
    }}))
    .pipe(gulp.dest('./app/scripts'));
});

gulp.task('directive', function () {
  var name = getArgs();

  var file = [__dirname + '/task_templates/directive.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function (file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/directives'))
      .pipe(gulp.dest('./app/scripts/directives'))
      .on('finish', function() {
        gulp.src('./app/index.html')
          .pipe(inject(gulp.src('./app/scripts/**/*.js'), {starttag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->', endtag: '<!-- endbuild -->', relative: true}))
          .pipe(gulp.dest('./app'));
      });
  });
});

gulp.task('filter', function () {
  var name = getArgs();

  var file = [__dirname + '/task_templates/filter.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function (file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/filters'))
      .pipe(gulp.dest('./app/scripts/filters'))
      .on('finish', function() {
        gulp.src('./app/index.html')
          .pipe(inject(gulp.src('./app/scripts/**/*.js'), {starttag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->', endtag: '<!-- endbuild -->', relative: true}))
          .pipe(gulp.dest('./app'));
      });
  });
});

gulp.task('service', function () {
  var name = getArgs();

  var file = [__dirname + '/task_templates/service.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function (file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/services'))
      .pipe(gulp.dest('./app/scripts/services'))
      .on('finish', function() {
        gulp.src('./app/index.html')
          .pipe(inject(gulp.src('./app/scripts/**/*.js'), {starttag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->', endtag: '<!-- endbuild -->', relative: true}))
          .pipe(gulp.dest('./app'));
      });
  });
});

gulp.task('factory', function () {
  var name = getArgs();

  var file = [__dirname + '/task_templates/factory.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function (file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/services'))
      .pipe(gulp.dest('./app/scripts/services'))
      .on('finish', function() {
        gulp.src('./app/index.html')
          .pipe(inject(gulp.src('./app/scripts/**/*.js'), {starttag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->', endtag: '<!-- endbuild -->', relative: true}))
          .pipe(gulp.dest('./app'));
      });
  });
});

gulp.task('constant', function () {
  var name = getArgs();

  var file = [__dirname + '/task_templates/constant.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function (file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/services'))
      .pipe(gulp.dest('./app/scripts/services'))
      .on('finish', function() {
        gulp.src('./app/index.html')
          .pipe(inject(gulp.src('./app/scripts/**/*.js'), {starttag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->', endtag: '<!-- endbuild -->', relative: true}))
          .pipe(gulp.dest('./app'));
      });
  });
});