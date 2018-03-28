//

angular
	.module('test-app', [
		'ngMaterial'
	])
	.config(function() {
		console.log('CONFIG');
	})
	.run(function($log) {
		$log.debug('test-app run');
	})
;