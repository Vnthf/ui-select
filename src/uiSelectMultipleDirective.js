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

      ctrl.activeItem = function (i) {
        $select.close();
        if (ctrl.isPressShiftKey) {
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

      scope.$on('uis:select', function (event, item) {
        if ($select.selected.length >= $select.limit) {
          return;
        }
        $select.selected.push(item);
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
          } else if (e.which === KEY.LEFT) {
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
      function _handleMatchSelection(key, isMultiActive) {
        if ($selectMultiple.activeMatchIndexes.length === 0) {
          return;
        }

        $select.close();

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
          if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || KEY.isVerticalMovement(e.which)) {
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

      //Ctrl, Shift + 마우스를 통한 multi select
      $document.on('keydown', _onDocumentKeydown);
      $document.on('keyup', _toggleKeyPress);
      $document.on('click', _onDocumentClick);

      function _toggleKeyPress(e) {
        $selectMultiple.isPressShiftKey = e.shiftKey;
        $selectMultiple.isPressCtrlKey = KEY.isPressedCtrlKey(e);
      }

      function _onDocumentKeydown(e) {
        _toggleKeyPress(e);
        if (KEY.isHorizontalMovement(e.which)) {
          scope.$applyAsync(function () {
            _handleMatchSelection(e.which, e.shiftKey);
          });
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
