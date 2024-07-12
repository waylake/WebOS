import { IconType } from "react-icons";
import { FC } from "react";

export interface AppConfig {
  id: string;
  name: string;
  Icon: IconType;
  component: FC<{ id: string }>;
}

export interface AppState {
  [key: string]: unknown;
}

export interface AppInstance {
  id: string;
  name: string;
  appId: string;
  state: AppState;
}
