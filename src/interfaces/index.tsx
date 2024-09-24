import { ReactElement } from "react";

export interface ILocalStorageItem {
  key: string;
  value: any;
}

export enum status {
  PENDING = "PENDING",
  WIN = "WIN",
  LOSE = "LOSE",
}

export interface IPage {
  name: string;
  icon: ReactElement;
  color: color;
  backgroundColor: string;
  path: string;
  enabled: boolean;
}

export enum color {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}
