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
        isDragging = true;
        uiSelectDragFactory.dropComplete = false;
        event.dataTransfer.effectAllowed = "move";
        var item = $select.selected[$(this).index()];
        event.dataTransfer.setData('text', DRAG_ITEM_TYPE + JSON.stringify(item));
      });

      element.on('dragend', '.' + DRAG_ITEM_CLASS, function (event) {
        isDragging = false;
        event.currentTarget.classList.remove(DROPPABLE_CLASS);
        if (uiSelectDragFactory.dropComplete) {
          scope.$selectMultiple.removeChoice($(this).index());
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

        var item = JSON.parse(event.dataTransfer.getData('text').substr(DRAG_ITEM_TYPE.length));
        for (var i = 0; i < $select.selected.length; i++) {
          if ($select.isEqual(item, $select.selected[i])) {
            return;
          }
        }

        $select.select(item);
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

    }
  };
}]);
