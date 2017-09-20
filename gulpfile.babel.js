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
import { log } from 'gulp-util'

const config = {
    cssInput: ['dist2/app.css'],
    static: ['static/**/*', 'index.html'],
    dist: 'dist2'
}

gulp.task('default', (cb) => {
   runSequence('static', 'rollup', 'styles', cb)
});

gulp.task('static', () => {
    return gulp.src(config.static, {
        base: '.'
    }).pipe(gulp.dest(config.dist))
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
        .pipe(purifycss([rollupConfig.output.file]))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(gulp.dest(config.dist))
})

gulp.task('devStyles', () => {
    return gulp.src(config.cssInput)
        .pipe(postcss([
            autoprefixer({browsers: ['last 1 version']}),
        ]))
        .pipe(gulp.dest(config.dist))
})

gulp.task('dev', ['static'], () => {
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

        case 'BUNDLE_START':
            log(`Bundles '${chalk.cyan( event.input )}' → '${chalk.cyan( event.output.map( relativeId ).join( ', ' ) )}' ...`)
            break;

        case 'BUNDLE_END':
            log(`Created '${chalk.green( event.output.map( relativeId ).join( ', ' ) )}' in ${chalk.magenta(ms(event.duration))}`)
            gulp.start('static')
            gulp.start('devStyles')
            break;

        case 'END':
            log('Waiting for changes...')
     }
    })

    return gulp.src(config.dist)
        .pipe(webserver({
            livereload: {
              enable: true,
              port: process.env.LIVE_RELOAD_PORT || 35729
            },
            fallback: 'index.html',
            open: false,
            port: process.env.PORT || 8000
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

function relativeId(id) {
	return relative(process.cwd(), id);
}
