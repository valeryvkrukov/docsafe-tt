//
'use strict';

angular
	.module('test-app')
	.factory('User', function($localStorage) {
		return {
	        getCurrentUser: function() {
				//return $localStorage.currentUser;
				return $localStorage.token;
	        },
	        setCurrentUser: function(currentUser) {
	        	$localStorage.currentUser = currentUser;
	        	return currentUser;
	        },
	        cleanCurrentUser: function() {
	        	delete $localStorage.token;
	        }
	    };
	})
	.factory('Auth', function($http, $state, $localStorage, User) {
		return {
			signIn: function(username, password) {
				$http.post('/api/login_check', {
					username: username,
					password: password
				}).then(function(resp) {
					if (resp.data.token) {
						$localStorage.token = resp.data.token;
						$state.transitionTo('home');
					} else {
						return resp.data.message ? resp.data.message : 'Something wrong...';
					}
				}, function(err) {
					console.log(err);
				})
			},
			signUp: function(username, password) {
				$http.post('/api/sign-up', {
					username: username,
					password: password
				}).then(function(resp) {
					if (resp.data.status == 'ok') {
						$state.transitionTo('login');
					}
				}, function(err) {
					console.log(err);
				});
			},
			signOut: function() {
				User.cleanCurrentUser();
				$state.transitionTo('login');
			}
		};
	})
;