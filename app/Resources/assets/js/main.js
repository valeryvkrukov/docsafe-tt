//

angular
	.module('test-app', [
		'ui.router',
		'ngStorage',
		'ngCookies',
		'ngAnimate', 
		'ngAria', 
		'ngMaterial'
	])
	.config(function($provide, $httpProvider) {
		$provide.factory('httpApiInterceptor', function($q, $state, $localStorage) {
			return {
				request: function(config) {
					config.headers = config.headers || {};
					if ($localStorage.token) {
						config.headers.Authorization = 'Bearer ' + $localStorage.token;
					}
					return config;
				},
				responseError: function(response) {
					console.log('RESPONSE ERR: ', response.status);
					$state.transitionTo('login');
					if (response.status === 401 || response.status === 403) {
						$state.transitionTo('login');
					}
					return $q.reject(response);
				}
			};
		});
		$httpProvider.interceptors.push('httpApiInterceptor');
	})
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
		$stateProvider
			.state('home', {
				url: '/',
				template: require('html-loader!../templates/home.html'),
				controller: 'HomeController',
				controllerAs: 'ctrl'
			})
			.state('login', {
				url: '/login',
				template: require('html-loader!../templates/login.html'),
				controller: 'LoginController',
				controllerAs: 'ctrl'
			})
			.state('register', {
				url: '/sign-up',
				template: require('html-loader!../templates/register.html'),
				controller: 'RegisterController',
				controllerAs: 'ctrl'
			})
		;
	})
	.run(function() {
		
	})
;