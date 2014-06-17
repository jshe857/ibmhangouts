var hangouts = angular.module('Hangouts', [ 'ionic' ]).config(
		[ '$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {
					$stateProvider.state('login', {
						url : '/login',
						templateUrl : 'templates/login.html',
						controller : 'LoginCtrl'
					}).state('newsfeed', {
						url: '/newsfeed',
						templateUrl : 'templates/newsfeed.html',
						controller : 'NewsfeedCtrl'
					}).state('create', {
						url: '/create',
						templateUrl : 'templates/create.html',
						controller : 'CreateCtrl'
					}).state('mapsearch', {
						url: '/mapsearch',
						templateUrl : 'templates/mapsearch.html',
						controller : 'MapCtrl'
					}).state('settings', {
						url: '/settings',
						templateUrl: 'templates/settings.html',
						controller : 'SettingsCtrl'
					}).state('wizard', {
						url : '/wizard',
						abstract : true,
						templateUrl : 'templates/wizard.html',	
					}).state('wizard.setup', {
						url : "/setup",
						views : {
							'search-wizard' : {
								templateUrl : "templates/tagSetup.html",
								controller : 'TagCtrl'
							},
							'profile-wizard' : {
								templateUrl : "templates/tagSetup.html",
								controller : 'TagCtrl'
							},
							'settings-wizard' : {
								templateUrl : "templates/settings.html",
							}
						}
					});
					$urlRouterProvider.otherwise('/login');
				} ]);