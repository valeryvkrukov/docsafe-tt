//
var Encore = require('@symfony/webpack-encore');

Encore
	.setOutputPath('web/front-app/')
	.setPublicPath('/front-app')
	.addEntry('js/app', './app/Resources/assets/js/main.js')
	.enableSassLoader()
	.createSharedEntry('vendor', [
		'angular',
		'angular-animate',
		'angular-aria',
		'angular-material',
		'angular-cookies',
		'ngstorage',
		'@uirouter/angularjs'
	])
	.addStyleEntry('css/angular-material', './node_modules/angular-material/angular-material.css')
	.addStyleEntry('css/styles', './app/Resources/assets/scss/app.scss')
	.enableSourceMaps(!Encore.isProduction())
	.cleanupOutputBeforeBuild()
	.enableBuildNotifications()
;

module.exports = Encore.getWebpackConfig();