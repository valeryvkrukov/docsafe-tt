//
'use strict';

angular
	.module('test-app')
	.controller('HomeController', function($scope, $state, User) {
		var vm = this;
		vm.currentUser = null;
		vm.$onInit = function () {
			vm.currentUser = User.getCurrentUser();
		};
		vm.signOut = function() {
			User.cleanCurrentUser();
			$state.transitionTo('login');
		}
	})
	.controller('LoginController', function($scope, Auth) {
		var vm = this;
		vm.credentials = {
			username: '',
			password: ''
		};
		vm.signIn = function() {
			Auth.signIn(vm.credentials.username, vm.credentials.password);
		};
	})
	.controller('RegisterController', function($scope, Auth) {
		var vm = this;
		vm.credentials = {
			username: '',
			password: '',
			password_confirm: ''
		};
		vm.signUp = function() {
			Auth.signUp(vm.credentials.username, vm.credentials.password);
		};
	})
;