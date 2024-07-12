import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { openApp, focusApp } from "../../store/desktopSlice";
import { Icon } from "../../types/window";
import * as Icons from "react-icons/fa";

const Dock: React.FC = () => {
  const icons = useSelector((state: RootState) => state.desktop.icons);
  const openWindows = useSelector(
    (state: RootState) => state.desktop.openWindows,
  );
  const dispatch = useDispatch();

  const handleIconClick = (icon: Icon) => {
    const openInstance = openWindows.find((instanceId) =>
      instanceId.startsWith(`${icon.id}-`),
    );

    if (openInstance) {
      dispatch(focusApp(openInstance));
    } else {
      const newInstanceId = `${icon.id}-${Date.now()}`;
      dispatch(openApp({ appId: icon.id, instanceId: newInstanceId }));
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? (
      <IconComponent className="text-3xl text-gray-800 dark:text-white" />
    ) : (
      <div>Icon not found</div>
    );
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 bg-opacity-30 dark:bg-opacity-30 backdrop-blur-md rounded-2xl p-2 flex space-x-2">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={() => handleIconClick(icon)}
        >
          {renderIcon(icon.iconName)}
        </div>
      ))}
    </div>
  );
};

export default Dock;
