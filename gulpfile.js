// define gulp and the plugins
const gulp = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  connect = require("gulp-connect"),
  sourcemaps = require("gulp-sourcemaps"),
  minify = require("gulp-minify"),
  fileinclude = require("gulp-file-include");

// define paths
const paths = {
  dist: {
    html: "dist/",
    css: "dist/css",
    js: "dist/js",
  },
  src: {
    html: ["src/template/**/*.html", "!src/template/**/_*.html"],
    scss: "src/scss/**/*.scss",
    js: "src/js/**/*.js",
  },

  watch: {
    html: "src/template/**/*.html",
  },
};

// HTML task
function html() {
  return gulp
    .src(paths.src.html)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(paths.dist.html))
    .pipe(connect.reload());
}

// CSS Min Task
function cssMin() {
  return gulp
    .src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(concat("main.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(connect.reload());
}

// Css Task
function css() {
  return gulp
    .src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(connect.reload());
}

// Js Task
function js() {
  return gulp
    .src(paths.src.js)
    .pipe(concat("script.js"))
    .pipe(minify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(connect.reload());
}

// Create simple server and activate reload pages plugin
function connects() {
  connect.server({
    root: "./dist",
    port: 1111,
    livereload: true,
  });
}

// Watching Changes of files and apply Tasks
function watch() {
  gulp.watch(paths.watch.html, html);
  // gulp.watch(paths.src.scss, gulp.parallel(css, cssMin));
  gulp.watch(paths.src.scss, css);
  gulp.watch(paths.src.js, js);
}

// Exports Tasks to can access it from other files or environments
exports.connects = connects;
exports.watch = watch;
exports.html = html;
exports.css = css;
exports.cssMin = cssMin;
exports.js = js;

// Default Task
exports.default = gulp.parallel(connects, watch, html, css, js);
