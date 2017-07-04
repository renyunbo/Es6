var gulp = require("gulp");  
var babel = require("gulp-babel");  
var less = require('gulp-less');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');

gulp.task('less', function(){
  return gulp.src('app/**/*.less')
    .pipe(less()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('app/**/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task("babel", function () {  
    return gulp.src("app/**/*.js")// ES6 源码存放的路径  
        .pipe(babel({  
            presets: ['es2015']  
        }))  
        .pipe(gulp.dest("dist")); //转换成 ES5 存放的路径  
});  

gulp.task('watch', ['browserSync', 'less','babel','useref'], function (){
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  // Other watchers
})

