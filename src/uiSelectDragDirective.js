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
      var isDragging = false,
        DROPPABLE_CLASS = 'ui-select-droppable',
        DRAG_ITEM_CLASS = 'ui-select-match-item',
        DRAG_ITEM_TYPE = 'ui-select-item';

      element.on('dragstart', '.' + DRAG_ITEM_CLASS, function (event) {
        var indexes = _getDragIndexes($(this).index()),
          items = $select.selected.filter(function (v, i) {
            return indexes.indexOf(i) > -1;
          });

        isDragging = true;
        uiSelectDragFactory.dropComplete = false;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setDragImage(_getDragImage(indexes.length), -10, -10);
        event.dataTransfer.setData('text', DRAG_ITEM_TYPE + JSON.stringify(items));
      });

      element.on('dragend', '.' + DRAG_ITEM_CLASS, function (event) {
        isDragging = false;
        event.currentTarget.classList.remove(DROPPABLE_CLASS);
        if (uiSelectDragFactory.dropComplete) {
          scope.$selectMultiple.removeChoice(_getDragIndexes($(this).index()));
        }
      });

      element.on('drop', function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "none";
        event.currentTarget.classList.remove(DROPPABLE_CLASS);

        if (!isAllowDrop(event)) {
          uiSelectDragFactory.dropComplete = false;
          return true;
        }
        uiSelectDragFactory.dropComplete = true;

        var items = JSON.parse(event.dataTransfer.getData('text').substr(DRAG_ITEM_TYPE.length));
        for (var j = 0; j < items.length; j++) {
          for (var i = 0; i < $select.selected.length; i++) {
            if ($select.isEqual(items[j], $select.selected[i])) {
              return;
            }
          }
          $select.select(items[j]);
        }

      });

      element.on('dragenter', function (event) {
        event.preventDefault();
        event.currentTarget.classList.add(DROPPABLE_CLASS);
        return true;
      });


      element.on('dragleave', function (event) {
        event.preventDefault();
        event.currentTarget.classList.remove(DROPPABLE_CLASS);
        uiSelectDragFactory.dropComplete = false;
        return true;
      });

      element.on('dragover', function (event) {
        event.preventDefault();
        event.currentTarget.classList.add(DROPPABLE_CLASS);
        event.dataTransfer.dropEffect = "move";
        return true;
      });

      //dragged인 아이템이 같은 컴퍼넌트가 아니고 type이 ui-select일 경우
      function isAllowDrop(event) {
        if (isDragging) {
          return false;
        }
        var text = event.dataTransfer.getData('text');
        return text && (text.substr(0, DRAG_ITEM_TYPE.length) === DRAG_ITEM_TYPE);
      }

      scope.$on('$destroy', function () {
        element.off('dragstart');
        element.off('dragend');
        element.off('drop');
        element.off('dragenter');
        element.off('dragleave');
        element.off('dragover');
      });

      function _getDragIndexes(targetIndex) {
        return scope.$selectMultiple.activeMatchIndexes.length > 0 ?
          scope.$selectMultiple.activeMatchIndexes : [targetIndex];
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
    }
  };
}]);
