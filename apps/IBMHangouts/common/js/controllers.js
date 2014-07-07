hangouts
		.controller(
				'MainCtrl',
				function($rootScope, $http, EventParser, UserService) {
					// mock data
					$rootScope.events = [ new EventParser(
							{
								title : "Smarter Cloud",
								username : "john@au1.ibm.com",
								name : "John Smith2",
								end : "14:12",
								start : "2014-02-23T13:12",
								location : "NH11.04",
								tags : [ "smart", "cloud" ],
								description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
							}) ];

					$rootScope.user = {
					};

				})
		.controller(
				'LoginCtrl',
				function($scope, $state, UserService,$rootScope) {
					delete $scope.user.password;
					$scope.validate = function(user) {
						if (user && user.username && user.password) {
							UserService.login(user.username, user.password)
									.success(function(data) {
										$rootScope.user = data;
										if (data.searchTags.length) {
											$state.go('newsfeed.main');
										} else {
											$state.go('wizard.setup');
										}
									}).error(function(status, data) {
										console.log(status);
										console.log(data);
										alert("Login Failed");
									});
						}
					};
					$scope.getImage = function(switchUser) {
						if (!switchUser) {
							return {
								'background' : 'url(images/newuser.png)',
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
		.controller(
				'RegisterCtrl',
				function($scope, UserService, $state) {
					$scope.newUser = {};
					$scope.submit = function(user) {
						delete $scope.newUser;
						UserService.register(user.email, user.pw, user.name)
						.success(function(data) {
							alert(data);
							$state.go('login');
						}).error(function(status, data) {
							console.log(status);
							console.log(data);
							alert("Registration Failed");
						});
					};
				})
		.controller('TagSearchCtrl', function($scope, TagListFactory) {
			$scope.user.searchTags = new TagListFactory($scope.user.searchTags);
			$scope.tags = $scope.user.searchTags;
			$scope.deleteTag = function(tagName) {
				$scope.tags.remove(tagName);
			};
			$scope.addToSearch = function(input) {
				$scope.tags.add(input);
			};
			$scope.tagDescriptor = "You Are Interested In:";
		})
		.controller('TagProfileCtrl', function($scope, TagListFactory) {
			$scope.user.profileTags = new TagListFactory($scope.user.profileTags);
			$scope.tags = $scope.user.profileTags;
			$scope.deleteTag = function(tagName) {
				$scope.tags.remove(tagName);
			};
			$scope.addToSearch = function(input) {
				$scope.tags.add(input);
			};
			$scope.tagDescriptor = "You Are An Expert In:";
		})
		.controller('NewsfeedCtrl',
				function($rootScope, $scope, $ionicSideMenuDelegate,EventService,EventParser) {
					EventService.retrieve($scope.user).success(function (data) {
						if (data) {
							$scope.events=[];
							for(var i =0; i<data.length;i++) {
								$scope.events.push(new EventParser(data[i]));
							}
						}
					});
					
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
		.controller('DetailsCtrl',
				function($scope, $ionicSideMenuDelegate, $ionicScrollDelegate) {
					$scope.toggleRight = function() {
						$ionicSideMenuDelegate.toggleRight();
					};
					$scope.mapToggleText = "Show Map";
					$scope.toggleMap = function() {
						if ($scope.showMap) {
							$scope.mapToggleText = "Show Map";
						} else {
							$scope.mapToggleText = "Hide Map";
						}
						$scope.showMap = !$scope.showMap;
						$ionicScrollDelegate.resize();
					};

				})
		.controller(
				'CreateCtrl',
				function($scope, $rootScope, $state, GMapsFactory,EventService) {
					$scope.createMode="Create";
					$scope.event = {};
					var maps = new GMapsFactory();
					maps.searchbox(document
							.getElementById('autocomplete-search'),
							$scope.event);
					$scope.save = function() {
							$scope.event.name = $scope.user.name;
							$scope.event.username = $scope.user.username;
							EventService.create($scope.event).success(function(data) {
								$state.go('newsfeed.main');
							}).error(function(data){
								alert(data);
								$state.go('newsfeed.main');
							});				
					};

				})
		.controller(
				'EditCtrl',
				function($scope, $rootScope, $state, GMapsFactory, EventService) {
					$scope.createMode="Edit";
					$scope.event = angular.copy($rootScope.currEvent.toForm());
					$scope.save = function() {
						EventService.update($scope.event).success(function(data) {
							$state.go('newsfeed.main');
						}).error(function(data){
							alert(data);
							$state.go('newsfeed.main');
						});			
						$state.go('newsfeed.main');
					};
					var maps = new GMapsFactory();
					maps.searchbox(document
							.getElementById('autocomplete-search'),
							$scope.event);
				}).controller('WizardCtrl',
				function($scope, $state, UserService) {
					$scope.update = function() {
						UserService.update($scope.user).success(function(data) {
							$state.go('newsfeed.main');
						}).error(function(data) {
							alert(data);
							$state.go('login');
						});
					};
				});