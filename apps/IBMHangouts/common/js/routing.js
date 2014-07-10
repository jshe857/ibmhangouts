var hangouts = angular.module('Hangouts', [ 'ionic','snap' ]).config(
		[ '$stateProvider', '$urlRouterProvider',
				function($stateProvider, $urlRouterProvider) {
					$stateProvider.state('login', {
						url : '/login',
						templateUrl : 'templates/login.html',
						controller : 'LoginCtrl'
					}).state('register',{
						url : '/register',
						templateUrl : 'templates/register.html',
						controller : 'RegisterCtrl'
					})
					.state('newsfeed', {
						url: '/newsfeed',
						abstract : true,
						templateUrl : 'templates/newsfeed.html',
//						controller : 'NewsfeedCtrl'
					}).state('newsfeed.main', {
						url: '/main',
						views: {
							'feed-content': {
								templateUrl: "templates/feed-content.html",
								controller : 'NewsfeedCtrl'
							},
							'feed-details': {
								templateUrl: "templates/feed-details.html",
								controller : 'DetailsCtrl'
							}
						}
					}).state('create', {
						url: '/create',
						templateUrl : 'templates/create.html',
						controller : 'CreateCtrl'
					}).state('edit', {
						url: '/edit',
						templateUrl : 'templates/create.html',
						controller : 'EditCtrl'
					}).state('mapsearch', {
						url: '/mapsearch',
						templateUrl : 'templates/mapsearch.html',
						controller : 'MapCtrl'
					}).state('settings', {
						url: '/settings',
						templateUrl: 'templates/settings.html',
					}).state('wizard', {
						url : '/wizard',
						abstract : true,
						templateUrl : 'templates/wizard.html',	
						controller : 'WizardCtrl'
					}).state('wizard.setup', {
						url : "/setup",
						views : {
							'search-wizard' : {
								templateUrl : "templates/tagSetup.html",
								controller : 'TagSearchCtrl'
							},
							'profile-wizard' : {
								templateUrl : "templates/tagSetup.html",
								controller : 'TagProfileCtrl'
							}
						}
					});
					$urlRouterProvider.otherwise('/login');
				} ]);