/*!
 * ui-select
 * http://github.com/angular-ui/ui-select
 * Version: 0.16.1 - 2020-06-19T08:26:49.035Z
 * License: MIT
 */


angular.module("ui.select").run(["$templateCache", function($templateCache) {$templateCache.put("bootstrap/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu\" role=\"listbox\" ng-show=\"$select.open\"><li class=\"ui-select-choices-group\" id=\"ui-select-choices-{{ $select.generatedId }}\"><div class=\"divider\" ng-show=\"$select.isGrouped && $index > 0\"></div><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label dropdown-header\" ng-bind=\"$group.name\"></div><div ng-attr-id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\" role=\"option\"><a href=\"\" class=\"ui-select-choices-row-inner\"></a></div></li></ul>");
$templateCache.put("bootstrap/match-multiple.tpl.html","<span class=\"ui-select-match\"><span ng-repeat=\"$item in $select.selected\"><span class=\"ui-select-match-item btn btn-default btn-xs\" tabindex=\"-1\" type=\"button\" ng-disabled=\"$select.disabled\" ng-click=\"$selectMultiple.activeMatchIndex = $index;\" ng-class=\"{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span class=\"close ui-select-match-close\" ng-hide=\"$select.disabled\" ng-click=\"$selectMultiple.removeChoice($index)\">&nbsp;&times;</span> <span uis-transclude-append=\"\"></span></span></span></span>");
$templateCache.put("bootstrap/match.tpl.html","<div class=\"ui-select-match\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\"><span tabindex=\"-1\" class=\"btn btn-default form-control ui-select-toggle\" aria-label=\"{{ $select.baseTitle }} activate\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activate()\" style=\"outline: 0;\"><span ng-show=\"$select.isEmpty()\" class=\"ui-select-placeholder text-muted\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"ui-select-match-text pull-left\" ng-class=\"{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}\" ng-transclude=\"\"></span> <i class=\"caret pull-right\" ng-click=\"$select.toggle($event)\"></i> <a ng-show=\"$select.allowClear && !$select.isEmpty()\" aria-label=\"{{ $select.baseTitle }} clear\" style=\"margin-right: 10px\" ng-click=\"$select.clear($event)\" class=\"btn btn-xs btn-link pull-right\"><i class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></i></a></span></div>");
$templateCache.put("bootstrap/no-choice.tpl.html","<ul class=\"ui-select-no-choice dropdown-menu\" ng-show=\"$select.items.length == 0\"><li ng-transclude=\"\"></li></ul>");
$templateCache.put("bootstrap/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control\" ng-class=\"{open: $select.open}\"><div><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=\"ui-select-search input-xs\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-click=\"$select.activate()\" ng-model=\"$select.search\" role=\"combobox\" aria-label=\"{{ $select.baseTitle }}\" ondrop=\"return false;\"></div><div class=\"ui-select-choices\"></div></div>");
$templateCache.put("bootstrap/select.tpl.html","<div class=\"ui-select-container ui-select-bootstrap dropdown\" ng-class=\"{open: $select.open}\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" aria-expanded=\"true\" aria-label=\"{{ $select.baseTitle }}\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"form-control ui-select-search\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-show=\"$select.searchEnabled && $select.open\"><div class=\"ui-select-choices\"></div><div class=\"ui-select-no-choice\"></div></div>");
$templateCache.put("select2/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content select2-results\"><li class=\"ui-select-choices-group\" ng-class=\"{\'select2-result-with-children\': $select.choiceGrouped($group) }\"><div ng-show=\"$select.choiceGrouped($group)\" class=\"ui-select-choices-group-label select2-result-label\" ng-bind=\"$group.name\"></div><ul role=\"listbox\" id=\"ui-select-choices-{{ $select.generatedId }}\" ng-class=\"{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }\"><li role=\"option\" ng-attr-id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}\"><div class=\"select2-result-label ui-select-choices-row-inner\"></div></li></ul></li></ul>");
$templateCache.put("select2/match-multiple.tpl.html","<span class=\"ui-select-match\"><li class=\"ui-select-match-item select2-search-choice\" ng-repeat=\"$item in $select.selected\" ng-class=\"{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span uis-transclude-append=\"\"></span> <a href=\"javascript:;\" class=\"ui-select-match-close select2-search-choice-close\" ng-click=\"$selectMultiple.removeChoice($index)\" tabindex=\"-1\"></a></li></span>");
$templateCache.put("select2/match.tpl.html","<a class=\"select2-choice ui-select-match\" ng-class=\"{\'select2-default\': $select.isEmpty()}\" ng-click=\"$select.toggle($event)\" aria-label=\"{{ $select.baseTitle }} select\"><span ng-show=\"$select.isEmpty()\" class=\"select2-chosen\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"select2-chosen\" ng-transclude=\"\"></span> <abbr ng-if=\"$select.allowClear && !$select.isEmpty()\" class=\"select2-search-choice-close\" ng-click=\"$select.clear($event)\"></abbr> <span class=\"select2-arrow ui-select-toggle\"><b></b></span></a>");
$templateCache.put("select2/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple select2 select2-container select2-container-multi\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}\"><ul class=\"select2-choices\"><span class=\"ui-select-match\"></span><li class=\"select2-search-field\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"select2-input ui-select-search\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-model=\"$select.search\" ng-click=\"$select.activate()\" style=\"width: 34px;\" ondrop=\"return false;\"></li></ul><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("select2/select.tpl.html","<div class=\"ui-select-container select2 select2-container\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}\"><div class=\"ui-select-match\"></div><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"select2-search\" ng-show=\"$select.searchEnabled\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"false\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"ui-select-search select2-input\" ng-model=\"$select.search\"></div><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("selectize/choices.tpl.html","<div ng-show=\"$select.open\" class=\"ui-select-choices ui-select-dropdown selectize-dropdown single\"><div class=\"ui-select-choices-content selectize-dropdown-content\"><div class=\"ui-select-choices-group optgroup\" role=\"listbox\"><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label optgroup-header\" ng-bind=\"$group.name\"></div><div role=\"option\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\"><div class=\"option ui-select-choices-row-inner\" data-selectable=\"\"></div></div></div></div></div>");
$templateCache.put("selectize/match.tpl.html","<div ng-hide=\"($select.open || $select.isEmpty())\" class=\"ui-select-match\" ng-transclude=\"\"></div>");
$templateCache.put("selectize/select.tpl.html","<div class=\"ui-select-container selectize-control single\" ng-class=\"{\'open\': $select.open}\"><div class=\"selectize-input\" ng-class=\"{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}\" ng-click=\"$select.open && !$select.searchEnabled ? $select.toggle($event) : $select.activate()\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" class=\"ui-select-search ui-select-toggle\" ng-click=\"$select.toggle($event)\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-hide=\"!$select.searchEnabled || ($select.selected && !$select.open)\" ng-disabled=\"$select.disabled\" aria-label=\"{{ $select.baseTitle }}\"></div><div class=\"ui-select-choices\"></div></div>");}]);
(function () { 
"use strict";

var isMacOS = /\bMac OS\b/.test(window.navigator.userAgent);
var KEY = {
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    HOME: 36,
    END: 35,
    BACKSPACE: 8,
    DELETE: 46,
    COMMAND: 91,
    COMPOSITION: 229,
    A: 65,
    C: 67,

    MAP: { 91 : "COMMAND", 8 : "BACKSPACE" , 9 : "TAB" , 13 : "ENTER" , 16 : "SHIFT" , 17 : "CTRL" , 18 : "ALT" , 19 : "PAUSEBREAK" , 20 : "CAPSLOCK" , 27 : "ESC" , 32 : "SPACE" , 33 : "PAGE_UP", 34 : "PAGE_DOWN" , 35 : "END" , 36 : "HOME" , 37 : "LEFT" , 38 : "UP" , 39 : "RIGHT" , 40 : "DOWN" , 43 : "+" , 44 : "PRINTSCREEN" , 45 : "INSERT" , 46 : "DELETE", 48 : "0" , 49 : "1" , 50 : "2" , 51 : "3" , 52 : "4" , 53 : "5" , 54 : "6" , 55 : "7" , 56 : "8" , 57 : "9" , 59 : ";", 61 : "=" , 65 : "A" , 66 : "B" , 67 : "C" , 68 : "D" , 69 : "E" , 70 : "F" , 71 : "G" , 72 : "H" , 73 : "I" , 74 : "J" , 75 : "K" , 76 : "L", 77 : "M" , 78 : "N" , 79 : "O" , 80 : "P" , 81 : "Q" , 82 : "R" , 83 : "S" , 84 : "T" , 85 : "U" , 86 : "V" , 87 : "W" , 88 : "X" , 89 : "Y" , 90 : "Z", 96 : "0" , 97 : "1" , 98 : "2" , 99 : "3" , 100 : "4" , 101 : "5" , 102 : "6" , 103 : "7" , 104 : "8" , 105 : "9", 106 : "*" , 107 : "+" , 109 : "-" , 110 : "." , 111 : "/", 112 : "F1" , 113 : "F2" , 114 : "F3" , 115 : "F4" , 116 : "F5" , 117 : "F6" , 118 : "F7" , 119 : "F8" , 120 : "F9" , 121 : "F10" , 122 : "F11" , 123 : "F12", 144 : "NUMLOCK" , 145 : "SCROLLLOCK" , 186 : ";" , 187 : "=" , 188 : "," , 189 : "-" , 190 : "." , 191 : "/" , 192 : "`" , 219 : "[" , 220 : "\\" , 221 : "]" , 222 : "'"
    },

    isControl: function (e) {
        var k = e.which;
        switch (k) {
        case KEY.COMMAND:
        case KEY.SHIFT:
        case KEY.CTRL:
        case KEY.ALT:
            return true;
        }

        if (e.metaKey || e.ctrlKey || e.altKey) return true;

        return false;
    },
    isFunctionKey: function (k) {
        k = k.which ? k.which : k;
        return k >= 112 && k <= 123;
    },
    isCompositionKey: function (event) {
      return event.which === KEY.COMPOSITION;
    },
    isVerticalMovement: function (k){
      return ~[KEY.UP, KEY.DOWN].indexOf(k);
    },
    isAllowControlKey: function (k){
      return ~[KEY.LEFT,KEY.RIGHT,KEY.BACKSPACE,KEY.DELETE].indexOf(k);
    },
    isSelectAll: function (event, k) {
      return this.isPressedCtrlKey(event) && k === KEY.A;
    },
    isCopy: function (event, k) {
      return this.isPressedCtrlKey(event) && k === KEY.C;
    },
    isPressedCtrlKey: function (event) {
      return isMacOS ? event.metaKey : event.ctrlKey;
    },
    toSeparator: function (k) {
      var sep = {ENTER:"\n",TAB:"\t",SPACE:" "}[k];
      if (sep) return sep;
      // return undefined for special keys other than enter, tab or space.
      // no way to use them to cut strings.
      return KEY[k] ? undefined : k;
    }
  };

//https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
var UTIL = {
  copyToClipboard: function(text) {
    if (window.clipboardData && window.clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      } catch (ex) {
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }
};

/**
 * Add querySelectorAll() to jqLite.
 *
 * jqLite find() is limited to lookups by tag name.
 * TODO This will change with future versions of AngularJS, to be removed when this happens
 *
 * See jqLite.find - why not use querySelectorAll? https://github.com/angular/angular.js/issues/3586
 * See feat(jqLite): use querySelectorAll instead of getElementsByTagName in jqLite.find https://github.com/angular/angular.js/pull/3598
 */
if (angular.element.prototype.querySelectorAll === undefined) {
  angular.element.prototype.querySelectorAll = function(selector) {
    return angular.element(this[0].querySelectorAll(selector));
  };
}

/**
 * Add closest() to jqLite.
 */
if (angular.element.prototype.closest === undefined) {
  angular.element.prototype.closest = function( selector) {
    var elem = this[0];
    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

    while (elem) {
      if (matchesSelector.bind(elem)(selector)) {
        return elem;
      } else {
        elem = elem.parentElement;
      }
    }
    return false;
  };
}

var latestId = 0;

var uis = angular.module('ui.select', [])

.constant('uiSelectConfig', {
  theme: 'bootstrap',
  searchEnabled: true,
  sortable: false,
  placeholder: '', // Empty by default, like HTML tag <select>
  refreshDelay: 1000, // In milliseconds
  closeOnSelect: true,
  skipFocusser: false,
  dropdownPosition: 'auto',
  generateId: function() {
    return latestId++;
  },
  appendToBody: false
})

// See Rename minErr and make it accessible from outside https://github.com/angular/angular.js/issues/6913
.service('uiSelectMinErr', function() {
  var minErr = angular.$$minErr('ui.select');
  return function() {
    var error = minErr.apply(this, arguments);
    var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');
    return new Error(message);
  };
})

// Recreates old behavior of ng-transclude. Used internally.
.directive('uisTranscludeAppend', function () {
  return {
    link: function (scope, element, attrs, ctrl, transclude) {
        transclude(scope, function (clone) {
          element.append(clone);
          element.removeAttr('uis-transclude-append');
        }, null, attrs.uisTranscludeAppend);
      }
    };
})

/**
 * Highlights text that matches $select.search.
 *
 * Taken from AngularUI Bootstrap Typeahead
 * See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L340
 */
.filter('highlight', function() {
  function escapeRegexp(queryToEscape) {
    return ('' + queryToEscape).replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  return function(matchItem, query) {
    return query && matchItem ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
  };
})

/**
 * A read-only equivalent of jQuery's offset function: http://api.jquery.com/offset/
 *
 * Taken from AngularUI Bootstrap Position:
 * See https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js#L70
 */
.factory('uisOffset',
  ['$document', '$window',
  function ($document, $window) {

  return function(element) {
    var boundingClientRect = element[0].getBoundingClientRect();
    return {
      width: boundingClientRect.width || element.prop('offsetWidth'),
      height: boundingClientRect.height || element.prop('offsetHeight'),
      top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
      left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
    };
  };
}]);

//TODO: 현재는 IE에서 Dragimage 설정 불가
window.setDragImageIEPreload = function(image) {
  var bodyEl,
    preloadEl;

  bodyEl = document.body;

  // create the element that preloads the  image
  preloadEl = document.createElement('div');
  preloadEl.style.background = 'url("' + image.src + '")';
  preloadEl.style.position = 'absolute';
  preloadEl.style.opacity = 0.001;

  bodyEl.appendChild(preloadEl);

  // after it has been preloaded, just remove the element so it won't stay forever in the DOM
  setTimeout(function() {
    bodyEl.removeChild(preloadEl);
  }, 5000);
};

// if the setDragImage is not available, implement it
if ('function' !== typeof DataTransfer.prototype.setDragImage) {
  DataTransfer.prototype.setDragImage = function(image, offsetX, offsetY) {
    var randomDraggingClassName,
      dragStylesCSS,
      dragStylesEl,
      headEl,
      parentFn,
      eventTarget;

    // generate a random class name that will be added to the element
    randomDraggingClassName = 'setdragimage-ie-dragging-' + Math.round(Math.random() * Math.pow(10, 5)) + '-' + Date.now();

    // prepare the rules for the random class
    dragStylesCSS = [
      '.' + randomDraggingClassName,
      '{',
      'background: url("' + image.src + '") no-repeat #fff 0 0 !important;',
      'width: ' + image.width + 'px !important;',
      'height: ' + image.height + 'px !important;',
      'text-indent: -9999px !important;',
      'border: 0 !important;',
      'outline: 0 !important;',
      '}',
      '.' + randomDraggingClassName + ' * {',
      'display: none !important;',
      '}'
    ];
    // create the element and add it to the head of the page
    dragStylesEl = document.createElement('style');
    dragStylesEl.innerText = dragStylesCSS.join('');
    headEl = document.getElementsByTagName('head')[0];
    headEl.appendChild(dragStylesEl);

    //TODO: strict 모드에서 caller호출 불가로 인해 주석처리
    /*
	since we can't get the target element over which the drag start event occurred
	(because the `this` represents the DataTransfer object and not the element),
	we will walk through the parents of the current functions until we find one
	whose first argument is a drag event
	 */
    // parentFn = DataTransfer.prototype.setDragImage.caller;
    // while (!(parentFn.arguments[0] instanceof DragEvent)) {
    //     parentFn = parentFn.caller;
    // }
    //
    // // then, we get the target element from the event (event.target)
    // eventTarget = parentFn.arguments[0].target;
    // // and add the class we prepared to it
    // eventTarget.classList.add(randomDraggingClassName);
    //
    // /* immediately after adding the class, we remove it. in this way the browser will
    // have time to make a snapshot and use it just so it looks like the drag element */
    // setTimeout(function() {
    //     // remove the styles
    //     headEl.removeChild(dragStylesEl);
    //     // remove the class
    //     eventTarget.classList.remove(randomDraggingClassName);
    // }, 0);
  };
}

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
        if (
          !isNaN(ctrl.maximumInputLength) &&
          data && data.length && data.length > ctrl.maximumInputLength
        ) {
          data = data.substr(0, ctrl.maximumInputLength);
        }
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

uis.directive('uiSelect',
  ['$document', 'uiSelectConfig', 'uiSelectMinErr', 'uisOffset', '$compile', '$parse', '$timeout', '$window',
  function($document, uiSelectConfig, uiSelectMinErr, uisOffset, $compile, $parse, $timeout, $window) {

  return {
    restrict: 'EA',
    templateUrl: function(tElement, tAttrs) {
      var theme = tAttrs.theme || uiSelectConfig.theme;
      return tAttrs.templateUrl || theme + (
        angular.isDefined(tAttrs.multiple) ? angular.isDefined(tAttrs.toggleChoice) ? '/select-multiple.btn.tpl.html' : '/select-multiple.tpl.html' : '/select.tpl.html'
      );
    },
    replace: true,
    transclude: true,
    require: ['uiSelect', '^ngModel'],
    scope: true,

    controller: 'uiSelectCtrl',
    controllerAs: '$select',
    compile: function(tElement, tAttrs) {

      // Allow setting ngClass on uiSelect
      var match = /{(.*)}\s*{(.*)}/.exec(tAttrs.ngClass);
      if(match) {
        var combined = '{'+ match[1] +', '+ match[2] +'}';
        tAttrs.ngClass = combined;
        tElement.attr('ng-class', combined);
      }

      //Multiple or Single depending if multiple attribute presence
      if (angular.isDefined(tAttrs.multiple))
        tElement.append('<ui-select-multiple/>').removeAttr('multiple');
      else
        tElement.append('<ui-select-single/>');

      if (tAttrs.inputId)
        tElement.querySelectorAll('input.ui-select-search')[0].id = tAttrs.inputId;

      return function(scope, element, attrs, ctrls, transcludeFn) {

        var $select = ctrls[0];
        var ngModel = ctrls[1];

        $select.$el = element;
        $select.generatedId = uiSelectConfig.generateId();
        $select.baseTitle = attrs.title || 'Select box';
        $select.focusserTitle = $select.baseTitle + ' focus';
        $select.focusserId = 'focusser-' + $select.generatedId;

        $select.closeOnSelect = function() {
          if (angular.isDefined(attrs.closeOnSelect)) {
            return $parse(attrs.closeOnSelect)();
          } else {
            return uiSelectConfig.closeOnSelect;
          }
        }();

        scope.$watch('skipFocusser', function() {
            var skipFocusser = $select.toggleChoice || scope.$eval(attrs.skipFocusser);
            $select.skipFocusser = skipFocusser !== undefined ? skipFocusser : uiSelectConfig.skipFocusser;
        });

        $select.toggleChoice = angular.isDefined(attrs.toggleChoice);
        $select.onSelectCallback = $parse(attrs.onSelect);
        $select.onRemoveCallback = $parse(attrs.onRemove);
        $select.onCopyItemsCallback = $parse(attrs.onCopyItems);

        // 기존의 tag가 같은지 비교를 angular.equals로만 비교했었으나 외부에서 주입할 수 있도록 수정
        $select.isEqual = attrs.isEqualModel ?
          _makeCustomEqualFunc(attrs.isEqualModel) :
          function (value, other) {
            return angular.equals(value, other);
          };

        var isPrevActiveCallback = angular.isDefined(attrs.isPrevActive) && $parse(attrs.isPrevActive);
        $select.isPrevActive = function(itemIndex, item) {
          return isPrevActiveCallback ? isPrevActiveCallback(scope, {prevActiveIndex: $select.prevActiveIndex, itemIndex: itemIndex, item: item}) :
            $select.prevActiveIndex === itemIndex;
        };

        function _makeCustomEqualFunc(isEqualModelString) {
          $select.hasCustomEqual = true;
          var isEqualModelCallback = $parse(isEqualModelString);
          // (가 있으면 콜백 함수로 가정
          return isEqualModelString.indexOf('(') === -1 ?
            function (value, other) {
              return angular.isObject(value) ? value[isEqualModelString] === other[isEqualModelString] : angular.equals(value, other);
            } :
            function (value, other) {
              return isEqualModelCallback(scope.$parent, {value: value, other: other});
            };
        }

        //Limit the number of selections allowed
        $select.limit = (angular.isDefined(attrs.limit)) ? parseInt(attrs.limit, 10) : undefined;

        //Set reference to ngModel from uiSelectCtrl
        $select.ngModel = ngModel;

        $select.choiceGrouped = function(group){
          return $select.isGrouped && group && group.name;
        };

        if(attrs.tabindex){
          attrs.$observe('tabindex', function(value) {
            $select.focusInput.attr('tabindex', value);
            element.removeAttr('tabindex');
          });
        }

        // attribute 가 설정되어 있으면 true
        $select.resetOnEsc = attrs.resetOnEsc;

        attrs.$observe('searchEnabled', function () {
          $select.searchEnabled = attrs.searchEnabled !== undefined ? $parse(attrs.searchEnabled)(scope.$parent) : uiSelectConfig.searchEnabled;
        });

        scope.$watch('sortable', function() {
            var sortable = scope.$eval(attrs.sortable);
            $select.sortable = sortable !== undefined ? sortable : uiSelectConfig.sortable;
        });

        attrs.$observe('disabled', function() {
          // No need to use $eval() (thanks to ng-disabled) since we already get a boolean instead of a string
          $select.disabled = attrs.disabled !== undefined ? attrs.disabled : false;
        });

        attrs.$observe('resetSearchInput', function() {
          // $eval() is needed otherwise we get a string instead of a boolean
          var resetSearchInput = scope.$eval(attrs.resetSearchInput);
          $select.resetSearchInput = resetSearchInput !== undefined ? resetSearchInput : true;
        });

        attrs.$observe('paste', function() {
          $select.paste = scope.$eval(attrs.paste);
        });

        attrs.$observe('tagging', function() {
          if(attrs.tagging !== undefined)
          {
            // $eval() is needed otherwise we get a string instead of a boolean
            var taggingEval = scope.$eval(attrs.tagging);
            $select.tagging = {isActivated: true, fct: taggingEval !== true ? taggingEval : undefined};
          }
          else
          {
            $select.tagging = {isActivated: false, fct: undefined};
          }
        });

        attrs.$observe('taggingInvalid', function () {
          if (attrs.taggingInvalid !== undefined) {
            var taggingInvalidEval = scope.$eval(attrs.taggingInvalid);
            $select.taggingInvalid = {isActivated: true, value: taggingInvalidEval};
          } else {
            $select.taggingInvalid = {isActivated: false, value: undefined};
          }
        });

        attrs.$observe('taggingLabel', function() {
          if(attrs.tagging !== undefined )
          {
            // check eval for FALSE, in this case, we disable the labels
            // associated with tagging
            if ( attrs.taggingLabel === 'false' ) {
              $select.taggingLabel = false;
            }
            else
            {
              $select.taggingLabel = attrs.taggingLabel !== undefined ? attrs.taggingLabel : '(new)';
            }
          }
        });

        attrs.$observe('taggingTokens', function() {
          if (attrs.tagging !== undefined) {
            var tokens = attrs.taggingTokens !== undefined ? attrs.taggingTokens.split('|') : [',','ENTER'];
            $select.taggingTokens = {isActivated: true, tokens: tokens };
          }
        });

        attrs.$observe('interceptMatchKeydownEvent', function() {
          if (attrs.interceptMatchKeydownEvent) {
            $select.interceptMatchKeydownEvent = $parse(attrs.interceptMatchKeydownEvent);
          }
        });

        attrs.$observe('interceptChoiceKeydownEvent', function() {
          if (attrs.interceptChoiceKeydownEvent) {
            $select.interceptChoiceKeydownEvent = $parse(attrs.interceptChoiceKeydownEvent);
          }
        });

        //Automatically gets focus when loaded
        if (angular.isDefined(attrs.autofocus)){
          $timeout(function(){
            $select.setFocus();
          }, 0, false);
        }

        //Gets focus based on scope event name (e.g. focus-on='SomeEventName')
        if (angular.isDefined(attrs.focusOn)){
          scope.$on(attrs.focusOn, function() {
              $timeout(function(){
                $select.setFocus();
              }, 0, false);
          });
        }

        function onDocumentClick(e) {
          if (!$select.open) return; //Skip it if dropdown is close

          var contains = false;

          if (window.jQuery) {
            // Firefox 3.6 does not support element.contains()
            // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
            contains = window.jQuery.contains(element[0], e.target);
          } else {
            contains = element[0].contains(e.target);
          }

          if (!contains && !$select.clickTriggeredSelect) {
            var skipFocusser;
            if (!$select.skipFocusser) {
              //Will lose focus only with certain targets
              var focusableControls = ['input','button','textarea','select'];
              var targetController = angular.element(e.target).controller('uiSelect'); //To check if target is other ui-select
              skipFocusser = targetController && targetController !== $select; //To check if target is other ui-select
              if (!skipFocusser && e.target.tagName) skipFocusser =  ~focusableControls.indexOf(e.target.tagName.toLowerCase()); //Check if target is input, button or textarea
            } else {
              skipFocusser = true;
            }
            $select.close({skipFocusser: skipFocusser});
            scope.$digest();
          }
          $select.clickTriggeredSelect = false;
        }

        // See Click everywhere but here event http://stackoverflow.com/questions/12931369
        $document.on('click', onDocumentClick);

        scope.$on('$destroy', function() {
          $document.off('click', onDocumentClick);
        });

        // Move transcluded elements to their correct position in main template
        transcludeFn(scope, function(clone) {
          // See Transclude in AngularJS http://blog.omkarpatil.com/2012/11/transclude-in-angularjs.html

          // One day jqLite will be replaced by jQuery and we will be able to write:
          // var transcludedElement = clone.filter('.my-class')
          // instead of creating a hackish DOM element:
          var transcluded = angular.element('<div>').append(clone);

          var transcludedMatch = transcluded.querySelectorAll('.ui-select-match');
          transcludedMatch.removeAttr('ui-select-match'); //To avoid loop in case directive as attr
          transcludedMatch.removeAttr('data-ui-select-match'); // Properly handle HTML5 data-attributes
          if (transcludedMatch.length !== 1) {
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-match but got '{0}'.", transcludedMatch.length);
          }
          element.querySelectorAll('.ui-select-match').replaceWith(transcludedMatch);

          var transcludedChoices = transcluded.querySelectorAll('.ui-select-choices');
          transcludedChoices.removeAttr('ui-select-choices'); //To avoid loop in case directive as attr
          transcludedChoices.removeAttr('data-ui-select-choices'); // Properly handle HTML5 data-attributes
          if (transcludedChoices.length !== 1) {
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-choices but got '{0}'.", transcludedChoices.length);
          }
          element.querySelectorAll('.ui-select-choices').replaceWith(transcludedChoices);

          var transcludedHeader = transcluded.querySelectorAll('.ui-select-header');
          transcludedHeader.removeAttr('ui-select-header'); // To avoid loop in case directive as attr
          transcludedHeader.removeAttr('data-ui-select-header'); // Properly handle HTML5 data-attributes
          if (transcludedHeader.length == 1) {
            element.querySelectorAll('.ui-select-header').replaceWith(transcludedHeader);
          } else {
            element.querySelectorAll('.ui-select-header').remove();
          }

          var transcludedFooter = transcluded.querySelectorAll('.ui-select-footer');
          transcludedFooter.removeAttr('ui-select-footer'); // To avoid loop in case directive as attr
          transcludedFooter.removeAttr('data-ui-select-footer'); // Properly handle HTML5 data-attributes
          if (transcludedFooter.length == 1) {
            element.querySelectorAll('.ui-select-footer').replaceWith(transcludedFooter);
          } else {
            element.querySelectorAll('.ui-select-footer').remove();
          }
        });

        //Debounce - avoid Frequent Events when append to body
        var _winResizeDelayPromise;
        function windowResizeHandler() {
          $timeout.cancel(_winResizeDelayPromise);
          if ($select.open) {
            _winResizeDelayPromise = $timeout(function () {
              resetDropdown();
              positionDropdown();
            }, 50, false);
          }
        }

        // Support for appending the select field to the body when its open
        var appendToBody = scope.$eval(attrs.appendToBody);
        if (appendToBody !== undefined ? appendToBody : uiSelectConfig.appendToBody) {
          angular.element($window).on('resize', windowResizeHandler);
          scope.$watch('$select.open', function(isOpen) {
            if (isOpen) {
              positionDropdown();
            } else {
              resetDropdown();
            }
          });

          // Move the dropdown back to its original location when the scope is destroyed. Otherwise
          // it might stick around when the user routes away or the select field is otherwise removed
          scope.$on('$destroy', function() {
            resetDropdown();
            angular.element($window).off('resize', windowResizeHandler);
          });
        }

        // Hold on to a reference to the .ui-select-container element for appendToBody support
        var placeholder = null,
            originalWidth = '';

        function positionDropdown() {
          // Remember the absolute position of the element
          var offset = uisOffset(element);

          // Clone the element into a placeholder element to take its original place in the DOM
          placeholder = angular.element('<div class="ui-select-placeholder"></div>');
          placeholder[0].style.width = offset.width + 'px';
          placeholder[0].style.height = offset.height + 'px';
          element.after(placeholder);

          // Remember the original value of the element width inline style, so it can be restored
          // when the dropdown is closed
          originalWidth = element[0].style.width;

          // Now move the actual dropdown element to the end of the body
          $document.find('body').append(element);

          element[0].style.position = 'absolute';
          element[0].style.left = offset.left + 'px';
          element[0].style.top = offset.top + 'px';
          element[0].style.width = offset.width + 'px';
        }

        function resetDropdown() {
          if (placeholder === null) {
            // The dropdown has not actually been display yet, so there's nothing to reset
            return;
          }

          // Move the dropdown element back to its original location in the DOM
          placeholder.replaceWith(element);
          placeholder = null;

          element[0].style.position = '';
          element[0].style.left = '';
          element[0].style.top = '';
          element[0].style.width = originalWidth;

          // Set focus back on to the moved element
          $select.setFocus();
        }

        // Hold on to a reference to the .ui-select-dropdown element for direction support.
        var dropdown = null,
            directionUpClassName = 'direction-up';

        // Support changing the direction of the dropdown if there isn't enough space to render it.
        scope.$watch('$select.open', function() {

          if ($select.dropdownPosition === 'auto' || $select.dropdownPosition === 'up'){
            scope.calculateDropdownPos();
          }

        });

        var setDropdownPosUp = function(offset, offsetDropdown){

          offset = offset || uisOffset(element);
          offsetDropdown = offsetDropdown || uisOffset(dropdown);

          dropdown[0].style.position = 'absolute';
          dropdown[0].style.top = (offsetDropdown.height * -1) + 'px';
          element.addClass(directionUpClassName);

        };

        var setDropdownPosDown = function(offset, offsetDropdown){

          element.removeClass(directionUpClassName);

          offset = offset || uisOffset(element);
          offsetDropdown = offsetDropdown || uisOffset(dropdown);

          dropdown[0].style.position = '';
          dropdown[0].style.top = '';

        };

        scope.calculateDropdownPos = function(){

          if ($select.open) {
            dropdown = angular.element(element).querySelectorAll('.ui-select-dropdown');
            if (dropdown.length === 0) {
              return;
            }

            // Hide the dropdown so there is no flicker until $timeout is done executing.
            dropdown[0].style.opacity = 0;

            // Delay positioning the dropdown until all choices have been added so its height is correct.
            $timeout(function(){

              if ($select.dropdownPosition === 'up'){
                  //Go UP
                  setDropdownPosUp();

              }else{ //AUTO

                element.removeClass(directionUpClassName);

                var offset = uisOffset(element);
                var offsetDropdown = uisOffset(dropdown);

                //https://code.google.com/p/chromium/issues/detail?id=342307#c4
                var scrollTop = $document[0].documentElement.scrollTop || $document[0].body.scrollTop; //To make it cross browser (blink, webkit, IE, Firefox).

                // Determine if the direction of the dropdown needs to be changed.
                if (offset.top + offset.height + offsetDropdown.height > scrollTop + $document[0].documentElement.clientHeight) {
                  //Go UP
                  setDropdownPosUp(offset, offsetDropdown);
                }else{
                  //Go DOWN
                  setDropdownPosDown(offset, offsetDropdown);
                }

              }

              // Display the dropdown once it has been positioned.
              dropdown[0].style.opacity = 1;
            }, 0, false);
          } else {
              if (dropdown === null || dropdown.length === 0) {
                return;
              }

              // Reset the position of the dropdown.
              dropdown[0].style.position = '';
              dropdown[0].style.top = '';
              element.removeClass(directionUpClassName);
          }
        };
      };
    }
  };
}]);

//추후 개발환경 세팅해서 file로 분리
uis.factory('uiSelectDragFactory', function () {
  return {}
});

//추후 개발환경 세팅해서 file로 분리
uis.directive('uiSelectMoveable', ['$timeout', 'uiSelectConfig', 'uiSelectMinErr', 'uiSelectDragFactory', function ($timeout, uiSelectConfig, uiSelectMinErr, uiSelectDragFactory) {
  return {
    require: 'uiSelect',
    link: function (scope, element, attrs, $select) {
      element.addClass('ui-select-moveable');
      //현재 select가 drag중인지 체크
      var isCurrentDragging = false,
        //드레그 한 아이템을 삽입할 위치
        dragoverItemIndex = null,

        //drag 데이터 타입
        DRAG_DATA_PREFIX = 'ui-select-item',
        //drag event를 걸 아이템
        DRAGGABLE_ITEM_CLASS = 'ui-select-match-item',

        //drop이 가능한지 ui에 표시
        DROPPABLE_CLASS = 'ui-select-droppable',
        DROPPABLE_IN_ITEM_CLASS = 'ui-select-droppable-in-item',

        //draging 클래스를 ui에 표시
        DRAGGING_CLASS = 'ui-select-dragging',

        //drop할 곳이 아이템의 왼쪽인지 오른쪽인지 ui에 표시
        DRAGOVER_LEFT = 'ui-select-item-drag-over-left',
        DRAGOVER_RIGHT = 'ui-select-item-drag-over-right';

      element.on('dragstart', '.' + DRAGGABLE_ITEM_CLASS, function (event) {
        event = event.originalEvent || event;
        var items = scope.$selectMultiple.getActiveItems(_getDragIndexes($(this).index()));
        isCurrentDragging = true;
        uiSelectDragFactory.idDragging = true;
        uiSelectDragFactory.dropComplete = false;
        uiSelectDragFactory.currentElement = false;
        dragoverItemIndex = 0;
        element[0].classList.add(DRAGGING_CLASS);

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setDragImage(_getDragImage(items.length), -10, -10);
        event.dataTransfer.setData('text', DRAG_DATA_PREFIX + JSON.stringify(items));
      });

      element.on('dragend', '.' + DRAGGABLE_ITEM_CLASS, function (event) {
        event = event.originalEvent || event;
        element[0].classList.remove(DRAGGING_CLASS);
        event.currentTarget.classList.remove(DRAGOVER_LEFT, DRAGOVER_RIGHT);

        if (uiSelectDragFactory.dropComplete && !uiSelectDragFactory.currentElement) {
          scope.$selectMultiple.removeChoice(_getDragIndexes($(this).index()));
          scope.$selectMultiple.activeMatchIndexes = [];
        }
        uiSelectDragFactory.idDragging = false;
        isCurrentDragging = false;
      });

      element.on('drop', '.' + DRAGGABLE_ITEM_CLASS, function (event) {
        event = event.originalEvent || event;
        element[0].classList.remove(DROPPABLE_IN_ITEM_CLASS);
        event.currentTarget.classList.remove(DRAGOVER_LEFT, DRAGOVER_RIGHT);
      });

      element.on('dragleave', '.' + DRAGGABLE_ITEM_CLASS, function (event) {
        event = event.originalEvent || event;
        element[0].classList.remove(DROPPABLE_IN_ITEM_CLASS);
        event.currentTarget.classList.remove(DRAGOVER_LEFT, DRAGOVER_RIGHT);
      });

      element.on('dragover', '.' + DRAGGABLE_ITEM_CLASS, function (event) {
        event = event.originalEvent || event;
        event.currentTarget.classList.remove(DRAGOVER_LEFT, DRAGOVER_RIGHT);

        if (uiSelectDragFactory.idDragging) {
          element[0].classList.add(DROPPABLE_IN_ITEM_CLASS);
          if (_getOffset(event) > (this.offsetWidth / 2)) {
            event.currentTarget.classList.add(DRAGOVER_RIGHT);
            dragoverItemIndex = $(this).index() + 1;
          } else {
            event.currentTarget.classList.add(DRAGOVER_LEFT);
            dragoverItemIndex = $(this).index();
          }
        }

        event.preventDefault();
        event.stopPropagation();
      });

      element.on('drop', function (event) {
        event = event.originalEvent || event;
        event.preventDefault();
        event.dataTransfer.dropEffect = "none";
        event.currentTarget.classList.remove(DROPPABLE_CLASS);

        if (!isAllowDrop(event)) {
          uiSelectDragFactory.dropComplete = false;
          return true;
        }

        uiSelectDragFactory.dropComplete = true;

        var items = JSON.parse(event.dataTransfer.getData('text').substr(DRAG_DATA_PREFIX.length)),
          option = {index: dragoverItemIndex};

        //같은 ui-select 내부
        if (isCurrentDragging) {
          uiSelectDragFactory.currentElement = true;
          option.smallerIndexNum = scope.$selectMultiple.activeMatchIndexes.filter(function (i) {
            return i < dragoverItemIndex
          }).length;
        }
        $select.activeIndex = 0; // 선택이 안되는 버그 수정 패치코드
        $select.select(items, option);
        dragoverItemIndex -= option.smallerIndexNum || 0;
        scope.$selectMultiple.activeMatchIndexes = _getMovedMatchIndex(items.length);
        event.stopPropagation();
      });

      element.on('dragenter', function (event) {
        event = event.originalEvent || event;
        event.preventDefault();
        if (uiSelectDragFactory.idDragging) {
          event.currentTarget.classList.add(DROPPABLE_CLASS);
        }
        return true;
      });


      element.on('dragleave', function (event) {
        event = event.originalEvent || event;
        event.preventDefault();
        event.currentTarget.classList.remove(DROPPABLE_CLASS);
        uiSelectDragFactory.dropComplete = false;
        return true;
      });

      element.on('dragover', function (event) {
        event = event.originalEvent || event;
        event.preventDefault();
        if (uiSelectDragFactory.idDragging) {
          event.currentTarget.classList.add(DROPPABLE_CLASS);
        }
        event.dataTransfer.dropEffect = "move";
        dragoverItemIndex = element.find('.' + DRAGGABLE_ITEM_CLASS).length;
        return true;
      });

      //dragged인 아이템이 같은 컴퍼넌트가 아니고 type이 ui-select일 경우
      function isAllowDrop(event) {
        var text = event.dataTransfer.getData('text');
        return text && (text.substr(0, DRAG_DATA_PREFIX.length) === DRAG_DATA_PREFIX);
      }

      scope.$on('$destroy', function () {
        element.off('dragstart');
        element.off('dragend');
        element.off('drop');
        element.off('dragenter');
        element.off('dragleave');
        element.off('dragover');
        element.off('dragstart', '.' + DRAGGABLE_ITEM_CLASS);
        element.off('dragend', '.' + DRAGGABLE_ITEM_CLASS);
        element.off('drop', '.' + DRAGGABLE_ITEM_CLASS);
        element.off('dragleave', '.' + DRAGGABLE_ITEM_CLASS);
        element.off('dragover', '.' + DRAGGABLE_ITEM_CLASS);
      });

      function _getDragIndexes(targetIndex) {
        if (scope.$selectMultiple.activeMatchIndexes.indexOf(targetIndex) < 0) {
          scope.$selectMultiple.activeMatchIndexes = [targetIndex]
        }
        return scope.$selectMultiple.activeMatchIndexes;
      }

      //TODO: option 으로 변경
      function _getDragImage(length) {
        var drag_icon = document.createElement("div");
        drag_icon.innerText = length;
        drag_icon.className = "drag-icon";
        drag_icon.style.position = "absolute";
        drag_icon.style.top = "-100px";
        drag_icon.style.right = "0px";
        drag_icon.style.padding = "5px 20px";
        drag_icon.style.background = "#384260";
        drag_icon.style.color = "#fff";
        drag_icon.style.zIndex = "9999";
        document.body.appendChild(drag_icon);
        return drag_icon;
      }

      function _getOffset(e) {
        return e.offsetX || e.layerX || (e.originalEvent ? e.originalEvent.offsetX : 0);
      }

      function _getMovedMatchIndex(length) {
        var list = [];
        for (var i = dragoverItemIndex; i < dragoverItemIndex + length; i++) {
          list.push(i);
        }
        return list;
      }
    }
  };
}]);

uis.directive('uiSelectFooter', ['uiSelectConfig', function (uiSelectConfig) {
  return {
    templateUrl: function (tElement) {
      // Needed so the uiSelect can detect the transcluded content
      tElement.addClass('ui-select-footer');

      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      return theme + '/footer.tpl.html';
    },
    restrict: 'EA',
    transclude: true,
    replace: true
  };
}]);

uis.directive('uiSelectHeader', ['uiSelectConfig', function (uiSelectConfig) {
  return {
    templateUrl: function (tElement) {
      // Needed so the uiSelect can detect the transcluded content
      tElement.addClass('ui-select-header');

      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      return theme + '/header.tpl.html';
    },
    restrict: 'EA',
    transclude: true,
    replace: true
  };
}]);

uis.directive('uiSelectMatch', ['uiSelectConfig', function(uiSelectConfig) {
  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    templateUrl: function(tElement, tAttrs) {
      // Needed so the uiSelect can detect the transcluded content
      tElement.addClass('ui-select-match');

      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      var multi = tElement.parent().attr('multiple');
      var toggleChoice = angular.isDefined(tElement.parent().attr('toggle-choice'));
      return tAttrs.templateUrl || theme + (multi ? (toggleChoice ? '/match-multiple.btn.tpl.html' : '/match-multiple.tpl.html') : '/match.tpl.html');
    },
    link: function(scope, element, attrs, $select) {
      $select.lockChoiceExpression = attrs.uiLockChoice;
      attrs.$observe('placeholder', function(placeholder) {
        $select.placeholder = placeholder !== undefined ? placeholder : uiSelectConfig.placeholder;
      });

      function setAllowClear(allow) {
        $select.allowClear = (angular.isDefined(allow)) ? (allow === '') ? true : (allow.toLowerCase() === 'true') : false;
      }

      attrs.$observe('allowClear', setAllowClear);
      setAllowClear(attrs.allowClear);

      if($select.multiple){
        $select.sizeSearchInput();
      }

    }
  };

  // function getAttribute(elem, attribute) {
  //   if (elem[0].hasAttribute(attribute))
  //     return elem.attr(attribute);
  //
  //   if (elem[0].hasAttribute('data-' + attribute))
  //     return elem.attr('data-' + attribute);
  //
  //   if (elem[0].hasAttribute('x-' + attribute))
  //     return elem.attr('x-' + attribute);
  // }
}]);

uis.directive('uiSelectMultiple', ['uiSelectMinErr', '$timeout', '$document', function (uiSelectMinErr, $timeout, $document) {
  return {
    restrict: 'EA',
    require: ['^uiSelect', '^ngModel'],

    controller: ['$scope', '$timeout', function ($scope, $timeout) {

      var ctrl = this,
        $select = $scope.$select,
        ngModel;

      if (angular.isUndefined($select.selected))
        $select.selected = [];

      //Wait for link fn to inject it
      $scope.$applyAsync(function () {
        ngModel = $scope.ngModel;
      });

      ctrl.activeMatchIndexes = [];
      ctrl.isPressShiftKey = false;
      ctrl.isPressCtrlKey = false;

      ctrl.updateModel = function () {
        ngModel.$setViewValue(Date.now()); //Set timestamp as a unique string to force changes
        ctrl.refreshComponent();
      };

      ctrl.refreshComponent = function () {
        //Remove already selected items
        //e.g. When user clicks on a selection, the selected array changes and
        //the dropdown should remove that item
        $select.refreshItems();
        $select.sizeSearchInput();
      };

      // Remove item from multiple select
      // option = {skipRemove, skipSync}
      // skipRemove: remove관련 동작을 수행하지 않음(selected도 수정되지 않음)
      // skipSync: sync관련 동작을 수행하지 않음(삭제는 수행)
      ctrl.removeChoice = function (indexes, option) {
        indexes = typeof indexes === 'number' ? [indexes] : indexes;
        option = option || {};

        var locals = {};
        $select.selected = $select.selected.filter(function (value, index) {
          if (indexes.indexOf(index) > -1) {
            var removedChoice = value;
            if (removedChoice._uiSelectChoiceLocked) {
              return true;
            }
            locals[$select.parserResult.itemName] = removedChoice;
            if (option.skipRemove) {
              return true;
            }
          } else {
            return true;
          }
        });

        if (!option.skipRemove) {
          $select.sizeSearchInput();
          ctrl.updateModel();
        }

        // Give some time for scope propagation.
        $timeout(function () {
          $select.onRemoveCallback($scope, {
            $model: $select.parserResult.modelMapper($scope, locals)
          });
        }, 0, false);
      };

      ctrl.getPlaceholder = function () {
        //Refactor single?
        if ($select.selected && $select.selected.length) return;
        return $select.placeholder;
      };

      ctrl.onKeydownEditInput = function (e) {
        var key = e.which;
        if (key === KEY.ENTER) {
          e.preventDefault();
          $select.searchInput.trigger('focus');
        }
      };

      ctrl.editItem = function (input, item, idx) {
        if ($select.selected[idx] === item) {
          var items = [];
          // 삭제나 추가되었을 때의 동작은 수행하지만 실제 selected값은 수행되지 않게 호출
          ctrl.removeChoice(idx, {skipRemove: true});
          if ($select.tagging.isActivated && input.length > 0) {
            items = $select.parseStringToTagMap(input);
            $select.activeIndex = 0; // 선택이 안되는 버그 수정 패치코드
            $select.select(items, {skipFocusser: true, skipAdd: true});
          }

          // 실제 selected값 변경 및 sync
          // select를 하면서 기존의 태그가 삭제되었을 수도 있어서 검증후 제거
          Array.prototype.splice.apply($select.selected, [idx, ($select.selected[idx] === item ? 1 : 0)].concat(items));
          $select.sizeSearchInput();
          ctrl.updateModel();
        }
      };

      ctrl.isActiveIndex = function (i) {
        return ctrl.activeMatchIndexes.indexOf(i) > -1;
      };

      ctrl.pushActiveMatchIndex = function (i) {
        if (!ctrl.isActiveIndex(i)) {
          ctrl.activeMatchIndexes.push(i);
        }
      };

      ctrl.toggleMatchIndex = function (i) {
        if (!ctrl.isActiveIndex(i)) {
          ctrl.activeMatchIndexes.push(i);
        } else {
          ctrl.activeMatchIndexes.splice(i, 1);
        }
      };

      ctrl.isInvalid = function (item) {
        return $select.taggingInvalid.isActivated && item[$select.taggingInvalid.value];
      };

      ctrl.getActiveItems = function (indexes) {
        ctrl.updateModel();
        return $select.selected.filter(function (v, i) {
          return indexes.indexOf(i) > -1;
        });
      };

      ctrl.activeItem = function (i) {
        $select.close();
        if (ctrl.isPressShiftKey && ctrl.activeMatchIndexes.length > 0) {
          var min = Math.min.apply(null, ctrl.activeMatchIndexes);
          var max = Math.min.apply(null, ctrl.activeMatchIndexes);
          if (i < min) {
            ctrl.activeItemInRange(i, min);
          } else if (i > max) {
            ctrl.activeItemInRange(max, i);
          } else {
            ctrl.activeItemInRange(min, max);
          }
        } else if (ctrl.isPressCtrlKey) {
          ctrl.pushActiveMatchIndex(i);
        } else {
          ctrl.activeMatchIndexes = [i];
        }
      };

      ctrl.activeItemInRange = function (start, end) {
        for (var i = start; i <= end; i++) {
          ctrl.pushActiveMatchIndex(i);
        }
      };

    }],
    controllerAs: '$selectMultiple',

    link: function (scope, element, attrs, ctrls) {

      var $select = ctrls[0];
      var ngModel = scope.ngModel = ctrls[1];
      var $selectMultiple = scope.$selectMultiple;

      //$select.selected = raw selected objects (ignoring any property binding)

      $select.multiple = true;
      $select.removeSelected = true;

      //Input that will handle focus
      $select.focusInput = $select.searchInput;

      //Properly check for empty if set to multiple
      ngModel.$isEmpty = function (value) {
        return !value || value.length === 0;
      };

      // TODO invalid tag를 결과에 포함하지 않기 위한 Fetch
      var viewValueCache = $select.selected.slice(),
        modelValueCache = [];

      //From view --> model
      ngModel.$parsers.unshift(function () {
        var locals = {},
          result,
          resultMultiple = [];

        if ($select.taggingInvalid.isActivated && angular.equals(viewValueCache, $select.selected)) {
          return modelValueCache.slice();
        }

        for (var j = $select.selected.length - 1; j >= 0; j--) {
          if ($select.taggingInvalid.isActivated && $select.selected[j][$select.taggingInvalid.value]) {
            // TODO invalid tag의 경우 result에 포함하지 않음
            continue;
          }
          locals = {};
          locals[$select.parserResult.itemName] = $select.selected[j];
          result = $select.parserResult.modelMapper(scope, locals);
          resultMultiple.unshift(result);
        }
        if ($select.taggingInvalid.isActivated) {
          viewValueCache = $select.selected.slice();
          modelValueCache = resultMultiple.slice();
        }
        return resultMultiple;
      });

      // From model --> view
      ngModel.$formatters.unshift(function (inputValue) {
        var data = $select.parserResult.source(scope, {$select: {search: ''}}), //Overwrite $search
          locals = {},
          result;
        if (!data) return inputValue;
        var resultMultiple = [];
        var checkFnMultiple = function (list, value) {
          if (!list || !list.length) return;
          for (var p = list.length - 1; p >= 0; p--) {
            locals[$select.parserResult.itemName] = list[p];
            result = $select.parserResult.modelMapper(scope, locals);
            if ($select.parserResult.trackByExp) {
              var propsItemNameMatches = /(\w*)\./.exec($select.parserResult.trackByExp);
              var matches = /\.([^\s]+)/.exec($select.parserResult.trackByExp);
              if (propsItemNameMatches && propsItemNameMatches.length > 0 && propsItemNameMatches[1] == $select.parserResult.itemName) {
                if (matches && matches.length > 0 && result[matches[1]] == value[matches[1]]) {
                  resultMultiple.unshift(list[p]);
                  return true;
                }
              }
            }
            if ($select.isEqual(result, value)) {
              resultMultiple.unshift(list[p]);
              return true;
            }
          }
          return false;
        };
        if (!inputValue) return resultMultiple; //If ngModel was undefined
        if ($select.taggingInvalid.isActivated && angular.equals(modelValueCache, inputValue)) return viewValueCache.slice(); // if ngModel이 이전과 변한게 없으면 이전 값 반환
        for (var k = inputValue.length - 1; k >= 0; k--) {
          //Check model array of currently selected items
          if (!checkFnMultiple($select.selected, inputValue[k])) {
            //Check model array of all items available
            if (!checkFnMultiple(data, inputValue[k])) {
              //If not found on previous lists, just add it directly to resultMultiple
              resultMultiple.unshift(inputValue[k]);
            }
          }
        }
        if ($select.taggingInvalid.isActivated) {
          modelValueCache = inputValue.slice();
          viewValueCache = resultMultiple.slice();
        }
        return resultMultiple;
      });

      //Watch for external model changes
      scope.$watchCollection(function () {
        return ngModel.$modelValue;
      }, function (newValue, oldValue) {
        if (oldValue != newValue) {
          ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
          $selectMultiple.refreshComponent();
        }
      });

      ngModel.$render = function () {
        // Make sure that model value is array
        if (!angular.isArray(ngModel.$viewValue)) {
          // Have tolerance for null or undefined values
          if (angular.isUndefined(ngModel.$viewValue) || ngModel.$viewValue === null) {
            $select.selected = [];
          } else {
            throw uiSelectMinErr('multiarr', "Expected model value to be array but got '{0}'", ngModel.$viewValue);
          }
        }
        $select.selected = ngModel.$viewValue;
        //$selectMultiple.refreshComponent();
        scope.$applyAsync(); //To force $digest
      };

      scope.$on('uis:select', function (event, item, index) {
        var dupIndex = $select.selected.findIndex( function (selection) { return $select.isEqual(selection, item); });
        if (dupIndex > -1) {
          if ($select.toggleChoice && index === undefined) {
            return $selectMultiple.removeChoice(dupIndex);
          }
          $select.selected.splice(dupIndex, 1);
        }

        if ($select.selected.length >= $select.limit) {
          return;
        }
        index === undefined ? $select.selected.push(item): $select.selected.splice(index, 0, item);
        $selectMultiple.updateModel();
      });

      scope.$on('uis:activate', function () {
        $selectMultiple.activeMatchIndexes = [];
      });

      scope.$watch('$select.disabled', function (newValue, oldValue) {
        // As the search input field may now become visible, it may be necessary to recompute its size
        if (oldValue && !newValue) $select.sizeSearchInput();
      });

      $select.searchInput.on('keydown', function (e) {
        var key = e.which,
          isSelectAll = KEY.isSelectAll(e, key);

        scope.$apply(function () {
          var processed = false;
          // var tagged = false; //Checkme
          if (isSelectAll) {
            processed = _selectAll();
          } else if ((e.which === KEY.LEFT || e.which === KEY.BACKSPACE) && $select.selected.length > 0) {
            processed = _selectLast();
          }
          if (processed && key != KEY.TAB) {
            //TODO Check si el tab selecciona aun correctamente
            //Crear test
            e.preventDefault();
            e.stopPropagation();
          }
        });
      });

      function _getCaretPosition(el) {
        if (angular.isNumber(el.selectionStart)) return el.selectionStart;
        // selectionStart is not supported in IE8 and we don't want hacky workarounds so we compromise
        else return el.value.length;
      }

      // Handles selected options in "multiple" mode
      function _handleMatchSelection(e) {
        if ($selectMultiple.activeMatchIndexes.length === 0) {
          return;
        }

        $select.close();

        var isMultiActive = e.shiftKey,
          key = e.which;

        var length = $select.selected.length,
          // none  = -1,
          first = 0,
          min = Math.min.apply(null, $selectMultiple.activeMatchIndexes),
          max = Math.max.apply(null, $selectMultiple.activeMatchIndexes),
          last = length - 1,
          curr = $selectMultiple.activeMatchIndexes[$selectMultiple.activeMatchIndexes.length - 1],
          next = Math.min(max + 1, last),
          prev = Math.max(min - 1, first),
          newIndex;

        function getNewActiveMatchIndex() {
          switch (key) {
            case KEY.LEFT:
              // Select previous/first item
              if (isMultiActive && $selectMultiple.isActiveIndex(curr - 1)) {
                return curr;
              } else {
                return prev;
              }
              break;
            case KEY.RIGHT:
              // Open drop-down
              if (isMultiActive && $selectMultiple.isActiveIndex(curr + 1)) {
                return curr;
              } else if (!isMultiActive && curr === last) {
                $select.searchInput.trigger('focus');
                $select.activate();
                return false;
              } else {
                return next;
              }
              break;
            case KEY.BACKSPACE:
              // Remove selected item and select previous/first
              $selectMultiple.removeChoice($selectMultiple.activeMatchIndexes);
              return prev;
              // Select last item
              break;
            case KEY.DELETE:
              // Remove selected item and select next item
              $selectMultiple.removeChoice($selectMultiple.activeMatchIndexes);
              return last;
              break;
          }
        }

        newIndex = getNewActiveMatchIndex();

        if (!$select.selected.length || newIndex === false) {
          $selectMultiple.activeMatchIndexes = [];
          $select.searchInput.trigger('focus');
          return;
        }

        if (isMultiActive) {
          $selectMultiple.toggleMatchIndex(newIndex);
        } else {
          $selectMultiple.activeMatchIndexes = [newIndex];
        }

        return true;
      }

      function _selectAll() {
        $selectMultiple.activeMatchIndexes = [];
        for (var i = 0; i < $select.selected.length; i++) {
          $selectMultiple.activeMatchIndexes.push(i);
        }
        $select.close();
        $select.searchInput.trigger('blur');
        return true;
      }

      function _selectLast() {
        var caretPosition = _getCaretPosition($select.searchInput[0]),
          searchLength = $select.search.length;
        if (!caretPosition && !searchLength) {
          $selectMultiple.activeMatchIndexes = [$select.selected.length - 1];
          $select.close();
          $select.searchInput.trigger('blur');
          return true;
        }
      }

      $select.searchInput.on('keyup', function (e) {

        // TODO: -1로 setting안되도록
        //if ( ! KEY.isVerticalMovement(e.which) ) {
        //  scope.$applyAsync( function () {
        //    $select.activeIndex = $select.taggingLabel === false ? -1 : 0;
        //  });
        //}
        // Push a "create new" item into array if there is a search string
        if ($select.tagging.isActivated && $select.search.length > 0) {

          // return early with these keys
          if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || KEY.isVerticalMovement(e.which) || KEY.isCompositionKey(e)) {
            return;
          }
          // always reset the activeIndex to the first item when tagging
          //$select.activeIndex = $select.taggingLabel === false ? -1 : 0;
          $select.activeIndex = 0; //TODO: taggingLabel이 flase여도 항상 0으로 세팅
          // taggingLabel === false bypasses all of this
          //if ($select.taggingLabel === false) return;

          // 하위로직 필요없어서 copy하기 전으로 소스 이동
          if ($select.tagging.fct !== undefined) {
            scope.$applyAsync(function () {
              $select.activeIndex = 0;
            });
            return;
            // TODO newItem 추가 관련 코드 제거
            // tagItems = $select.$filter('filter')(items,{'isTag': true});
            // if ( tagItems.length > 0 ) {
            //   tagItem = tagItems[0];
            // }
            // // remove the first element, if it has the `isTag` prop we generate a new one with each keyup, shaving the previous
            // if ( items.length > 0 && tagItem ) {
            //   hasTag = true;
            //   items = items.slice(1,items.length);
            //   stashArr = stashArr.slice(1,stashArr.length);
            // }
            // newItem = $select.tagging.fct($select.search);
            // if(!newItem) {//TODO: taging false일때 item이 없으면 생성 안되도록
            //   return;
            // }
            // // verify the new tag doesn't match the value of a possible selection choice or an already selected item.
            // if (
            //   stashArr.some(function (origItem) {
            //     return $select.isEqual(origItem, $select.tagging.fct($select.search));
            //   })
            // ) {
            //   scope.$applyAsync(function () {
            //     $select.activeIndex = 0;
            //     $select.items = items;
            //   });
            //   return;
            // }
            // newItem.isTag = true;
            // handle newItem string and stripping dupes in tagging string context
          }

          var items = angular.copy($select.items);
          var stashArr = angular.copy($select.items);
          var newItem;
          var item;
          var hasTag = false;
          var dupeIndex = -1;
          var tagItems;
          var tagItem;

          // case for object tagging via transform `$select.tagging.fct` function

          // find any tagging items already in the $select.items array and store them
          tagItems = $select.$filter('filter')(items, function (item) {
            return item.match($select.taggingLabel);
          });
          if (tagItems.length > 0) {
            tagItem = tagItems[0];
          }
          item = items[0];
          // remove existing tag item if found (should only ever be one tag item)
          if (item !== undefined && items.length > 0 && tagItem) {
            hasTag = true;
            items = items.slice(1, items.length);
            stashArr = stashArr.slice(1, stashArr.length);
          }
          newItem = $select.search + ' ' + $select.taggingLabel;
          if (_findApproxDupe($select.selected, $select.search) > -1) {
            return;
          }
          // verify the the tag doesn't match the value of an existing item from
          // the searched data set or the items already selected
          if (_findCaseInsensitiveDupe(stashArr.concat($select.selected))) {
            // if there is a tag from prev iteration, strip it / queue the change
            // and return early
            if (hasTag) {
              items = stashArr;
              scope.$applyAsync(function () {
                $select.activeIndex = 0;
                $select.items = items;
              });
            }
            return;
          }
          if (_findCaseInsensitiveDupe(stashArr)) {
            // if there is a tag from prev iteration, strip it
            if (hasTag) {
              $select.items = stashArr.slice(1, stashArr.length);
            }
            return;
          }

          if (hasTag) dupeIndex = _findApproxDupe($select.selected, newItem);
          // dupe found, shave the first item
          if (dupeIndex > -1) {
            items = items.slice(dupeIndex + 1, items.length - 1);
          } else {
            items = [newItem].concat(stashArr);
          }
          scope.$applyAsync(function () {
            $select.activeIndex = 0;
            $select.items = items;
          });
        }
      });

      function _findCaseInsensitiveDupe(arr) {
        if (arr === undefined || $select.search === undefined) {
          return false;
        }
        var hasDupe = arr.filter(function (origItem) {
          if ($select.search.toUpperCase() === undefined || origItem === undefined) {
            return false;
          }
          return origItem.toUpperCase() === $select.search.toUpperCase();
        }).length > 0;

        return hasDupe;
      }

      function _findApproxDupe(haystack, needle) {
        var dupeIndex = -1;
        if (angular.isArray(haystack)) {
          var tempArr = angular.copy(haystack);
          for (var i = 0; i < tempArr.length; i++) {
            // handle the simple string version of tagging
            if ($select.tagging.fct === undefined) {
              // search the array for the match
              if (tempArr[i] + ' ' + $select.taggingLabel === needle) {
                dupeIndex = i;
              }
              // handle the object tagging implementation
            } else {
              var mockObj = tempArr[i];
              if (angular.isObject(mockObj)) {
                mockObj.isTag = true;
              }
              if ($select.isEqual(mockObj, needle)) {
                dupeIndex = i;
              }
            }
          }
        }
        return dupeIndex;
      }

      function _copySelection() {
        var data = $select.onCopyItemsCallback(scope, {
          $items: $select.selected.filter(function (value, index) {
            return $selectMultiple.activeMatchIndexes.indexOf(index) > -1;
          })
        });
        if (data) {
          UTIL.copyToClipboard(data);
        }
      }

      if (!angular.isDefined(element.parent().attr('toggle-choice'))) {
        //Ctrl, Shift + 마우스를 통한 multi select
        $document.on('keydown', _onDocumentKeydown);
        $document.on('keyup', _toggleKeyPress);
      }
      $document.on('click', _onDocumentClick);

      function _toggleKeyPress(e) {
        $selectMultiple.isPressShiftKey = e.shiftKey;
        $selectMultiple.isPressCtrlKey = KEY.isPressedCtrlKey(e);
      }

      function _onDocumentKeydown(e) {
        _toggleKeyPress(e);
        if ($select.interceptMatchKeydownEvent && $select.interceptMatchKeydownEvent(scope.$parent, {
          $event: e, $select: $select, $selectMultiple: $selectMultiple
        })) {
          return;
        }
        if (KEY.isAllowControlKey(e.which)) {
          scope.$applyAsync(function () {
            _handleMatchSelection(e);
          });
        } else if (KEY.isCopy(e, e.which)) {
          _copySelection();
        }
      }

      function _onDocumentClick(e) {
        var contains = false;

        if (window.jQuery) {
          contains = window.jQuery.contains($select.$el[0], e.target);
        } else {
          contains = $select.$el[0].contains(e.target);
        }

        if (!contains) {
          scope.$applyAsync(function () {
            $selectMultiple.activeMatchIndexes = [];
          });
        }
      }

      scope.$on('$destroy', function () {
        $document.off('keydown', _onDocumentKeydown);
        $document.off('keyup', _toggleKeyPress);
        $document.off('click', _onDocumentClick);
      });
    }
  };
}]);

uis.directive('uiSelectNoChoice',
    ['uiSelectConfig', function (uiSelectConfig) {
        return {
            restrict: 'EA',
            require: '^uiSelect',
            replace: true,
            transclude: true,
            templateUrl: function (tElement) {
                // Gets theme attribute from parent (ui-select)
                var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
                return theme + '/no-choice.tpl.html';
            }
        };
    }]);
uis.directive('uiSelectSingle', ['$timeout','$compile', function($timeout, $compile) {
  return {
    restrict: 'EA',
    require: ['^uiSelect', '^ngModel'],
    link: function(scope, element, attrs, ctrls) {

      var $select = ctrls[0];
      var ngModel = ctrls[1];

      //From view --> model
      ngModel.$parsers.unshift(function (inputValue) {
        var locals = {},
            result;
        locals[$select.parserResult.itemName] = inputValue;
        result = $select.parserResult.modelMapper(scope, locals);
        return result;
      });

      //From model --> view
      ngModel.$formatters.unshift(function (inputValue) {
        var data = $select.parserResult.source (scope, { $select : {search:''}}), //Overwrite $search
            locals = {},
            result;
        if (data){
          var checkFnSingle = function(d){
            locals[$select.parserResult.itemName] = d;
            result = $select.parserResult.modelMapper(scope, locals);
            return result == inputValue;
          };
          //If possible pass same object stored in $select.selected
          if ($select.selected && checkFnSingle($select.selected)) {
            return $select.selected;
          }
          for (var i = data.length - 1; i >= 0; i--) {
            if (checkFnSingle(data[i])) return data[i];
          }
        }
        return inputValue;
      });

      //Update viewValue if model change
      scope.$watch('$select.selected', function(newValue) {
        if (ngModel.$viewValue !== newValue) {
          ngModel.$setViewValue(newValue);
        }
      });

      ngModel.$render = function() {
        $select.selected = ngModel.$viewValue;
      };

      scope.$on('uis:select', function (event, item) {
        $select.selected = item;
      });

      scope.$on('uis:close', function (event, skipFocusser) {
        $timeout(function(){
          $select.focusser.prop('disabled', false);
          if (!skipFocusser) $select.focusser[0].focus();
        },0,false);
      });

      scope.$on('uis:activate', function () {
        focusser.prop('disabled', true); //Will reactivate it on .close()
      });

      //Idea from: https://github.com/ivaynberg/select2/blob/79b5bf6db918d7560bdd959109b7bcfb47edaf43/select2.js#L1954
      var focusser = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");
      $compile(focusser)(scope);
      $select.focusser = focusser;

      //Input that will handle focus
      $select.focusInput = focusser;

      element.parent().append(focusser);
      focusser.bind("focus", function(){
        scope.$applyAsync(function(){
          $select.focus = true;
        });
      });
      focusser.bind("blur", function(){
        scope.$applyAsync(function(){
          $select.focus = false;
        });
      });
      focusser.bind("keydown", function(e){

        if (e.which === KEY.BACKSPACE) {
          e.preventDefault();
          e.stopPropagation();
          $select.select(undefined);
          scope.$applyAsync();
          return;
        }

        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || KEY.isCompositionKey(e) || KEY.isCompositionKey(e)) {
          return;
        }

        if (e.which == KEY.DOWN  || e.which == KEY.UP || e.which == KEY.ENTER || e.which == KEY.SPACE){
          e.preventDefault();
          e.stopPropagation();
          $select.activate();
        }

        scope.$digest();
      });

      focusser.bind("keyup input", function(e){

        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || e.which == KEY.ENTER || e.which === KEY.BACKSPACE) {
          return;
        }

        $select.activate(focusser.val()); //User pressed some regular key, so we pass it to the search input
        focusser.val('');
        scope.$digest();

      });
      scope.$on('$destroy', function () {
        focusser.unbind('focus');
        focusser.unbind('blur');
        focusser.unbind('keydown');
        focusser.unbind('keyup input');
      });


    }
  };
}]);

/**
 * Debounces functions
 *
 * Taken from UI Bootstrap $$debounce source code
 * See https://github.com/angular-ui/bootstrap/blob/master/src/debounce/debounce.js
 *
 */
uis.factory('$$uisDebounce', ['$timeout', function($timeout) {
  return function(callback, debounceTime) {
    var timeoutPromise;

    return function() {
      var self = this;
      var args = Array.prototype.slice.call(arguments);
      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise);
      }

      timeoutPromise = $timeout(function() {
        callback.apply(self, args);
      }, debounceTime);
    };
  };
}]);

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

/**
 * Parses "repeat" attribute.
 *
 * Taken from AngularJS ngRepeat source code
 * See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L211
 *
 * Original discussion about parsing "repeat" attribute instead of fully relying on ng-repeat:
 * https://github.com/angular-ui/ui-select/commit/5dd63ad#commitcomment-5504697
 */

uis.service('uisRepeatParser', ['uiSelectMinErr','$parse', function(uiSelectMinErr, $parse) {
  var self = this;

  /**
   * Example:
   * expression = "address in addresses | filter: {street: $select.search} track by $index"
   * itemName = "address",
   * source = "addresses | filter: {street: $select.search}",
   * trackByExp = "$index",
   */
  self.parse = function(expression) {


    var match;
    //var isObjectCollection = /\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)/.test(expression);
    // If an array is used as collection

    // if (isObjectCollection){
    // 000000000000000000000000000000111111111000000000000000222222222222220033333333333333333333330000444444444444444444000000000000000055555555555000000000000000000000066666666600000000
    match = expression.match(/^\s*(?:([\s\S]+?)\s+as\s+)?(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(\s*[\s\S]+?)?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

    // 1 Alias
    // 2 Item
    // 3 Key on (key,value)
    // 4 Value on (key,value)
    // 5 Source expression (including filters)
    // 6 Track by

    if (!match) {
      throw uiSelectMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
              expression);
    }
    
    var source = match[5], 
        filters = '';

    // When using (key,value) ui-select requires filters to be extracted, since the object
    // is converted to an array for $select.items 
    // (in which case the filters need to be reapplied)
    if (match[3]) {
      // Remove any enclosing parenthesis
      source = match[5].replace(/(^\()|(\)$)/g, '');
      // match all after | but not after ||
      var filterMatch = match[5].match(/^\s*(?:[\s\S]+?)(?:[^\|]|\|\|)+([\s\S]*)\s*$/);
      if(filterMatch && filterMatch[1].trim()) {
        filters = filterMatch[1];
        source = source.replace(filters, '');
      }      
    }

    return {
      itemName: match[4] || match[2], // (lhs) Left-hand side,
      keyName: match[3], //for (key, value) syntax
      source: $parse(source),
      filters: filters,
      trackByExp: match[6],
      modelMapper: $parse(match[1] || match[4] || match[2]),
      repeatExpression: function (grouped) {
        var expression = this.itemName + ' in ' + (grouped ? '$group.items' : '$select.items');
        if (this.trackByExp) {
          expression += ' track by ' + this.trackByExp;
        }
        return expression;
      } 
    };

  };

  self.getGroupNgRepeatExpression = function() {
    return '$group in $select.groups';
  };

}]);

}());