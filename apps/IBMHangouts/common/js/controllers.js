/*primary data objects stored on server
 * user: {
 * username: 'jeshen@au1.ibm.com',
 * password: '$2a$07$Yg1y9okh4jKDQ2Oh1/3sDe.bSuMKnlxNIQVvdRSYPoJrp1zIZvE02',
 * name: 'Jeff',
 * __v: 0,
 * location: 'QLD',
 * profileTags: [ 'TAG2', 'MOBILE' ],
 * searchTags: [ 'TAG1', 'CLOUD' ] }
 * }
 *
 * currEvent {
  _id: 53f2920eaf6d4d301f0721b1,
  title: 'Event',
  start: '1990-10-01T01:01',
  end: '02:00',
  location: 'Australia',
  description: 'Jason can\'t keep up',
  name: 'Jeff',
  username: 'jeshen@au1.ibm.com',
  __v: 0,
  tags: [ 'cams' ] }
 *  
*/

hangouts
		.controller(
				'MainCtrl',
				function($rootScope, $http, EventParser, UserService) {
					// mock data
//					$rootScope.events = [];
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
										console.log(data);
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
			//add location field to DOM 
			$scope.showLocation = true;
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
				function($rootScope, $scope, snapRemote,EventService,EventParser,$state) {
				$scope.getEvents = function() {
					var filter = {state: $scope.user.state};
					EventService.getEvents(filter).success(function (data) {
						if (data) {
							$rootScope.events=[];
							for(var i =0; i<data.length;i++) {
								$rootScope.events.push(new EventParser(data[i]));
							}
						}
					}).error(function(data) {
						alert(data);
						$state.go('login');
					});
				};
				$scope.toggleLeft = function() {
					snapRemote.toggle('left');
				};
				$scope.toggleRight = function() {
					snapRemote.toggle('right');
				};
				$scope.showDetails = function(index) {
					$rootScope.currEvent = $rootScope.events[index];
					snapRemote.toggle('right');
				};
				$scope.getEvents();
			})
		.controller('DetailsCtrl',
				function($scope, snapRemote, EventService,$state) {
					$scope.toggleRight = function() {
						snapRemote.toggle('right');
					};
					$scope.mapToggleText = "Show Map";
					$scope.toggleMap = function() {
						if ($scope.showMap) {
							$scope.mapToggleText = "Show Map";
						} else {
							$scope.mapToggleText = "Hide Map";
						}
						$scope.showMap = !$scope.showMap;
					};
					$scope.remove = function() {
							EventService.remove($scope.currEvent.toForm()).success(function(data) {
								snapRemote.toggle('right');			
								var index = $scope.events.indexOf($scope.currEvent);
								$scope.events.splice(index,1);
								delete $scope.currEvent;
							}).error(function(data){
								alert(data);
								snapRemote.toggle('right');
							});
					};
					

				})
		.controller(
				'CreateCtrl',
				function($scope, $rootScope, $state, 
						GMapsFactory,EventService) {
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