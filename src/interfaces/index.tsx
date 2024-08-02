export interface ILocalStorageItem {
  key: string;
  value: any;
}

export interface IProduct {
  id: number;
  assetPath?: string;
  name?: string;
  description?: string;
  currency?: string;
  price: number;
  labels?: Array<string>;
}
