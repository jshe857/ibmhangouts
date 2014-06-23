hangouts.factory('TagListFactory', function($http) {
	var ret = function() {
		// insert mock tag on initialization
		var tagList = [ 'CLOUD' ];
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
//						types : [ 'establishment' ],
						componentRestrictions : {
							country : 'au'
						}
					};

					autocomplete = new google.maps.places.Autocomplete(input,
							options);
					google.maps.event.addListener(autocomplete,
							'place_changed', function() {
								console.log(autocomplete.getPlace().name);
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
	}
}).factory('EventParser', function() {
	
});