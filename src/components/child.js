import React, { useRef } from "react";

const Child = ({
  item,
  draggedItem,
  handleDragStart,
  index,
  parent,
  draggedElementRef,
  handleDrag,
  handleDragEnd,
  isRightSideElement,
  dragElementWidth,
  isParentHovered
}) => {
  const childRef = useRef();
  return (
    <div
      key={item.id}
      className={`child ${
        Object.keys(draggedItem).length === 0 ? "makeChildVisible" : ""
      }`}
      draggable
      onDragStart={(e) =>
        handleDragStart(e, { item, index, parentId: parent.id })
      }
      ref={
        index === draggedItem.index && draggedItem.parentId === parent.id
          ? draggedElementRef
          : childRef
      }
      onDrag={(e) => handleDrag(e, { item, index, parentId: parent.id })}
      onDragEnd={handleDragEnd}
      id={isRightSideElement ? "right" : "left"}
      style={isRightSideElement ? { transform : `translate(${dragElementWidth}px, 0)` } : {}}
    >
      <h4>{item.text}</h4>
    </div>
  );
};

export default Child;
