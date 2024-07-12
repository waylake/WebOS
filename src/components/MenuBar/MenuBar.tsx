import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FaApple, FaWifi, FaBatteryFull } from "react-icons/fa";

const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const activeApp = useSelector((state: RootState) => {
    const openWindows = state.desktop.openWindows;
    return openWindows.length > 0
      ? state.desktop.apps.find(
          (app) => app.id === openWindows[openWindows.length - 1],
        )
      : null;
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-6 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white flex items-center justify-between px-4 text-sm">
      <div className="flex items-center space-x-4">
        <FaApple />
        <span>{activeApp ? activeApp.name : "Finder"}</span>
      </div>
      <div className="flex items-center space-x-4">
        <FaWifi />
        <FaBatteryFull />
        <span>{currentTime.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default MenuBar;
