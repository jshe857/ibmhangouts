//directive for tag input box
//call function when space or enter are pressedS
hangouts.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13 || event.which === 32) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                    element.val("");
                });

                event.preventDefault();
            }
        });
    };
});