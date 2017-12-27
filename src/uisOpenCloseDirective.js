uis.directive('uisOpenClose', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    require: 'uiSelect',
    link: function (scope, element, attrs, $select) {
      var openFlagParse = $parse(attrs.uisOpen);
      $select.onOpenCloseCallback = $parse(attrs.uisOpenClose);
      scope.$watch('$select.open', function (isOpen, previousState) {
        if (isOpen !== previousState) {
          openFlagParse(scope, {isOpen: isOpen});
          $select.onOpenCloseCallback(scope, {
            isOpen: isOpen
          });
        }
      });

      scope.$watch(openFlagParse, function(newVal){
        if(newVal === true){
          $select.activate();
        }else if(newVal === false){
          $select.close();
        }
      });
    }
  };
}]);
