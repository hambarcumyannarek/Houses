
import gulp from 'gulp';
import concat from 'gulp-concat';
import autoPrefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import uglify from 'gulp-uglify';
import { deleteSync } from 'del';
import browserSync from 'browser-sync';
import gcmq from 'gulp-group-css-media-queries';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';

const sass = gulpSass(dartSass);

const path = {
    styles: {
        src: ['./src/css/home.scss', './src/css/style1.scss', './src/css/*.css'],
        dist: './dist/css'
    },

    htmls: {
        src: './src/*.html',
        dist: './dist'
    },
    scripts: {
        src: './src/js/*.js',
        dist: './dist/js'
    },
    images: {
        src: './src/images/**/*',
        dist: './dist/images'
    }
}

async function styles() {
        return gulp.src(path.styles.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(gcmq())
            .pipe(sourcemaps.init())
            .pipe(autoPrefixer({
                cascade: false
            }))
            .pipe(cleanCss({
                level: 2,
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(path.styles.dist))
            .pipe(browserSync.stream());
    }

async function htmls() {
    return gulp.src(path.htmls.src)
        .pipe(gulp.dest(path.htmls.dist))
        .pipe(browserSync.stream());
}

async function scripts() {
    return gulp.src(path.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.scripts.dist))
        .pipe(browserSync.stream())
}

async function images() {
    return gulp.src(path.images.src)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(path.images.dist))
}

async function clean() {
    return deleteSync(`./dist/*`)
}

async function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        tunnel: false
})

    gulp.watch('./src/css/*.scss', styles);
    gulp.watch(path.htmls.src, htmls);
    gulp.watch(path.scripts.src, scripts);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(htmls, styles, scripts, images)))
gulp.task('dev', gulp.series('build', 'watch'))

