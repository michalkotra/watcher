var gulp = require('gulp');
var gutil = require('gulp-util')
var duration = require('gulp-duration')

var dirSync = require( 'gulp-directory-sync' );

var corpoSrc =  'C://Users//J-LABS//code//bnp_cib//wars//fortis-corpo-cib-web//src//main//webapp//'
var corpoDest = 'C://IBM//WebSphere//AppServer//profiles//fbpl//installedApps//JLABS-5LC7K32Cell01//fortis-corpo-cib-app.ear//fortis-corpo-cib-web-2.1.war//';

var adkSrc =  	'C://Users//J-LABS//code//bnp_cib//wars//fortis-corpo-adk-web//src//main//webapp//';
var adkDest = 	'C://IBM//WebSphere//AppServer//profiles//fbpl//installedApps//JLABS-5LC7K32Cell01//fortis-corpo-adk-web-2.1_war.ear//fortis-corpo-adk-web-2.1.war//';


gulp.task( 'adk', function() {
    return gulp.src( '' )
        .pipe(dirSync( adkSrc, adkDest, { printSummary: true, nodelete: true } ))
        .on('error', gutil.log);
} );

gulp.task( 'corpo', function() {
    return gulp.src( '' )
        .pipe(dirSync( corpoSrc, corpoDest, { printSummary: true, nodelete: true } ))
        .on('error', gutil.log);
} );


gulp.task('sync', function() {
  setInterval(function() {
		gulp.start('adk');
  }, 5000)
});
