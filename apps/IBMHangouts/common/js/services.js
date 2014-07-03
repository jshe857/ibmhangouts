
var restURL = 'https://ibmhangouts.stage1.mybluemix.net';
//var restURL = 'http://localhost:3000';

var months = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP',
		'OCT', 'NOV', 'DEC' ];
var fullMonths = [ 'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December' ];

var weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday" ];

hangouts.factory('TagListFactory', function($http) {
	var ret = function(tags) {
		// insert mock tag on initialization
		var tagList = [];
		if (tags) {
			for(var i =0; i < tags.length; i++) {
				tagList.push(tags[i]);
			}
		}
		
		tagList.load = function() {

		};
		tagList.save = function() {

		};
		tagList.add = function(tagName) {
			var str = tagName.toUpperCase();
			if (this.indexOf(str) == -1 && str.length != 0) {
				this.unshift(str);
			}
		};

		tagList.remove = function(tagName) {
			var index = this.indexOf(tagName);
			if (index > -1) {
				this.splice(index, 1);
			}
		};
		return tagList;
	};

	return ret;
}).factory(
		'GMapsFactory',
		function() {
			var maps = function() {
				var box = {};
				var autocomplete = "";
				box.searchbox = function(input,event) {
					var options = {
						componentRestrictions : {
							country : 'au'
						}
					};

					autocomplete = new google.maps.places.Autocomplete(input,
							options);
					google.maps.event.addListener(autocomplete,
							'place_changed', function() {
								console.log(autocomplete.getPlace());
								event.location = autocomplete.getPlace().name
							});
				};
				return box;
			};
			return maps;

		}).factory('EventFactory',function(){
	return function() {
		var event = {};
		return event;
	};
}).factory('EventParser', function() {
	 var parse = function(eventData){
		var event = eventData;
		this.toForm = function() {
			return event;
		};
		
		this.getLocation = function() {
			if (typeof event.location != 'undefined') {
				return event.location;
			} else{
				return 'TBD';
			}
		}
		this.getTitle = function() {
			if (typeof event.title != 'undefined') {
				return event.title;
			} else {
				return 'Untitled';
			}
		}
		this.getEventTime = function() {
			if (typeof event != 'undefined'
					&& typeof event.start != 'undefined') {
				return event.start.split('T')[1];
			} else {
				return 'Early';
			}
		};
		this.getEndTime = function() {
			if (typeof event != 'undefined'
					&& typeof event.start != 'undefined') {
				return event.end;
			} else {
				return 'Late';
			}
		};
		this.getEventMonth = function() {
			if (typeof event != 'undefined'
					&& typeof event.start != 'undefined') {
				var index = (event.start).split('-')[1];
				return months[parseInt(index)];
			} else {
				return 'N/A';
			}
		};
		this.getEventDay = function() {
			if (typeof event != 'undefined'
					&& typeof event.start != 'undefined') {
				var temp = String(event.start).split('-')[2];
				return temp.split('T')[0];
			} else {
				return '00';
			}
		};
		this.getDayOfWeek = function() {

		};
		this.getDetailedTime = function() {
			return this.getEventDay() + ' '
					+ this.getEventFullMonth() + ', '
					+ this.getEventTime() + ' - '
					+ this.getEndTime();
		};
		this.getEventFullMonth = function() {
			if (typeof event != 'undefined'
					&& typeof event.start != 'undefined') {
				var index = (event.start).split('-')[1];
				return fullMonths[parseInt(index)];
			} else {
				return 'N/A';
			}
		};
		this.getDescription = function() {
			return event.description;
		};
		this.getTags = function() {
			if (typeof event.tags != 'undefined') {
				return event.tags.toString();
			}
		};
		this.getCreatorEmail = function() {
			return event.username;
		};
		this.getCreatorName = function() {
			return event.name;
		};
		
	};
	return parse;
	
}).factory('UserService',function($http,$rootScope) {
	return {
		login : function(username,password) {
			delete $rootScope.user.password;
        	return $http.post(restURL + '/login', {username: username, password: password});    
		},
		register : function(username,password,name) {
			return $http.post(restURL + '/register', {username: username, password: password, name:name});    
		},
		update : function(user) {
			delete user.password;
			return $http.post(restURL + '/updateUser', {user:user});
		}
	};
}).factory('EventService',function($http,$rootScope){
	return {
		create : function(event) {
			return $http.post(restURL+'/createEvent',{event:event});
		},
		retrieve: function(user) {
			console.log(user.username);
			return $http.post(restURL+'/getUserEvent',{username:user.username});
		}
	};
});