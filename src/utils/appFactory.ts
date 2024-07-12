import { FaInternetExplorer, FaStickyNote, FaCog } from "react-icons/fa";
import InternetBrowser from "../components/Applications/InternetBrowser/InternetBrowser";
import NoteApp from "../components/Applications/NoteApp/NoteApp";
import SettingApp from "../components/Applications/SettingApp/SettingApp";
import { AppConfig } from "../types/application";

const appConfigs: AppConfig[] = [
  {
    id: "internet",
    name: "Internet",
    Icon: FaInternetExplorer,
    component: InternetBrowser,
  },
  {
    id: "note",
    name: "Note",
    Icon: FaStickyNote,
    component: NoteApp,
  },
  {
    id: "setting",
    name: "Settings",
    Icon: FaCog,
    component: SettingApp,
  },
];

export const getAppConfig = (id: string): AppConfig | undefined => {
  return appConfigs.find((config) => config.id === id);
};

export const getAllAppConfigs = (): AppConfig[] => {
  return appConfigs;
};
