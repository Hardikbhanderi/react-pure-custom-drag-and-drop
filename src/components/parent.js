import React, { useRef, useState } from "react";
import Child from "./child";
import { useHover } from "../hooks/useHover";

const Parent = ({
  parent,
  draggedOverParent,
  getDragOverClass,
  draggedItem,
  handleDragOverParent,
  handleDragEnter,
  handleDropEndCapture,
  handleDragStart,
  draggedElementRef,
  handleDrag,
  handleDragEnd
}) => {
    const [parentRef, isParentHovered] = useHover();
    
   const [dragElement, setDragElement] =  useState({index : null})
   const  dragElementWidth = useRef()
console.log('@@@@@', dragElementWidth)
    const handleDragAction = (e , { item, index, parentId }) =>{
        if(e.target.clientWidth > 0){
            // console.log('e.target.clientWidth @@@@@', e.target.clientWidth)

            dragElementWidth.current = e.target.clientWidth;
            setDragElement({index : index, width : e.target})
        }
        
        handleDrag()
    }

    const handleDragEndAction = () =>{
        setDragElement({index : null})
        handleDragEnd()
    }

    const renderChild = (item, index, parent) => {
        const isRightSideElement = index > dragElement.index && dragElement.index !== null;
        
        return (
          <Child
            item={item}
            draggedItem={draggedItem}
            handleDragStart={handleDragStart}
            index={index}
            parent={parent}
            isRightSideElement={isRightSideElement}
            draggedElementRef={draggedElementRef}
            handleDrag={handleDragAction}
            handleDragEnd={handleDragEndAction}
            isParentHovered={isParentHovered}
            dragElementWidth={isParentHovered ? dragElementWidth?.current : 0}
          />
        );
      };

  return (
    <div
      key={parent.id}
      className={`parent ${
        draggedOverParent === parent.id ? getDragOverClass(parent) : ""
      } ${
        draggedItem.parentId === parent.id ? "activeDragWithChildOneChild" : ""
      }`}
      onDragOver={(e) => handleDragOverParent(e, parent.id)}
      onDrop={(e) => handleDragEnter(e, parent.id)}
      onDropCapture={handleDropEndCapture}
      ref={parentRef}
    >
      {parent.children.map((child, index) => renderChild(child, index, parent))}
    </div>
  );
};

export default Parent;
