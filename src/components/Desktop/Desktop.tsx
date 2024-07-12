import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Dock from "./Dock";
import WindowManager from "../Window/WindowManager";
import MenuBar from "../MenuBar/MenuBar";
import { RootState } from "../../store";
import { toggleTheme } from "../../store/desktopSlice";
import { FaMoon, FaSun } from "react-icons/fa";

const Desktop: React.FC = () => {
  const theme = useSelector((state: RootState) => state.desktop.theme);
  const dispatch = useDispatch();

  return (
    <div className="h-full bg-gray-100 dark:bg-gray-800 relative">
      <MenuBar />
      <div className="pt-6">
        <WindowManager />
      </div>
      <Dock />
      <button
        onClick={() => dispatch(toggleTheme())}
        className="absolute top-10 right-4 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md"
      >
        {theme === "light" ? (
          <FaMoon className="text-gray-800" />
        ) : (
          <FaSun className="text-yellow-400" />
        )}
      </button>
    </div>
  );
};

export default Desktop;
