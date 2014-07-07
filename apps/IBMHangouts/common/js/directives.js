//directive for tag input box
//call function when space or enter are pressedS
hangouts.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if (event.which === 13 || event.which === 32) {
				scope.$apply(function() {
					scope.$eval(attrs.ngEnter);
					element.val("");
				});
				event.preventDefault();
			}
		});
	};
}).directive(
		'passwordValid',
		function() {
			return {
				require : 'ngModel',
				link : function(scope, element, attrs, ctrl) {

					ctrl.$parsers
							.unshift(function(viewValue) {
								scope.pwdValidLength = (viewValue
										&& viewValue.length >= 8
										&& viewValue.length <= 16 ? 'valid'
										: undefined);
								if (scope.pwdValidLength) {
									ctrl.$setValidity('pwd', true);
									return viewValue;
								} else {
									ctrl.$setValidity('pwd', false);
									return undefined;
								}

							});
				}
			};
		})
.directive('loadingScreen', [ '$http', function($http) {
	return {
		restrict : 'A',
		link : function(scope, elm, attrs) {
			scope.isLoading = function() {
				return $http.pendingRequests.length > 0;
			};

			scope.$watch(scope.isLoading, function(v) {
				if (v) {
					elm.removeClass("hidden");
				} else {
					elm.addClass("hidden");
				}
			});
		}
	};

} ]);
;