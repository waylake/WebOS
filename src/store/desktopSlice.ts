import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../types/application";
import { Icon } from "../types/window";

export interface AppInstance {
  id: string;
  appId: string;
  name: string;
  state: any;
}

interface DesktopState {
  apps: AppInstance[];
  openWindows: string[];
  theme: "light" | "dark";
  icons: Icon[];
}

const initialState: DesktopState = {
  apps: [],
  openWindows: [],
  theme: "light",
  icons: [
    { id: "internet", name: "Internet", iconName: "FaGlobe" },
    { id: "note", name: "Notes", iconName: "FaStickyNote" },
  ],
};

const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    openApp: (
      state,
      action: PayloadAction<{ appId: string; instanceId: string }>,
    ) => {
      const { appId, instanceId } = action.payload;
      const icon = state.icons.find((icon) => icon.id === appId);
      if (!state.apps.some((app) => app.id === instanceId)) {
        state.apps.push({
          id: instanceId,
          appId,
          name: icon?.name || "Unknown",
          state: {},
        });
      }
      if (!state.openWindows.includes(instanceId)) {
        state.openWindows.push(instanceId);
      }
    },
    closeApp: (state, action: PayloadAction<string>) => {
      state.openWindows = state.openWindows.filter(
        (id) => id !== action.payload,
      );
    },
    focusApp: (state, action: PayloadAction<string>) => {
      const index = state.openWindows.findIndex((id) => id === action.payload);
      if (index !== -1) {
        state.openWindows.splice(index, 1);
        state.openWindows.push(action.payload);
      }
    },
    updateAppState: (
      state,
      action: PayloadAction<{ id: string; newState: AppState }>,
    ) => {
      const app = state.apps.find((app) => app.id === action.payload.id);
      if (app) {
        app.state = { ...app.state, ...action.payload.newState };
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { openApp, closeApp, focusApp, updateAppState, toggleTheme } =
  desktopSlice.actions;

export default desktopSlice.reducer;
