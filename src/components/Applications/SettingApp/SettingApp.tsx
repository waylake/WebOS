import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { toggleTheme } from "../../../store/desktopSlice";

interface SettingAppProps {
  id: string;
}

const SettingApp: React.FC<SettingAppProps> = () => {
  const theme = useSelector((state: RootState) => state.desktop.theme);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="h-full flex flex-col p-4 bg-appBackgroundLight dark:bg-appBackgroundDark text-appTextLight dark:text-appTextDark">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Theme</h2>
        <div className="mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={handleThemeChange}
              className="form-checkbox h-5 w-5 text-primary focus:ring-primary dark:focus:ring-secondary"
            />
            <span className="ml-2">Enable Dark Mode</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingApp;
