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

function onNotification(e) {
	alert("notification recieved");
	$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

	switch (e.event) {
	case 'registered':
		if (e.regid.length > 0) {
			$("#app-status-ul").append(
					'<li>REGISTERED -> REGID:' + e.regid + "</li>");
			// Your GCM push server needs to know the regID before it can push
			// to this device
			// here is where you might want to send it the regID for later use.
			console.log("regID = " + e.regid);
		}
		break;

	case 'message':
		// if this flag is set, this notification happened while we were in the
		// foreground.
		// you might want to play a sound to get the user's attention, throw up
		// a dialog, etc.
		if (e.foreground) {
			$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

			// on Android soundname is outside the payload.
			// On Amazon FireOS all custom attributes are contained within
			// payload
			var soundfile = e.soundname || e.payload.sound;
			// if the notification contains a soundname, play it.
			var my_media = new Media("/android_asset/www/" + soundfile);
			my_media.play();
		} else { // otherwise we were launched because the user touched a
					// notification in the notification tray.
			if (e.coldstart) {
				$("#app-status-ul").append(
						'<li>--COLDSTART NOTIFICATION--' + '</li>');
			} else {
				$("#app-status-ul").append(
						'<li>--BACKGROUND NOTIFICATION--' + '</li>');
			}
		}

		$("#app-status-ul").append(
				'<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
		// Only works for GCM
		$("#app-status-ul").append(
				'<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
		// Only works on Amazon Fire OS
		$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
		break;

	case 'error':
		$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
		break;

	default:
		$("#app-status-ul")
				.append(
						'<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
		break;
	}
}
