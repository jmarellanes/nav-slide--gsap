import { src, dest, watch, series, parallel } from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';

const autoReload = browserSync.create();

export const serve = (done) => {
  autoReload.init({
    server: {
      baseDir: './',
    },
  });
  done();
};

export const reload = (done) => {
  autoReload.reload();
  done();
};

export const styles = () => {
  return src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('css'))
    .pipe(autoReload.stream());
};

export const watchForChanges = () => {
  watch('*.html', series(reload));
  watch('scss/**/*.scss', series(styles, reload));
  watch('js/**/*.js', series(reload));
};

export const dev = series(parallel(styles), serve, watchForChanges);

export default dev;
