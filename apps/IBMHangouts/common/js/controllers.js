//var pushNotification;
//var restURL = 'http://ibmhangouts.stage1.ng.bluemix.net/ibmhangouts/v1/apps/61c079f0-c710-47c8-afc1-7948d7b970a4'
//
//document.addEventListener("deviceready", function() {
//	pushNotification = window.plugins.pushNotification;
//});

var months = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP',
		'OCT', 'NOV', 'DEC' ];
var fullMonths = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
       		'October', 'November', 'December'];

var weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday" ];

hangouts
		.controller(
				'MainCtrl',
				function($rootScope, $http) {
					$rootScope.events = [ {
						title : 'Smarter Cloud',
						end : '14:12',
						start : "2014-02-23T13:12",
						location : 'NH11.04',
						tags : [ 'smart', 'cloud' ],
						description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					}];
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
		.controller('TagCtrl', function($rootScope, $scope, TagListFactory) {
			$scope.tagSearch = new TagListFactory();
			$scope.deleteSearchTag = function(tagName) {
				$scope.tagSearch.remove(tagName);
			};
			$scope.addToSearch = function() {
				$scope.tagSearch.add($scope.userSearch);
				$scope.userSearch = "";
			};
		})
		.controller('NewsfeedCtrl', function($rootScope,$scope, $ionicSideMenuDelegate) {
			$scope.toggleLeft = function() {
				$ionicSideMenuDelegate.toggleLeft();
			};
			$scope.toggleRight = function() {
				$ionicSideMenuDelegate.toggleRight();
			};
			$scope.getEventTime = function(event) {
				if(typeof event != 'undefined' && typeof event.start != 'undefined') {
					return event.start.split('T')[1];
				} else {
					return 'Early';
				}
			};
			$scope.getEndTime = function(event) {
				if(typeof event != 'undefined' && typeof event.start != 'undefined') {
					return event.end;
				} else {
					return 'Late';
				}
			}
			$scope.getEventMonth = function(event) {
				if(typeof event != 'undefined' && typeof event.start != 'undefined') {
					var index = (event.start).split('-')[1];
					return months[parseInt(index)];
				} else {
					return 'N/A';
				}
			};
			$scope.getEventDay = function(event) {
				if(typeof event != 'undefined' && typeof event.start != 'undefined') {
					var temp = String(event.start).split('-')[2];
					return temp.split('T')[0];
				} else {
					return '00';
				}
			};
			$scope.getDayOfWeek = function() {

			};
			$scope.getDetailedTime = function(event) {
				return $scope.getEventDay(event) + ' ' + 
				$scope.getEventFullMonth(event) +', ' 
				+ $scope.getEventTime(event) + ' - '+ $scope.getEndTime(event);
			};
			$scope.getEventFullMonth = function(event) {
				if(typeof event != 'undefined' && typeof event.start != 'undefined') {
					var index = (event.start).split('-')[1];
					return fullMonths[parseInt(index)];
				} else {
					return 'N/A';
				}
			};
			$scope.showDetails = function(index) {
				$rootScope.currEvent = $scope.events[index];
				$scope.showMap = false;
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
		.controller('MyEventsCtrl', function($scope) {

		})
		.controller('SettingsCtrl', function($scope) {

			$scope.isStatic = true;
		})
		.controller(
				'CreateCtrl',
				function($scope, $rootScope, $state, GMapsFactory,
						EventFactory) {
					$scope.event = new EventFactory();
					var maps = new GMapsFactory();
					maps.searchbox(document
							.getElementById('autocomplete-search'),$scope);
					$scope.save = function() {
						if (typeof $scope.event.title == 'undefined') {
							$scope.event.title='Untitled';
						}
						$rootScope.events.push($scope.event);
						$state.go('newsfeed.main');
					};

				})
		.controller(
				'MapCtrl',
				function($scope, GMapsFactory) {
					console.log(document.getElementById('map-canvas'));
					// var maps = new GMapsFactory();
					// console.log(document.getElementById('map-canvas'));
					// console.log(document.getElementById('map-search'));
					// maps.init(document.getElementById('map-search'),document.getElementById('map-canvas'));
					var markers = [];
					var map = new google.maps.Map(document
							 .getElementById('map-canvas'), {
						mapTypeId : google.maps.MapTypeId.ROADMAP
					});

					var defaultBounds = new google.maps.LatLngBounds(
							new google.maps.LatLng(-33.8902, 151.1759),
							new google.maps.LatLng(-33.8474, 151.2631));
					map.fitBounds(defaultBounds);
					var input = /** @type {HTMLInputElement} */
					(document.getElementById('map-search'));
					map.controls[google.maps.ControlPosition.TOP_LEFT]
							.push(input);
					var searchBox = new google.maps.places.SearchBox(
					/** @type {HTMLInputElement} */
					(input));

					// [START region_getplaces]
					// Listen for the event fired when the user selects an item
					// from the
					// pick list. Retrieve the matching places for that item.
					google.maps.event
							.addListener(
									searchBox,
									'places_changed',
									function() {
										var places = searchBox.getPlaces();

										for (var i = 0, marker; marker = markers[i]; i++) {
											marker.setMap(null);
										}

										// For each place, get the icon, place
										// name, and location.
										markers = [];
										var bounds = new google.maps.LatLngBounds();
										for (var i = 0, place; place = places[i]; i++) {
											var image = {
												url : place.icon,
												size : new google.maps.Size(71,
														71),
												origin : new google.maps.Point(
														0, 0),
												anchor : new google.maps.Point(
														17, 34),
												scaledSize : new google.maps.Size(
														25, 25)
											};

											// Create a marker for each place.
											var marker = new google.maps.Marker(
													{
														map : map,
														icon : image,
														title : place.name,
														position : place.geometry.location
													});

											markers.push(marker);

											bounds
													.extend(place.geometry.location);
										}

										map.fitBounds(bounds);
									});
					// [END region_getplaces]

					// Bias the SearchBox results towards places that are within
					// the bounds of the
					// current map's viewport.
					google.maps.event.addListener(map, 'bounds_changed',
							function() {
								var bounds = map.getBounds();
								searchBox.setBounds(bounds);
							});
				});
