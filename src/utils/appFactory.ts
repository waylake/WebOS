import { FaInternetExplorer, FaStickyNote } from "react-icons/fa";
import InternetBrowser from "../components/Applications/InternetBrowser/InternetBrowser";
import NoteApp from "../components/Applications/NoteApp/NoteApp";
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
];

export const getAppConfig = (id: string): AppConfig | undefined => {
  return appConfigs.find((config) => config.id === id);
};

export const getAllAppConfigs = (): AppConfig[] => {
  return appConfigs;
};
