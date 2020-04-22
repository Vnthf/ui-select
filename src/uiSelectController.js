/**
 * Contains ui-select "intelligence".
 *
 * The goal is to limit dependency on the DOM whenever possible and
 * put as much logic in the controller (instead of the link functions) as possible so it can be easily tested.
 */
uis.controller('uiSelectCtrl',
  ['$scope', '$element', '$timeout', '$filter', '$$uisDebounce', 'uisRepeatParser', 'uiSelectMinErr', 'uiSelectConfig', '$parse', '$injector', '$window',
  function($scope, $element, $timeout, $filter, $$uisDebounce, RepeatParser, uiSelectMinErr, uiSelectConfig, $parse, $injector, $window) {

  var ctrl = this;

  var EMPTY_SEARCH = '';

  ctrl.placeholder = uiSelectConfig.placeholder;
  ctrl.searchEnabled = uiSelectConfig.searchEnabled;
  ctrl.sortable = uiSelectConfig.sortable;
  ctrl.refreshDelay = uiSelectConfig.refreshDelay;
  ctrl.paste = uiSelectConfig.paste;

  ctrl.removeSelected = false; //If selected item(s) should be removed from dropdown list
  ctrl.closeOnSelect = true; //Initialized inside uiSelect directive link function
  ctrl.skipFocusser = false; //Set to true to avoid returning focus to ctrl when item is selected
  ctrl.search = EMPTY_SEARCH;

  ctrl.activeIndex = 0; //Dropdown of choices
  ctrl.items = []; //All available choices

  ctrl.open = false;
  ctrl.focus = false;
  ctrl.disabled = false;
  ctrl.selected = undefined;

  ctrl.dropdownPosition = 'auto';

  ctrl.focusser = undefined; //Reference to input element used to handle focus events
  ctrl.resetSearchInput = true;
  ctrl.multiple = undefined; // Initialized inside uiSelect directive link function
  ctrl.disableChoiceExpression = undefined; // Initialized inside uiSelectChoices directive link function
  ctrl.resetOnEsc = false; // 어떤 상태여도 ESC를 누르면 검색어가 사라짐
  ctrl.tagging = {isActivated: false, fct: undefined};
  ctrl.taggingInvalid = {isActivated: false, value: undefined};
  ctrl.taggingTokens = {isActivated: false, tokens: undefined};
  ctrl.lockChoiceExpression = undefined; // Initialized inside uiSelectMatch directive link function
  ctrl.clickTriggeredSelect = false;
  ctrl.$filter = $filter;

  // Use $injector to check for $animate and store a reference to it
  ctrl.$animate = (function () {
    try {
      return $injector.get('$animate');
    } catch (err) {
      // $animate does not exist
      return null;
    }
  })();

  ctrl.searchInput = $element.querySelectorAll('input.ui-select-search');
  if (ctrl.searchInput.length !== 1) {
    throw uiSelectMinErr('searchInput', "Expected 1 input.ui-select-search but got '{0}'.", ctrl.searchInput.length);
  }

  ctrl.isEmpty = function() {
    return angular.isUndefined(ctrl.selected) || ctrl.selected === null || ctrl.selected === '' || (ctrl.multiple && ctrl.selected.length === 0);
  };

  function _findIndex(collection, predicate, thisArg){
    if (collection.findIndex){
      return collection.findIndex(predicate, thisArg);
    } else {
      var list = Object(collection);
      var length = list.length >>> 0;
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    }
  }

  // Most of the time the user does not want to empty the search input when in typeahead mode
  function _resetSearchInput(skipSelect) {
    if (ctrl.resetSearchInput || (ctrl.resetSearchInput === undefined && uiSelectConfig.resetSearchInput)) {
      if (!skipSelect && ctrl.multiple && ctrl.tagging.isActivated && ctrl.search !== EMPTY_SEARCH) {
        var newItem = ctrl.parseStringToTagMap(ctrl.search);
        ctrl.search = EMPTY_SEARCH;
        ctrl.activeIndex = 0; // 선택이 안되는 버그 수정 패치코드
        // select안에 _resetSearchInput을 호출하는 로직이 있어서 무한루프에 빠지지 않기위해 수정
        ctrl.select(newItem);
        return;
      }
      ctrl.search = EMPTY_SEARCH;
      //reset activeIndex
      if (ctrl.selected && ctrl.items && ctrl.items.length && !ctrl.multiple) {
        ctrl.activeIndex = _findIndex(ctrl.items, function(item){
          return ctrl.isEqual(this, item);
        }, ctrl.selected);
      }
    }
  }

    function _groupsFilter(groups, groupNames) {
      var i, j, result = [];
      for(i = 0; i < groupNames.length ;i++){
        for(j = 0; j < groups.length ;j++){
          if(groups[j].name == [groupNames[i]]){
            result.push(groups[j]);
          }
        }
      }
      return result;
    }

  // When the user clicks on ui-select, displays the dropdown list
  ctrl.activate = function(initSearchValue, avoidReset) {
    if (!ctrl.disabled  && !ctrl.open) {
      if(!avoidReset) _resetSearchInput();
      ctrl.refresh(ctrl.refreshAttr);
      $scope.$broadcast('uis:activate');

      ctrl.open = true;

      ctrl.activeIndex = (ctrl.multiple && !ctrl.search) ? -1 : ctrl.activeIndex;
      ctrl.activeIndex = ctrl.activeIndex >= ctrl.items.length ? 0 : ctrl.activeIndex;

      // ensure that the index is set to zero for tagging variants
      // that where first option is auto-selected
      if ( ctrl.activeIndex === -1 && ctrl.taggingLabel !== false ) {
        ctrl.activeIndex = 0;
      }

      var container = $element.querySelectorAll('.ui-select-choices-content');
      if (ctrl.$animate && ctrl.$animate.on && ctrl.$animate.enabled(container[0])) {
        var handler = function (elem, phase) {
          if (phase === 'close') {
            // Only focus input after the animation has finished
            $timeout(function () {
              ctrl.focusSearchInput(initSearchValue);
            }, 0, false);
            ctrl.$animate.off('enter', container[0], handler);
          }
        };
        ctrl.$animate.on('enter', container[0], handler);
      } else {
        $timeout(function () {
          ctrl.focusSearchInput(initSearchValue);
          if(!ctrl.tagging.isActivated && ctrl.items.length > 1) {
            ctrl.ensureHighlightVisible();
          }
        }, 0, false);
      }
      // var searchInput = $element.querySelectorAll('.ui-select-search');
      // if (ctrl.$animate && ctrl.$animate.enabled(container[0])) {
      //   var animateHandler = function(elem, phase) {
      //     if (phase === 'start' && ctrl.items.length === 0) {
      //       // Only focus input after the animation has finished
      //       ctrl.$animate.off('removeClass', searchInput[0], animateHandler);
      //       $timeout(function () {
      //         ctrl.focusSearchInput(initSearchValue);
      //       });
      //     } else if (phase === 'close') {
      //       // Only focus input after the animation has finished
      //       ctrl.$animate.off('enter', container[0], animateHandler);
      //       $timeout(function () {
      //         ctrl.focusSearchInput(initSearchValue);
      //       });
      //     }
      //   };
      //
      //   if (ctrl.items.length > 0) {
      //     ctrl.$animate.on('enter', container[0], animateHandler);
      //   } else {
      //     ctrl.$animate.on('removeClass', searchInput[0], animateHandler);
      //   }
      // } else {
      //   $timeout(function () {
      //     ctrl.focusSearchInput(initSearchValue);
      //     if(!ctrl.tagging.isActivated && ctrl.items.length > 1) {
      //       ctrl.ensureHighlightVisible();
      //     }
      //   }, 0, false);
      // }
    }
  };

  ctrl.focusSearchInput = function (initSearchValue) {
    ctrl.search = initSearchValue || ctrl.search;
    ctrl.searchInput[0].focus();
  };

  ctrl.findGroupByName = function(name) {
    return ctrl.groups && ctrl.groups.filter(function(group) {
      return group.name === name;
    })[0];
  };

  ctrl.parseRepeatAttr = function(repeatAttr, groupByExp, groupFilterExp) {
    function updateGroups(items) {
      var groupFn = $scope.$eval(groupByExp);
      ctrl.groups = [];
      angular.forEach(items, function(item) {
        var groupName = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];
        var group = ctrl.findGroupByName(groupName);
        if(group) {
          group.items.push(item);
        }
        else {
          ctrl.groups.push({name: groupName, items: [item]});
        }
      });
      if(groupFilterExp){
        var groupFilterFn = $scope.$eval(groupFilterExp);
        if( angular.isFunction(groupFilterFn)){
          ctrl.groups = groupFilterFn(ctrl.groups);
        } else if(angular.isArray(groupFilterFn)){
          ctrl.groups = _groupsFilter(ctrl.groups, groupFilterFn);
        }
      }
      ctrl.items = [];
      ctrl.groups.forEach(function(group) {
        ctrl.items = ctrl.items.concat(group.items);
      });
    }

    function setPlainItems(items) {
      ctrl.items = items;
    }

    ctrl.setItemsFn = groupByExp ? updateGroups : setPlainItems;

    ctrl.parserResult = RepeatParser.parse(repeatAttr);

    ctrl.isGrouped = !!groupByExp;
    ctrl.itemProperty = ctrl.parserResult.itemName;

    //If collection is an Object, convert it to Array

    var originalSource = ctrl.parserResult.source;

    //When an object is used as source, we better create an array and use it as 'source'
    var createArrayFromObject = function(){
      var origSrc = originalSource($scope);
      $scope.$uisSource = Object.keys(origSrc).map(function(v){
        var result = {};
        result[ctrl.parserResult.keyName] = v;
        result.value = origSrc[v];
        return result;
      });
    };

    if (ctrl.parserResult.keyName){ // Check for (key,value) syntax
      createArrayFromObject();
      ctrl.parserResult.source = $parse('$uisSource' + ctrl.parserResult.filters);
      $scope.$watch(originalSource, function(newVal, oldVal){
        if (newVal !== oldVal) createArrayFromObject();
      }, true);
    }

    // ctrl.refreshItems = function (data){
    //   data = data || ctrl.parserResult.source($scope);
    //   var selectedItems = ctrl.selected;
    //   //TODO should implement for single mode removeSelected
    //   if (ctrl.isEmpty() || (angular.isArray(selectedItems) && !selectedItems.length) || !ctrl.removeSelected) {
    //     ctrl.setItemsFn(data);
    //   }else{
    //     if ( data !== undefined ) {
    //       var filteredItems = data.filter(function(i) {
    //         return selectedItems.every(function(selectedItem) {
    //           return !angular.equals(i, selectedItem);
    //         });
    //       });
    //       ctrl.setItemsFn(filteredItems);
    //     }
    //   }
    //   if (ctrl.dropdownPosition === 'auto' || ctrl.dropdownPosition === 'up'){
    //     $scope.calculateDropdownPos();
    //   }
    // };

    ctrl.refreshItems = function (data, callbackData){
      data = data || ctrl.parserResult.source($scope);
      callbackData = callbackData || angular.noop;
      data = callbackData(data) || data;
      ctrl.setItemsFn(data);
      if (ctrl.dropdownPosition === 'auto' || ctrl.dropdownPosition === 'up'){
        $scope.calculateDropdownPos();
      }
    };

    // See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L259
    $scope.$watchCollection(ctrl.parserResult.source, function(items) {
      if (items === undefined || items === null) {
        // If the user specifies undefined or null => reset the collection
        // Special case: items can be undefined if the user did not initialized the collection on the scope
        // i.e $scope.addresses = [] is missing
        ctrl.items = [];
      } else {
        if (!angular.isArray(items)) {
          throw uiSelectMinErr('items', "Expected an array but got '{0}'.", items);
        } else {
          //Remove already selected items (ex: while searching)
          //TODO Should add a test
          ctrl.refreshItems(items);
          ctrl.ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
        }
      }
    });

  };

  var _refreshDelayPromise;

  /**
   * Typeahead mode: lets the user refresh the collection using his own function.
   *
   * See Expose $select.search for external / remote filtering https://github.com/angular-ui/ui-select/pull/31
   */
  ctrl.refresh = function(refreshAttr) {
    if (refreshAttr !== undefined) {

      // Debounce
      // See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L155
      // FYI AngularStrap typeahead does not have debouncing: https://github.com/mgcrea/angular-strap/blob/v2.0.0-rc.4/src/typeahead/typeahead.js#L177
      if (_refreshDelayPromise) {
        $timeout.cancel(_refreshDelayPromise);
      }
      _refreshDelayPromise = $timeout(function() {
        $scope.$eval(refreshAttr);
      }, ctrl.refreshDelay);
    }
  };

  ctrl.getItemIndex = function (itemScope) {
    if (!ctrl.open) {
      return false;
    }
    return ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
  };

  ctrl.isActive = function(itemScope) {
    if ( !ctrl.open ) {
      return false;
    }
    var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
    var isActive =  itemIndex == ctrl.activeIndex;

    if ( !isActive || ( itemIndex < 0 && ctrl.taggingLabel !== false ) ||( itemIndex < 0 && ctrl.taggingLabel === false) ) {
      return false;
    }

    if (isActive && !angular.isUndefined(ctrl.onHighlightCallback)) {
      itemScope.$eval(ctrl.onHighlightCallback);
    }

    return isActive;
  };

  ctrl.isDisabled = function(itemScope) {

    if (!ctrl.open) return;

    var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
    var isDisabled = false;
    var item;

    if (itemIndex >= 0 && !angular.isUndefined(ctrl.disableChoiceExpression)) {
      item = ctrl.items[itemIndex];
      isDisabled = !!(itemScope.$eval(ctrl.disableChoiceExpression)); // force the boolean value
      item._uiSelectChoiceDisabled = isDisabled; // store this for later reference
    }

    return isDisabled;
  };

  function _selectArrayItem(itemList, option) {
    angular.forEach(itemList, function (item, index) {
      var _option = angular.copy(option);
      if(angular.isNumber(option.index)) {
        if(angular.isNumber(option.smallerIndexNum)) {
          _option.index = index < option.smallerIndexNum ? Math.max(option.index - 1, 0): option.index;
        } else {
          _option.index = option.index + index;
        }
      }
      item && ctrl.select(item, _option);
    });
  }


    // When the user selects an item with ENTER or clicks the dropdown
    //option = {skipFocusser, $event, skipBroadcast}
    // skipFocusser: search창이 닫힌 후에 focusser에 focus를 하지 않음
    // $event: select를 trigger한 event
    // skipAdd: 추가 관련 broadcast를 수행하지 않음(수행시 selected가 변하지 않음)
  ctrl.select = function(item, option) {
    option = option || {};
    if (angular.isArray(item)) {
      _selectArrayItem(item, option);
      return;
    }
    if (item === undefined || !item._uiSelectChoiceDisabled) {

      if ( ! ctrl.items && ! ctrl.search && ! ctrl.tagging.isActivated) return;

      if (!item || !item._uiSelectChoiceDisabled) {
        if(ctrl.tagging.isActivated) {
          // if taggingLabel is disabled, we pull from ctrl.search val
          if ( ctrl.taggingLabel === false ) {
            //TODO: tagging이 false일 때 예외처리 필요. activeIndex의 최소값은 0 (항상 select가 되도록), 없으면 노출 X
            //클릭이벤트인지도 판단할 수 있도록 해야함.
            if ( ctrl.activeIndex < 0 ) {
              item = ctrl.tagging.fct !== undefined ? ctrl.tagging.fct(ctrl.search) : ctrl.search;
              if (angular.isArray(item)) {
                _selectArrayItem(item, option);
                return;
              } else if (!item || ctrl.isEqual( ctrl.items[0], item ) ) {
                return;
              }
            } else if (!item) {
              return;
            } else if (option.$event && option.$event.type === 'click') { //TODO: click일 경우 예외처리
              // keyboard nav happened first, user selected from dropdown
              //item = ctrl.items[ctrl.activeIndex];
            }
          } else {
            // tagging always operates at index zero, taggingLabel === false pushes
            // the ctrl.search value without having it injected
            if ( ctrl.activeIndex === 0 ) {
              // ctrl.tagging pushes items to ctrl.items, so we only have empty val
              // for `item` if it is a detected duplicate
              if ( item === undefined ) return;

              // create new item on the fly if we don't already have one;
              // use tagging function if we have one
              if ( ctrl.tagging.fct !== undefined && typeof item === 'string' ) {
                item = ctrl.tagging.fct(item);
                if (angular.isArray(item)) {
                  _selectArrayItem(item, option);
                  return;
                } else if (!item) return;
              // if item type is 'string', apply the tagging label
              } else if ( typeof item === 'string' ) {
                // trim the trailing space
                item = item.replace(ctrl.taggingLabel,'').trim();
              }
            }
          }
        }

        !option.skipAdd && $scope.$broadcast('uis:select', item, option.index);

        // TODO 검색을 위해 선택시에 keyword를 추가
        var locals = {};
        ctrl.keyword = ctrl.search;
        locals[ctrl.parserResult.itemName] = item;

        $timeout(function(){
          var promise = ctrl.onSelectCallback($scope, {
            $keyword: ctrl.keyword,
            $item: item,
            $model: ctrl.parserResult.modelMapper($scope, locals)
          });

          if(promise && typeof promise.then === 'function') {
            promise.then(function () {
              ctrl.sizeSearchInput();
            });
          }
        }, 0, false);

        if (ctrl.closeOnSelect) {
          // select무한이 반복하는 현상 방어
          ctrl.close({skipFocusser: option.skipFocusser, skipSelect: true});
        }
        if (option.$event && option.$event.type === 'click') {
          ctrl.clickTriggeredSelect = true;
        }
      }
    }
  };

    // Closes the dropdown
    // option: skipFocusser, skipSelect, skipResetInput
  ctrl.close = function(option) {
    if (!ctrl.open) return;
    option = option || {};
    if (ctrl.ngModel && ctrl.ngModel.$setTouched) ctrl.ngModel.$setTouched();
    !option.skipResetInput && _resetSearchInput(option.skipSelect);
    ctrl.open = false;

    $scope.$broadcast('uis:close', option.skipFocusser);

  };

  ctrl.onMouseEnter = function (itemIndex) {
    if (!ctrl.keyDownMode) {
      ctrl.activeIndex = itemIndex;
    }
  };

  ctrl.setFocus = function(){
    if (!ctrl.focus) ctrl.focusInput[0].focus();
  };

  ctrl.clear = function($event) {
    ctrl.select(undefined);
    $event.stopPropagation();
    $timeout(function() {
      ctrl.focusser[0].focus();
    }, 0, false);
  };

  // Toggle dropdown
  ctrl.toggle = function(e) {
    if (ctrl.open) {
      ctrl.close();
      e.preventDefault();
      e.stopPropagation();
    } else {
      _resetSearchInput();
      ctrl.prevActiveIndex = ctrl.activeIndex;
      ctrl.activate();
    }
  };

  ctrl.isLocked = function(itemScope, itemIndex) {
      var isLocked, item = ctrl.selected[itemIndex];

      if (item && !angular.isUndefined(ctrl.lockChoiceExpression)) {
          isLocked = !!(itemScope.$eval(ctrl.lockChoiceExpression)); // force the boolean value
          item._uiSelectChoiceLocked = isLocked; // store this for later reference
      }

      return isLocked;
  };

  var sizeWatch = null;
  ctrl.sizeSearchInput = function() {
    if (!ctrl.multiple || ctrl.toggleChoice) {
      return;
    }

    var input = ctrl.searchInput[0],
        container = ctrl.searchInput.parent().parent()[0],
        calculateContainerWidth = function() {
          // Return the container width only if the search input is visible
          return container.clientWidth * !!input.offsetParent;
        },
        updateIfVisible = function(containerWidth) {
          if (containerWidth === 0) {
            return false;
          }
          var inputWidth = containerWidth - input.offsetLeft - (ctrl.multiple ? 16 : 0);
          if (inputWidth < 50) inputWidth = 50;
          ctrl.searchInput.css('width', inputWidth+'px');
          return true;
        };

    ctrl.searchInput.css('width', '50px');
    $timeout(function() { //Give tags time to render correctly
      if (sizeWatch === null && !updateIfVisible(calculateContainerWidth())) {
        sizeWatch = $scope.$watch(calculateContainerWidth, function(containerWidth) {
          if (updateIfVisible(containerWidth)) {
            sizeWatch();
            sizeWatch = null;
          }
        });
      }
    }, 0, false);
  };

  function _convertTokens() {
    if (!ctrl.taggingTokens.isActivated) {
      return [];
    }
    var tokens = [];
    for (var i = 0, len = ctrl.taggingTokens.tokens.length; i < len; i++) {
      tokens.push(KEY.toSeparator(ctrl.taggingTokens.tokens[i]) || ctrl.taggingTokens.tokens[i]);
    }
    return tokens;
  }

  function _makeTagListUsingFct(stringTokens) {
    var items = [];
    angular.forEach(stringTokens, function (stringToken) {
      var newItem = ctrl.tagging.fct(stringToken);
      if (angular.isArray(newItem)) {
        items = items.concat(newItem);
      } else if (newItem) {
        items.push(newItem);
      }
    });
    return items;
  }

  ctrl.parseStringToTagMap = function(str) {
    if (ctrl.multiple && ctrl.tagging.isActivated && ctrl.tagging.fct) {
      var tokens = _convertTokens(),
        stringTokens = tokens.length > 0 ? str.split(new RegExp(tokens.join('|'), 'g')) : str;
      return _makeTagListUsingFct(stringTokens);
    }
    return [];
  };

  function _handleSelection(key, event) {
    var processed = true;
    switch (key) {
      case KEY.DOWN:
        event.preventDefault();
        if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
        else if (ctrl.activeIndex < ctrl.items.length - 1) {
          _enableKeyDownMode();
          ctrl.activeIndex++;
        }
        break;
      case KEY.UP:
        event.preventDefault();
        if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
        else if (ctrl.activeIndex === -1) ctrl.activeIndex = ctrl.items.length - 1;
        else if (ctrl.activeIndex > 0) {
          _enableKeyDownMode();
          ctrl.activeIndex--;
        }
        break;
      case KEY.TAB:
        if (ctrl.items.length > 0 && (!ctrl.multiple || ctrl.open)) {
          ctrl.select(ctrl.items[ctrl.activeIndex], {skipFocusser: true});
        }
        break;
      case KEY.ENTER:
        if(ctrl.open && (ctrl.tagging.isActivated || ctrl.activeIndex >= 0)){
          ctrl.items.length > 0 && ctrl.select(ctrl.items[ctrl.activeIndex], {skipFocusser: ctrl.skipFocusser}); // Make sure at least one dropdown item is highlighted before adding if not in tagging mode
        } else {
          ctrl.activate(false, true); //In case its the search input in 'multiple' mode
        }
        break;
      case KEY.ESC:
        (!ctrl.resetOnEsc && ctrl.open && ctrl.items.length > 0) ? ctrl.close({skipResetInput: ctrl.multiple}) : _resetSearchInput(true);
        break;
      default:
        processed = false;
    }
    return processed;
  }

  var timeoutInstance = null;
  function _enableKeyDownMode() {
    $timeout.cancel(timeoutInstance);
    ctrl.keyDownMode = true;
    timeoutInstance = $timeout(function () {
      ctrl.keyDownMode = false;
    }, 300, false);
  }

    // Bind to keyboard shortcuts
  ctrl.searchInput.on('keydown', function(e) {

    var key = e.which;

    if (~[KEY.ENTER,KEY.ESC].indexOf(key)){
      e.preventDefault();
      e.stopPropagation();
    }

    if (KEY.TAB === key && ctrl.multiple) {
      (ctrl.open && ctrl.activeIndex > -1) ? e.preventDefault() : ctrl.close();
    }

    // if(~[KEY.ESC,KEY.TAB].indexOf(key)){
    //   //TODO: SEGURO?
    //   ctrl.close();
    // }

    $scope.$apply(function() {

      var tagged = false;

      if (ctrl.items.length > 0 || ctrl.tagging.isActivated) {
        if (!ctrl.interceptChoiceKeydownEvent || !ctrl.interceptChoiceKeydownEvent($scope.$parent, {$event: e, $select: ctrl})) {
          _handleSelection(key, e);
        }
        if ( ctrl.taggingTokens.isActivated ) {
          for (var i = 0; i < ctrl.taggingTokens.tokens.length; i++) {
            // ,를 구분자로 넣으면 <와 ,를 구분하지 못해서 버그가 생기므로 이를 해결하기 위해 shiftKey를 눌렀는지 확인
            if ( ctrl.taggingTokens.tokens[i] === KEY.MAP[e.keyCode] && !e.shiftKey ) {
              // make sure there is a new value to push via tagging
              if ( ctrl.search.length > 0 ) {
                tagged = true;
              }
            }
          }
          if ( tagged ) {
            $timeout(function() {
              ctrl.searchInput.triggerHandler('tagged');
              var newItem = ctrl.search.replace(KEY.MAP[e.keyCode],'').trim();
              if ( ctrl.tagging.fct ) {
                newItem = ctrl.tagging.fct( newItem );
              }
              if (newItem) {
                ctrl.activeIndex = 0; // 선택이 안되는 버그 수정 패치코드
                ctrl.select(newItem, {skipFocusser: true});
              }
            });
          }
        }
      }

    });

    if(KEY.isVerticalMovement(key) && ctrl.items.length > 0){
      ctrl.ensureHighlightVisible();
    }

    if (key === KEY.ENTER || key === KEY.ESC) {
      e.preventDefault();
      e.stopPropagation();
    }

  });

  function _pasteData(el, data) {
    var value = el.value;
    if(angular.isNumber(el.selectionStart)) {
      var startPos = el.selectionStart,
        endPos = el.selectionEnd,
        result = value.slice(0, startPos) + data + value.slice(endPos);
      startPos += data.length;
      endPos = startPos;
      return {
        result: result,
        startPos: startPos,
        endPos: endPos
      };
    }
    // selectionStart is not supported in IE8 and we don't want hacky workarounds so we compromise
    else return {
      result: value + data
    };
  }

  ctrl.searchInput.on('paste', function (e) {
    var data, result;

    if (window.clipboardData && window.clipboardData.getData) { // IE
      data = window.clipboardData.getData('Text');
    } else {
      data = (e.originalEvent || e).clipboardData.getData('text/plain');
    }

    // Prepend the current input field text to the paste buffer.
    result = _pasteData(e.target, data);
    data = result.result;

    if (data && data.length > 0) {
      // If tagging try to split by tokens and add items
      if (ctrl.taggingTokens.isActivated) {
        var items = ctrl.parseStringToTagMap(data);
        if (items.length === 0 ||
          (ctrl.taggingInvalid.isActivated && items.length === 1)) {
          ctrl.search = data || EMPTY_SEARCH;
        } else {
          ctrl.activeIndex = 0; // 선택이 안되는 버그 수정 패치코드
          ctrl.select(items, {skipFocusser: true});
          ctrl.search = EMPTY_SEARCH;
        }
        // var items = [];
        // for (var i = 0; i < ctrl.taggingTokens.tokens.length; i++) {  // split by first token that is contained in data
        //   var separator = KEY.toSeparator(ctrl.taggingTokens.tokens[i]) || ctrl.taggingTokens.tokens[i];
        //   if (data.indexOf(separator) > -1) {
        //     items = data.split(separator);
        //     break;  // only split by one token
        //   }
        // }
        // if (items.length === 0) {
        //   items = [data];
        // }
        // var oldsearch = ctrl.search;
        // angular.forEach(items, function (item) {
        //   var newItem = ctrl.tagging.fct ? ctrl.tagging.fct(item) : item;
        //   if (newItem) {
        //     ctrl.select(newItem, true);
        //   }
        // });
        // ctrl.search = oldsearch || EMPTY_SEARCH;
        e.preventDefault();
        e.stopPropagation();
      } else if (ctrl.paste) {
        ctrl.paste(data);
        ctrl.search = EMPTY_SEARCH;
        e.preventDefault();
        e.stopPropagation();
      } else {
        ctrl.search = data || EMPTY_SEARCH;
      }
      $scope.$applyAsync();
    }
  });

  ctrl.searchInput.on('tagged', function() {
    $timeout(function() {
      _resetSearchInput();
    }, 0, false);
  });

  // See https://github.com/ivaynberg/select2/blob/3.4.6/select2.js#L1431
  ctrl.ensureHighlightVisible = function () {
    var container = $element.querySelectorAll('.ui-select-choices-content');
    var choices = container && container[0] && container.querySelectorAll('.ui-select-choices-row');
    if (!choices || choices.length < 1 || ctrl.activeIndex < 0) {
      // throw uiSelectMinErr('choices', "Expected multiple .ui-select-choices-row but got '{0}'.", choices.length);
      return;
    }

    var highlighted = choices[ctrl.activeIndex];
    var posY = highlighted.offsetTop + highlighted.clientHeight - container[0].scrollTop;
    var height = container[0].offsetHeight;

    if (posY > height) {
      container[0].scrollTop += posY - height;
    } else if (posY < highlighted.clientHeight) {
      if (ctrl.isGrouped && ctrl.activeIndex === 0)
        container[0].scrollTop = 0; //To make group header visible when going all the way up
      else
        container[0].scrollTop -= highlighted.clientHeight - posY;
    }
  }

  // var onResize = $$uisDebounce(function() {
  //   ctrl.sizeSearchInput();
  // }, 50);
  //
  // angular.element($window).bind('resize', onResize);
  //
  // $scope.$on('$destroy', function() {
  //   ctrl.searchInput.off('keyup keydown tagged blur paste');
  //   angular.element($window).off('resize', onResize);
  // });

  var listener = function() {
    ctrl.sizeSearchInput();
  };
  $scope.$on('$destroy', function() {
    ctrl.searchInput.off('keyup keydown tagged blur paste');
    angular.element($window).unbind('resize', listener);
  });

  angular.element($window).bind('resize', listener);
}]);
