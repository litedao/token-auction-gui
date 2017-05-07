var exec = require('child_process').exec

var gulp = require('gulp')
var gulpsync = require('gulp-sync')(gulp)
var ghPages = require('gulp-gh-pages')
var surge = require('gulp-surge')

// npm run build

// meteor-build-client ../build
gulp.task('build-meteor', function (cb) {
  // setting ROOT_URL with --url so that we can use Meteor.absoluteUrl() from within the app
  exec('meteor-build-client ../dist --path ""', {cwd: 'frontend'}, function (err, res, failed) {
    if (err) {
      console.log(err)
    } else if (failed) {
      process.stdout.write(failed)
    } else {
      process.stdout.write('\u001b[32mMeteor build completed!\n')
    }
    cb(err)
  })
})

// gh-pages
gulp.task('deploy-gh-pages', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages())
})

gulp.task('deploy-surge', [], function () {
  return surge({
    project: './dist',
    domain: 'token-auction-gui.surge.sh'
  })
})

gulp.task('deploy', gulpsync.sync(['build-meteor', 'deploy-gh-pages']))
gulp.task('deploy-test', gulpsync.sync(['build-meteor', 'deploy-surge']))
gulp.task('build', ['build-meteor'])
gulp.task('default', ['build'])
