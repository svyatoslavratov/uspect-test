export interface IItem {
  _id?: string;
  name: string;
  price: number;
  count: number;
}

export interface IItemFilter {
  maxPrice?: number;
  minPrice?: number;
  search?: string;
  inStock?: boolean;
}
