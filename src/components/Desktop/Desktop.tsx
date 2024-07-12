import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Dock from "./Dock";
import WindowManager from "../Window/WindowManager";
import MenuBar from "../MenuBar/MenuBar";
import { RootState } from "../../store";

const Desktop: React.FC = () => {
  const theme = useSelector((state: RootState) => state.desktop.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // 테마를 localStorage에 저장
  }, [theme]);

  return (
    <div className="h-full bg-background text-foreground relative">
      <MenuBar />
      <div className="pt-6">
        <WindowManager />
      </div>
      <Dock />
    </div>
  );
};

export default Desktop;
