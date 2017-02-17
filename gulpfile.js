var gulp = require('gulp');
var gutil = require('gulp-util');
var duration = require('gulp-duration');
var dirSync = require( 'gulp-directory-sync' );
var prompt = require( 'gulp-prompt' );
var fs = require('fs');

var src = {
	corpo: '//wars//fortis-corpo-cib-web//src//main//webapp//',
	retail: '//wars//fortis-retail-cib-web//src//main//webapp//',
	demo: '//wars//fortis-login-cib-web//src//main//webapp//ver//'
};

var dest = {
	corpo: '//fortis-corpo-cib-app.ear//fortis-corpo-cib-web-2.1.war//',
	retail: '//fortis-retail-cib-app.ear//fortis-retail-cib-web-2.1.war//',
	demo: '//fortis-retail-cib-app.ear//fortis-login-cib-web-2.1.war//ver//'
};

var run = {};

gulp.task('watch', function() {

	run = require('./config.json');

	setInterval(function() {
		gulp.start('sync');
	}, 5000)
});

gulp.task( 'sync', function() {
	return gulp.src( 'config.json' )
		.pipe(dirSync( run.demoSrc, run.demoDest, { printSummary: true, nodelete: true } ))
		.pipe(dirSync( run.retailSrc, run.retailDest, { printSummary: true, nodelete: true } ))
		.pipe(dirSync( run.corpoSrc, run.corpoDest, { printSummary: true, nodelete: true } ))
		.on('error', gutil.log);
} );


function checkIfDirectoryExists(directory) {
	try {
		fs.statSync(directory);
		return true;
	} catch(e) {
		gutil.log('\nLocation ' + directory + ' not exists\n Please enter directory again');
		return false;
	}
}

function gluePaths(config){

	var os = require('os');

	config.demoSrc = config.project + src.demo;
	config.demoDest = config.websphere + '//AppServer//profiles//fbpl//installedApps//' + os.hostname() + 'Cell01' + dest.demo;

	config.retailSrc = config.project + src.retail;
	config.retailDest = config.websphere + '//AppServer//profiles//fbpl//installedApps//' + os.hostname() + 'Cell01' + dest.retail;

	config.corpoSrc = config.project + src.corpo;
	config.corpoDest = config.websphere + '//AppServer//profiles//fbpl//installedApps//' + os.hostname() + 'Cell01' + dest.corpo;
}

gulp.task('configure', function() {
	return gulp.src('')
		.pipe(prompt.prompt([
			{
				type: 'input',
				name: 'websphere',
				message: 'What is your Websphere directory? (example - C://IBM//WebSphere)',
				validate: function(websphere){
					return checkIfDirectoryExists(websphere);
				}
			},
			{
				type: 'input',
				name: 'project',
				message: 'What is your project location? (example - C://Users//J-LABS//Projects//bnp_cib)',
				validate: function(websphere){
					return checkIfDirectoryExists(websphere);
				}
			}
		], function(config){
			gutil.log('Check config.json if everything is ok and run gulp again!');
			gluePaths(config);
			fs.writeFileSync('config.json', JSON.stringify(config));
		}));
});

gulp.task('default', function() {
	var configurationFile = './config.json';
	fs.existsSync(configurationFile) ? gulp.start('watch') : gulp.start('configure');
});
