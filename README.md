slush-yangular
==============

> A [slush](http://slushjs.github.io) generator for AngularJS using Bootstrap and Less.

## Installation

Install `slush-yangular` globally:

```bash
npm install -g slush-yangular
```

Remember to install `slush` globally as well, if you haven't already:

```bash
npm install -g slush
```

## Usage

Create a new folder for your project:

```bash
mkdir my-angular-app
```

Run the generator from within the new folder:

```bash
cd my-angular-app

slush yangular
```

#### Tasks

To create additional script and files based on the angular generator for Yeoman:

```bash
slush yangular:view name
```

```bash
slush yangular:controller name
```

```bash
slush yangular:route name
```

```bash
slush yangular:directive name
```

```bash
slush yangular:filter name
```

```bash
slush yangular:service name
```

```bash
slush yangular:factory name
```

```bash
slush yangular:constant name
```

### Gulpfile

The gulpfile is based on the gulp-webapp generator for Yeoman

#### Development

To start developing in your new generated project run:

```bash
gulp serve
```

Then head to `http://localhost:9000` in your browser.

The `serve` tasks starts a static file server, which serves your AngularJS application, and a watch task which watches your files for changes and lints, builds and injects them into your index.html accordingly.


#### Production ready build

To make the app ready for deploy to production run:

```bash
gulp build
```

Now you have a `./dist` folder with all your scripts and stylesheets concatenated and minified, also third party libraries installed with bower will be concatenated and minified into `vendors.min.js` and `vendors.min.css` respectively.
