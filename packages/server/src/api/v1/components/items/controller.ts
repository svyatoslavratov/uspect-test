import { Get, Route, Controller, Post, Put, Delete } from "tsoa";
import { Document } from "mongoose";

import { IItem } from "interfaces/IItem";
import { ItemsService } from "services/items";

@Route("/items")
export class ItemsController extends Controller {
  private itemsServiceInstance: ItemsService;

  constructor() {
    super();
    this.itemsServiceInstance = new ItemsService();
  }

  @Get("/")
  public async getAll(
    page: number,
    limit: number
  ): Promise<(IItem & Document<unknown>)[]> {
    const response = await this.itemsServiceInstance.getItems(page, limit);
    return response;
  }

  @Get("/:id")
  public async getById(id: string): Promise<IItem & Document<unknown>> {
    const response = await this.itemsServiceInstance.getItemById(id);
    return response;
  }

  @Post("/")
  public async create(item: IItem): Promise<IItem & Document<unknown>> {
    const response = await this.itemsServiceInstance.createItem(item);
    return response;
  }

  @Put("/:id")
  public async update(
    id: string,
    data: IItem
  ): Promise<IItem & Document<unknown>> {
    const response = await this.itemsServiceInstance.updateItem(id, data);
    return response;
  }

  @Delete("/:id")
  public async delete(id: string): Promise<IItem & Document<unknown>> {
    const response = await this.itemsServiceInstance.deleteItem(id);
    return response;
  }
}
