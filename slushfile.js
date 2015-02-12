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
  if (gulp.args && gulp.args.length === 1) {
    return gulp.args[0];
  } else {
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

function injectScriptPath(done) {
  gulp.src('./app/index.html')
    .pipe(inject(gulp.src('./app/scripts/**/*.js'), {
      starttag: '<!-- build:js({.tmp,app}) scripts/scripts.js -->',
      endtag: '<!-- endbuild -->',
      relative: true
    }))
    .pipe(gulp.dest('./app'))
    .on('finish', function() {
      if (done !== undefined) {
        done();
      }
    })
}

function genTestFile(type, variables, done) {
  var file = [__dirname + '/tasktemplates/test/_' + type + '.js'];

  gulp.src(file)
    .pipe(template(variables))
    .pipe(rename(function(file) {
      file.basename = variables.name.toLowerCase();
    }))
    .pipe(conflict('./test/spec/' + type + 's'))
    .pipe(gulp.dest('./test/spec/' + type + 's'))
    .on('finish', function() {
      if (done !== undefined) {
        done();
      }
    });
}

///////////// EXPORT ////////////////////
module.exports = {
  _genTestFile: genTestFile
}

///////////// TASKS //////////////////////
gulp.task('default', function(done) {
  var name = getNameProposal();
  var frameworks = ['Bootstrap LESS', 'Foundation SASS'];

  if (gulp.args > 0 && gulp.args.length === 1) {
    name = gulp.args[0];
  }

  // inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'framework',
  //     message: 'What framework would you like to use',
  //     choices: frameworks,
  //   },
  //   {
  //     type: 'confirm',
  //     name: 'awesome',
  //     message: 'Would you like to include Font-Awesome?'
  //   }
  // ],
  // function(answers) {

  var answers = {};

  answers.slugAppName = _.slugify(name);
  answers.appName = _.camelize(answers.slugAppName);

  var files = [__dirname + '/templates/**'];
    // if (answers.framework === frameworks[0]) {
    //   files.push('!' + __dirname + '/templates/app/styles/main.scss');
    // }
    // else {
    //   files.push('!' + __dirname + '/templates/app/styles/main.less');
    // }

  gulp.src(files)
    .pipe(template(answers))
    .pipe(rename(function(file) {
      if (file.basename[0] === '_') {
        file.basename = '.' + file.basename.slice(1);
      }
    }))
    .pipe(conflict('./'))
    .pipe(gulp.dest('./'))
    .pipe(install())
    .on('finish', function() {
      done();
    });
  //});
});

gulp.task('view', function(done) {
  var name = getArgs();

  var file = [__dirname + '/tasktemplates/app/_view.html'];

  var variables = {
    name: name
  };

  gulp.src(file)
    .pipe(template(variables))
    .pipe(rename(function(file) {
      file.basename = name.toLowerCase();
    }))
    .pipe(conflict('./'))
    .pipe(gulp.dest('./app/views'))
    .on('finish', function() {
      done();
    });
});

gulp.task('controller', function(done) {
  var name = getArgs();

  var file = [__dirname + '/tasktemplates/app/_controller.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: _.capitalize(name)
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function(file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/controllers'))
      .pipe(gulp.dest('./app/scripts/controllers'))
      .on('finish', function() {
        done();

        injectScriptPath();
        genTestFile('controller', variables);
      });
  });
});

gulp.task('route', ['view', 'controller'], function(done) {
  var name = getArgs();

  var file = [__dirname + '/tasktemplates/app/_app.js'];

  var variables = {
    name: _.capitalize(name)
  };

  var appFile = gulp.src(file)
    .pipe(template(variables));

  gulp.src('./app/scripts/app.js')
    .pipe(inject(appFile, {starttag: '})', endtag: '.otherwise({',
      transform: function(filePath, file) {
        return file.contents.toString('utf8');
      }
    }))
    .pipe(gulp.dest('./app/scripts'))
    .on('finish', function() {
      done();
    });
});

gulp.task('directive', function(done) {
  var name = getArgs();

  var file = [__dirname + '/tasktemplates/app/_directive.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function(file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/directives'))
      .pipe(gulp.dest('./app/scripts/directives'))
      .on('finish', function() {
        done();

        injectScriptPath();
        genTestFile('directive', variables);
      });
  });
});

gulp.task('filter', function(done) {
  var name = getArgs();

  var file = [__dirname + '/tasktemplates/app/_filter.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function(file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/filters'))
      .pipe(gulp.dest('./app/scripts/filters'))
      .on('finish', function() {
        done();

        injectScriptPath();
        genTestFile('filter', variables);
      });
  });
});

gulp.task('service', function(done) {
  var name = getArgs();

  var file = [__dirname + '/tasktemplates/app/_service.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function(file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/services'))
      .pipe(gulp.dest('./app/scripts/services'))
      .on('finish', function() {
        done();

        injectScriptPath();
        genTestFile('service', variables);
      });
  });
});

gulp.task('factory', function(done) {
  var name = getArgs();

  var file = [__dirname + '/tasktemplates/app/_factory.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function(file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/services'))
      .pipe(gulp.dest('./app/scripts/services'))
      .on('finish', function() {
        done();

        injectScriptPath();
        genTestFile('service', variables);
      });
  });
});

gulp.task('constant', function(done) {
  var name = getArgs();

  var file = [__dirname + '/tasktemplates/app/_constant.js'];

  getAppName(function(appName) {
    var variables = {
      appName: appName,
      name: name
    };

    gulp.src(file)
      .pipe(template(variables))
      .pipe(rename(function(file) {
        file.basename = name.toLowerCase();
      }))
      .pipe(conflict('./app/scripts/services'))
      .pipe(gulp.dest('./app/scripts/services'))
      .on('finish', function() {
        done();

        injectScriptPath();
        genTestFile('service', variables);
      });
  });
});
