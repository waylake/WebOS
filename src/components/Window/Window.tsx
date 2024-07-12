import React from "react";
import { Rnd } from "react-rnd";
import { useDispatch } from "react-redux";
import { closeApp, focusApp } from "../../store/desktopSlice";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  zIndex: number;
}

const Window: React.FC<WindowProps> = ({ id, title, children, zIndex }) => {
  const dispatch = useDispatch();

  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 400,
        height: 300,
      }}
      style={{ zIndex }}
      onMouseDown={() => dispatch(focusApp(id))}
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
