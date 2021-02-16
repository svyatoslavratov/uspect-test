import { Document } from "mongoose";

import { IItem } from "interfaces/IItem";
import ItemModel from "models/item";

export class ItemsService {
  public async getItems(
    page = 1,
    limit = 0
  ): Promise<(IItem & Document<unknown>)[]> {
    const items = await ItemModel.find()
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

  public async createItem(item: IItem): Promise<IItem & Document<unknown>> {
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
    data: IItem
  ): Promise<IItem & Document<unknown>> {
    const updatedItem = await ItemModel.findOneAndUpdate({ _id: id }, data);
    if (!updatedItem) {
      throw new Error("Failed to update item");
    }

    return updatedItem;
  }
}
