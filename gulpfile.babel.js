import gulp from 'gulp'
import runSequence from 'run-sequence'
import purifycss from 'gulp-purifycss'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import { rollup, watch as rollupWatch, VERSION as rollupVersion } from 'rollup'
import rollupConfig from './rollup.config'
import source from 'vinyl-source-stream'
import { Readable } from 'stream'
import chalk from 'chalk'
import { relative } from 'path'
import ms from 'pretty-ms'
import webserver from 'gulp-webserver'

const config = {
    cssInput: ['dist2/.tmp/app.css'],
    static: ['static/**/*', 'index.html']
}

gulp.task('default', (cb) => {
   runSequence('static', 'rollup', 'styles', cb)
});

gulp.task('static', () => {
    gulp.src(config.static, {
        base: '.'
    }).pipe(gulp.dest('dist2'))
})

gulp.task('rollup', () => {
    return rollupStream(rollupConfig)
        .pipe(gulp.dest('.'));
})

gulp.task('styles', () => {
    return gulp.src(config.cssInput)
        .pipe(postcss([
            autoprefixer({browsers: ['last 1 version']}),
            cssnano()
        ]))
        .pipe(purifycss(['./dist2/app.js']))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(gulp.dest('./dist2'))
})

gulp.task('dev', ['static'], () => {
  gulp.watch(config.cssInput, ['styles'])
  gulp.watch(config.static, ['static'])
  const watcher = rollupWatch(rollupConfig)
  watcher.on('event', event => {
    switch (event.code) {
        case 'FATAL':
            console.error('Fatal', event.error)
            process.exit(1)
            break

        case 'ERROR':
            console.error('Error', event.error)
            break;

        case 'START':
            console.log(chalk.underline(`rollup v${rollupVersion}`))
            break;

        case 'BUNDLE_START':
            console.log(chalk.cyan(`bundles ${chalk.bold( event.input )} → ${chalk.bold( event.output.map( relativeId ).join( ', ' ) )}...`))
            break;

        case 'BUNDLE_END':
            console.log(chalk.green(`created ${chalk.bold( event.output.map( relativeId ).join( ', ' ) )} in ${chalk.bold(ms(event.duration))}`))
            break;

        case 'END':
            console.log('\nwaiting for changes...')
     }
    })


    gulp.src('dist2')
        .pipe(webserver({
            livereload: true,
            fallback: 'index.html',
            open: false
        }));
})

function rollupStream(config) {
    const stream = new Readable()
    stream._read = function() {  }
    rollup(config)
        .then(bundle => bundle.generate({ format: config.output.format }))
        .then(({ code, map }) => {
            stream.push(code)
            if(map) {
                stream.push('\n//# sourceMappingURL=')
                stream.push(map.toUrl())
            }
            stream.push(null)
        }).catch(reason => setImmediate(() => stream.emit('error', reason)))
    return stream.pipe(source(config.output.file))
}

function relativeId ( id ) {
	return relative( process.cwd(), id );
}
