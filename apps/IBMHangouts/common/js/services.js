angular.module('Hangouts').factory('TagListFactory', function($http) {
	var ret = function() {
		//insert mock tag on initialization
		var tagList = ['CLOUD'];
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
	}

	return ret;
});