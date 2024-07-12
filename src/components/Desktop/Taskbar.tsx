import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { focusWindow } from "../../store/desktopSlice";

const Taskbar: React.FC = () => {
  const windows = useSelector((state: RootState) => state.desktop.windows);
  const dispatch = useDispatch();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-2 flex">
      {windows.map((window) => (
        <button
          key={window.id}
          className="px-4 py-2 mr-2 bg-gray-700 hover:bg-gray-600"
          onClick={() => dispatch(focusWindow(window.id))}
        >
          {window.title}
        </button>
      ))}
    </div>
  );
};

export default Taskbar;
