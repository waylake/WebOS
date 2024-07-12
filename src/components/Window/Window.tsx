import React, { useRef } from "react";
import { Rnd, DraggableData } from "react-rnd";
import { DraggableEvent } from "react-draggable";
import { useDispatch } from "react-redux";
import { closeApp, focusApp } from "../../store/desktopSlice";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  zIndex: number;
  onDrag: (x: number, y: number) => void;
  onDragStop: (
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number,
  ) => void;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  zIndex,
  onDrag,
  onDragStop,
}) => {
  const dispatch = useDispatch();
  const rndRef = useRef<Rnd>(null);

  /* @ts-ignore */
  const handleDrag = (e: DraggableEvent, d: DraggableData) => {
    onDrag(d.x, d.y);
  };

  /* @ts-ignore */
  const handleDragStop = (e: DraggableEvent, d: DraggableData) => {
    const { newX, newY, newWidth, newHeight } = calculatePreviewStyle(
      d.x,
      d.y,
      d.node.offsetWidth,
      d.node.offsetHeight,
    );

    if (rndRef.current) {
      rndRef.current.updatePosition({ x: newX, y: newY });
      rndRef.current.updateSize({ width: newWidth, height: newHeight });
    }

    onDragStop(newX, newY, newWidth, newHeight);
    dispatch(focusApp(id));
  };

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: 100,
        y: 100,
        width: 400,
        height: 300,
      }}
      style={{ zIndex }}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onMouseDown={() => dispatch(focusApp(id))}
      minWidth={300}
      minHeight={200}
    >
      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
        <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 flex justify-between items-center">
          <h2 className="text-sm font-semibold dark:text-white">{title}</h2>
          <button
            onClick={() => dispatch(closeApp(id))}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ×
          </button>
        </div>
        <div className="p-4 flex-grow overflow-auto dark:text-white">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;

function calculatePreviewStyle(
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const threshold = 50;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  let newX = x;
  let newY = y;
  let newWidth = width;
  let newHeight = height;

  if (y <= threshold) {
    // Top 50%
    newX = 0;
    newY = 0;
    newWidth = windowWidth;
    newHeight = windowHeight / 2;
  } else if (y + height >= windowHeight - threshold) {
    // Bottom 50%
    newX = 0;
    newY = windowHeight / 2;
    newWidth = windowWidth;
    newHeight = windowHeight / 2;
  } else if (x <= threshold) {
    // Left 50%
    newX = 0;
    newY = 0;
    newWidth = windowWidth / 2;
    newHeight = windowHeight;
  } else if (x + width >= windowWidth - threshold) {
    // Right 50%
    newX = windowWidth / 2;
    newY = 0;
    newWidth = windowWidth / 2;
    newHeight = windowHeight;
  }

  return { newX, newY, newWidth, newHeight };
}
