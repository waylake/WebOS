import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Window from "./Window";
import { getAppConfig } from "../../utils/appFactory";

const WindowManager: React.FC = () => {
  const openWindows = useSelector(
    (state: RootState) => state.desktop.openWindows,
  );
  const apps = useSelector((state: RootState) => state.desktop.apps);

  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties | null>(
    null,
  );

  const handleDrag = (x: number, y: number) => {
    const { newX, newY, newWidth, newHeight } = calculatePreviewStyle(
      x,
      y,
      400,
      300,
    );
    setPreviewStyle({
      position: "absolute",
      top: newY,
      left: newX,
      width: newWidth,
      height: newHeight,
      border: "2px dashed gray",
      zIndex: 9999,
    });
  };

  const handleDragStop = () => {
    setPreviewStyle(null);
  };

  return (
    <div className="relative">
      {openWindows.map((instanceId, index) => {
        const app = apps.find((app) => app.id === instanceId);
        if (!app) return null;

        const config = getAppConfig(app.appId);
        if (!config) return null;

        const AppComponent = config.component;

        return (
          <Window
            key={instanceId}
            id={instanceId}
            title={config.name}
            zIndex={index + 1}
            onDrag={handleDrag}
            onDragStop={handleDragStop}
          >
            <AppComponent id={instanceId} />
          </Window>
        );
      })}
      {previewStyle && <div style={previewStyle} />}
    </div>
  );
};

export default WindowManager;

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
  } else {
    return { newX: x, newY: y, newWidth: width, newHeight: height };
  }

  return { newX, newY, newWidth, newHeight };
}
