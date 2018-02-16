var gulp = require("gulp"),
    sass = require("gulp-sass"),
    plumber = require('gulp-plumber');
    // util         = require("gulp-util");

// Compile SCSS files to CSS
gulp.task("scss", function () {
    gulp.src("themes/al-2018/static/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            // outputStyle : "compressed"
        }))
        // .pipe(autoprefixer({
        //     browsers : ["last 20 versions"]
        // }))
        .pipe(gulp.dest("themes/al-2018/static/css"))
})

// Watch asset folder for changes
gulp.task("watch", ["scss"], function () {
    gulp.watch("themes/al-2018/static/scss/**/*", ["scss"])
})