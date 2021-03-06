uis.directive('uiSelectChoices', ['uiSelectConfig', 'uisRepeatParser', 'uiSelectMinErr', '$compile', '$timeout', '$window',
  function (uiSelectConfig, RepeatParser, uiSelectMinErr, $compile, $timeout, $window) {

    return {
      restrict: 'EA',
      require: '^uiSelect',
      replace: true,
      transclude: {
        tabWrapper: '?translcludeTab'
      },
      templateUrl: function (tElement, attrs) {
        // Needed so the uiSelect can detect the transcluded content
        tElement.addClass('ui-select-choices');

        // Gets theme attribute from parent (ui-select)
        var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
        return attrs.templateUrl || theme + '/choices.tpl.html';
      },

      compile: function (tElement, tAttrs) {

        if (!tAttrs.repeat) throw uiSelectMinErr('repeat', "Expected 'repeat' expression.");

        return function link(scope, element, attrs, $select, transcludeFn) {

          // var repeat = RepeatParser.parse(attrs.repeat);
          var groupByExp = attrs.groupBy;
          var groupFilterExp = attrs.groupFilter;

          $select.parseRepeatAttr(attrs.repeat, groupByExp, groupFilterExp); //Result ready at $select.parserResult

          $select.disableChoiceExpression = attrs.uiDisableChoice;
          $select.onHighlightCallback = attrs.onHighlight;
          $select.maximumInputLength = attrs.maximumInputLength || 1000000;

          $select.dropdownPosition = attrs.position ? attrs.position.toLowerCase() : uiSelectConfig.dropdownPosition;
          $select.refreshAttr = attrs.refresh;

          if (groupByExp) {
            var groups = element.querySelectorAll('.ui-select-choices-group');
            if (groups.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-group but got '{0}'.", groups.length);
            groups.attr('ng-repeat', RepeatParser.getGroupNgRepeatExpression());
          }

          var choices = element.querySelectorAll('.ui-select-choices-row');
          if (choices.length !== 1) {
            throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row but got '{0}'.", choices.length);
          }

          choices.attr('ng-repeat', $select.parserResult.repeatExpression(groupByExp))
            .attr('ng-if', '$select.open'); //Prevent unnecessary watches when dropdown is closed
          if ($window.document.addEventListener) {  //crude way to exclude IE8, specifically, which also cannot capture events
            // grouping에서 오동작을 막기위해 itemIndex를 activeIndex로 설정
            choices
              .attr('ng-click', '$select.activeIndex=itemIndex;$select.select(' + $select.parserResult.itemName + ',{skipFocusser: $select.skipFocusser, $event: $event})')
              .attr('ng-init', 'itemIndex=$select.getItemIndex(this)')
              .attr('id', 'ui-select-choices-row-' + $select.generatedId + '-{{itemIndex}}');
            // ng-mouseenter attribute 가 이미 존재할 경우에는 덮어쓰지 않음
            !$select.multiple && !choices.attr('ng-mouseenter') && choices.attr('ng-mouseenter', '$select.onMouseEnter(itemIndex)');

            choices.children().attr('ng-class', '{\'prev-selected\': $select.isPrevActive(itemIndex, ' + $select.parserResult.itemName + ')}');
          }

          var rowsInner = element.querySelectorAll('.ui-select-choices-row-inner');
          if (rowsInner.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row-inner but got '{0}'.", rowsInner.length);
          rowsInner.attr('uis-transclude-append', ''); //Adding uisTranscludeAppend directive to row element after choices element has ngRepeat
          if (!$window.document.addEventListener) {  //crude way to target IE8, specifically, which also cannot capture events - so event bindings must be here
            // grouping에서 오동작을 막기위해 itemIndex를 activeIndex로 설정
            rowsInner
              .attr('ng-click', '$select.activeIndex=itemIndex;$select.select(' + $select.parserResult.itemName + ',{skipFocusser: $select.skipFocusser, $event: $event})')
              .attr('ng-init', 'itemIndex=$select.getItemIndex(this)')
              .attr('id', 'ui-select-choices-row-' + $select.generatedId + '-{{itemIndex}}');
            // ng-mouseenter attribute 가 이미 존재할 경우에는 덮어쓰지 않음
            !$select.multiple && !choices.attr('ng-mouseenter') && rowsInner.attr('ng-mouseenter', '$select.onMouseEnter(itemIndex)');
            rowsInner.children().attr('ng-class', '{\'prev-selected\': $select.isPrevActive(itemIndex, ' + $select.parserResult.itemName + ')}');
          }


          $compile(element, transcludeFn)(scope); //Passing current transcludeFn to be able to append elements correctly from uisTranscludeAppend


          //왜삭제?
          // scope.$on('$destroy', function () {
          //   choices.remove();
          // });

          var timer;
          scope.$watch('$select.search', function (newValue) {
            if (newValue && !$select.open && $select.multiple) $select.activate(false, true);
            // $select.activeIndex = $select.tagging.isActivated ? -1 : 0;
            $select.activeIndex = ($select.multiple && !newValue) ? -1 : 0;
            $timeout.cancel(timer);
            timer = $timeout(function () {
              $select.ensureHighlightVisible();
            }, 200, false);
            if (
              (!attrs.minimumInputLength || $select.search.length >= attrs.minimumInputLength) &&
              (!attrs.maximumInputLength || $select.search.length <= attrs.maximumInputLength)
            ) {
              $select.refresh(attrs.refresh);
            } else {
              $select.items = [];
            }
          });

          attrs.$observe('refreshDelay', function () {
            // $eval() is needed otherwise we get a string instead of a number
            var refreshDelay = scope.$eval(attrs.refreshDelay);
            $select.refreshDelay = refreshDelay !== undefined ? refreshDelay : uiSelectConfig.refreshDelay;
          });
        };
      }
    };
  }]);
