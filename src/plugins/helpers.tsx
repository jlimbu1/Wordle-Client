import moment from "moment";
import { ILocalStorageItem } from "../interfaces";

// LocalStorage Helper Functions
export const setLocalStorageItem = ({
  key,
  value,
}: ILocalStorageItem): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = (key: string): any => {
  const str = localStorage.getItem(key);
  if (!str) return "";

  return JSON.parse(str);
};

export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

// Formatting Helper Functions
export const formatDate = (date: Date): string => {
  return moment(date)?.format("DD/MM/YYYY");
};

export const formatCurrency = (
  amount: number | undefined,
  currency = "HKD"
): string => {
  if (!currency && !amount) return `-: -`;
  if (!currency) return `-: ${amount?.toFixed(1)}`;
  if (!amount) return `${currency?.toUpperCase()}: -`;

  return `${currency?.toUpperCase()}: ${amount?.toFixed(1)}`;
};

export const capitalizeWords = (str: string): string => {
  return str?.replace(/\b\w/g, (char) => char?.toUpperCase());
};

export const formatLabel = (str: string): string => {
  return str
    ?.split("_")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
};

// General Helper Functions
export const handleNull = (data: any): any => {
  return data ? data : "-";
};
