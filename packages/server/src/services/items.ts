import {
  Document,
  _FilterQuery,
  _AllowStringsForIds,
  _LeanDocument
} from "mongoose";

import { IItem, IItemFilter, IItemTDO } from "interfaces/IItem";
import ItemModel from "models/item";

type ModelFindFilter =
  | _FilterQuery<
      _AllowStringsForIds<
        Pick<
          Pick<
            _LeanDocument<IItem & Document<unknown>>,
            "_id" | "__v" | "id" | "name" | "price" | "count"
          >,
          "_id" | "__v" | "id" | "name" | "price" | "count"
        >
      >
    >
  | undefined;

export class ItemsService {
  public async getItems(
    page = 1,
    limit = 0,
    filter: IItemFilter
  ): Promise<(IItem & Document<unknown>)[]> {
    const searchFilter: ModelFindFilter = filter.search
      ? { $text: { $search: filter.search } }
      : undefined;

    const priceFilter: ModelFindFilter = {};

    if (filter.maxPrice) {
      priceFilter.$and = [
        { price: { $gte: filter.minPrice || 0 } },
        { price: { $lte: filter.maxPrice } }
      ];
    } else {
      priceFilter.price = { $gte: filter.minPrice || 0 };
    }

    const stockFilter: ModelFindFilter = filter.inStock
      ? {
          count: { $gt: 0 }
        }
      : undefined;

    const items = await ItemModel.find({
      ...searchFilter,
      ...priceFilter,
      ...stockFilter
    })
      .limit(limit)
      .skip((page - 1) * limit);
    if (!items) {
      throw new Error("Couldn't find all items");
    }

    return items;
  }

  public async getItemById(id: string): Promise<IItem & Document<unknown>> {
    const item = await ItemModel.findById(id);
    if (!item) {
      throw new Error(`Couldn't find item by id: ${id}`);
    }

    return item;
  }

  public async createItem(
    item: IItemTDO[]
  ): Promise<(IItem & Document<unknown>)[]> {
    const newItem = await ItemModel.create(item);
    if (!newItem) {
      throw new Error("Failed to create new item");
    }

    return newItem;
  }

  public async deleteItem(id: string): Promise<IItem & Document<unknown>> {
    const deletedItem = await ItemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      throw new Error("Failed to delete item");
    }

    return deletedItem;
  }

  public async updateItem(
    id: string,
    data: IItemTDO
  ): Promise<IItem & Document<unknown>> {
    const updatedItem = await ItemModel.findOneAndUpdate({ _id: id }, data, {
      new: true
    });
    if (!updatedItem) {
      throw new Error("Failed to update item");
    }

    return updatedItem;
  }
}
