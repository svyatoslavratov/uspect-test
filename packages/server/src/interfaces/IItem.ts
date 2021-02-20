export interface IItem {
  _id?: string;
  name: string;
  price: number;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IItemFilter {
  maxPrice?: number;
  minPrice?: number;
  search?: string;
  inStock?: boolean;
}

export interface IItemTDO {
  name: string;
  price: number;
  count: number;
}
