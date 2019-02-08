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
