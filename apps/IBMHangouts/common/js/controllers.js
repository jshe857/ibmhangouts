var pushNotification;

document.addEventListener("deviceready", function() {
	pushNotification = window.plugins.pushNotification;
});

var months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
var restURL = 'http://ibmhangouts.stage1.ng.bluemix.net/ibmhangouts/v1/apps/61c079f0-c710-47c8-afc1-7948d7b970a4'
hangouts.controller('MainCtrl',
		function($http) {
			// IBMBaaS.initializeSDK('61c079f0-c710-47c8-afc1-7948d7b970a4').then(
			// function() {
			//
			// });
		}).controller('LoginCtrl', function($scope, $http, $location) {
	$scope.validate = function(user) {
		// more authentication to be implemented
		if (true) {
			$location.path('/wizard/setup');
		} else {
			alert("Invalid Login"); 
		}
	};
	$scope.getImage = function(switchUser) {
		if (!switchUser) {
			return {
				'background' : 'url(images/example.jpg)',
				'background-position': 'center',	
				'background-size': '100% auto'
			};
		} else {
			return {
				'background' : 'url(images/newuser.png)',
				'background-position': 'center',	
				'background-size': '100% auto'
			};
		}

	};
}).controller('TagCtrl', function($rootScope, $scope, TagListFactory) {
	$scope.tagSearch = new TagListFactory();
	$scope.deleteSearchTag = function(tagName) {
		$scope.tagSearch.remove(tagName);
	};
	$scope.addToSearch = function() {
		$scope.tagSearch.add($scope.userSearch);
		$scope.userSearch = "";
	};
}).controller('NewsfeedCtrl',function($scope, $ionicSideMenuDelegate) {
	//mock data
	$scope.events = [{title: 'Smarter Cloud Event',time:'7PM', date: new Date(2014, 1, 4), location : 'St. Leonards', tags: ['smart', 'cloud']}, 
	                 {title: 'Speed Mentoring',time:'4PM',date: new Date(2014,2,1), location : 'Cabana Bar', tags: ['speed','mentoring']},
	                 {title: 'Agile Development', time:'9AM',date: new Date(2014,4,21),location : 'NH 11.01',tags: ['agile']}];
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.getEventTime = function(event) {
		return event.time;
	};
	$scope.getEventMonth = function (event) {
		return months[event.date.getMonth()];
	};
	$scope.getEventDay = function(event) {
		var day = event.date.getDay();
		if (day < 10) {
			day = '0' + day;
		};
		return day;
	};
}).controller('SettingsCtrl', function($scope) {
	$scope.isStatic = true;
});
