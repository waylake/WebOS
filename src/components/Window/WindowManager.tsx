import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Window from "./Window";
import { getAppConfig } from "../../utils/appFactory";

const WindowManager: React.FC = () => {
  const openWindows = useSelector(
    (state: RootState) => state.desktop.openWindows,
  );
  const apps = useSelector((state: RootState) => state.desktop.apps);

  return (
    <>
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
          >
            <AppComponent id={instanceId} />
          </Window>
        );
      })}
    </>
  );
};

export default WindowManager;
