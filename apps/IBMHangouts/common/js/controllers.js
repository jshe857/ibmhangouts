//var pushNotification;
//var restURL = 'http://ibmhangouts.stage1.ng.bluemix.net/ibmhangouts/v1/apps/61c079f0-c710-47c8-afc1-7948d7b970a4'
//
//document.addEventListener("deviceready", function() {
//	pushNotification = window.plugins.pushNotification;
//});

var months = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP',
		'OCT', 'NOV', 'DEC' ];
var fullMonths = [ 'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December' ];

var weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday" ];

hangouts
		.controller(
				'MainCtrl',
				function($rootScope, $http, EventParser) {
					//mock data
					$rootScope.events = [ new EventParser({
						title : 'Smarter Cloud',
						creatorEmail : 'john@au1.ibm.com',
						creatorName: 'John Smith2',
						end : '14:12',
						start : "2014-02-23T13:12",
						location : 'NH11.04',
						tags : [ 'smart', 'cloud' ],
						description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					})];
					$rootScope.user = {
							email: 'johnsmith@au1.ibm.com',
							name: 'John Smith'
					};
					// IBMBaaS.initializeSDK('61c079f0-c710-47c8-afc1-7948d7b970a4').then(
					// function() {
					//
					// });
				})
		.controller('LoginCtrl', function($scope, $http, $state) {
			$scope.validate = function(user) {
				// more authentication to be implemented
				if (true) {
					$state.go('wizard.setup');
				} else {
					alert("Invalid Login");
				}
			};
			$scope.getImage = function(switchUser) {
				if (!switchUser) {
					return {
						'background' : 'url(images/example.jpg)',
						'background-position' : 'center',
						'background-size' : '100% auto'
					};
				} else {
					return {
						'background' : 'url(images/newuser.png)',
						'background-position' : 'center',
						'background-size' : '100% auto'
					};
				}

			};
		})
		.controller('TagSearchCtrl', function($rootScope, $scope, TagListFactory) {
			$scope.tagSearch = new TagListFactory();
			$scope.deleteSearchTag = function(tagName) {
				$scope.tagSearch.remove(tagName);
			};
			$scope.addToSearch = function(input) {
				$scope.tagSearch.add(input);
			};
			$scope.tagDescriptor = "You Are Interested In:";
		})
		.controller('TagProfileCtrl', function($rootScope, $scope, TagListFactory) {
			$scope.tagSearch = new TagListFactory();
			$scope.deleteSearchTag = function(tagName) {
				$scope.tagSearch.remove(tagName);
			};
			$scope.addToSearch = function(input) {
				$scope.tagSearch.add(input);
			};
			$scope.tagDescriptor = "You Are An Expert In:";
		})
		.controller(
				'NewsfeedCtrl',
				function($rootScope, $scope, $ionicSideMenuDelegate) {
					$scope.toggleLeft = function() {
						$ionicSideMenuDelegate.toggleLeft();
					};
					$scope.toggleRight = function() {
						$ionicSideMenuDelegate.toggleRight();
					};
					$scope.showDetails = function(index) {
						$rootScope.currEvent = $scope.events[index];
						$ionicSideMenuDelegate.toggleRight();
					};

				})
		.controller('DetailsCtrl', function($scope, $ionicSideMenuDelegate) {
			$scope.toggleRight = function() {
				$ionicSideMenuDelegate.toggleRight();
			};
			$scope.mapToggleText="Show Map";
			$scope.toggleMap = function() {
				if ($scope.showMap) {
					$scope.mapToggleText = "Show Map";
				} else {
					$scope.mapToggleText = "Hide Map";
				}
				$scope.showMap = !$scope.showMap;
			};
			
		})
		.controller('SettingsCtrl', function($scope,$state) {
			$scope.goBack = function() {
				$state.go('newsfeed.main');

			};
		})
		.controller(
				'CreateCtrl',
				function($scope, $rootScope, $state, GMapsFactory, EventParser) {
					$scope.event = {};
					var maps = new GMapsFactory();
					maps.searchbox(document
							.getElementById('autocomplete-search'), $scope.event);
					$scope.save = function() {
						if (typeof $scope.user != 'undefined') {
							$scope.event.creatorName = $scope.user.name;
							$scope.event.creatorEmail = $scope.user.email;
							$scope.attending = 1;
							$rootScope.events.push(new EventParser($scope.event));
							$state.go('newsfeed.main');	
						} else {
							alert('No User Logged In!');
							$state.go('login');
						}
					};

				}).controller('EditCtrl',function($scope, $rootScope, $state, GMapsFactory, EventParser) {
					$scope.event = angular.copy($rootScope.currEvent.toForm());
					$scope.save = function() {
						var index =  $rootScope.events.indexOf($rootScope.currEvent);
						$rootScope.events[index] = (new EventParser($scope.event));
						$state.go('newsfeed.main');	
					};
					var maps = new GMapsFactory();
					maps.searchbox(document
							.getElementById('autocomplete-search'), $scope.event);
				});