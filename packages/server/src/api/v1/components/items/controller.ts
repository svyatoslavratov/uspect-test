import {
  Get,
  Route,
  Controller,
  Post,
  Put,
  Delete,
  Query,
  Path,
  Body
} from "tsoa";

import { IItem, IItemFilter, IItemTDO } from "../../../../interfaces/IItem";
import { ItemsService } from "services/items";

@Route("/items")
export class ItemsController extends Controller {
  private itemsServiceInstance: ItemsService;

  constructor() {
    super();
    this.itemsServiceInstance = new ItemsService();
  }

  @Get()
  public async getAll(
    @Query() page?: number,
    @Query() limit?: number,
    @Query() maxPrice?: number,
    @Query() minPrice?: number,
    @Query() inStock?: boolean,
    @Query() search?: string
    // @Query() filter: IItemFilter
  ): Promise<IItem[]> {
    const filter: IItemFilter = {
      maxPrice,
      minPrice,
      inStock,
      search
    };

    const response = await this.itemsServiceInstance.getItems(
      page,
      limit,
      filter
    );

    return response;
  }

  @Get("/{id}")
  public async getById(@Path() id: string): Promise<IItem> {
    const response = await this.itemsServiceInstance.getItemById(id);
    return response;
  }

  @Post()
  public async create(@Body() item: IItemTDO[]): Promise<IItem[]> {
    const response = await this.itemsServiceInstance.createItem(item);
    return response;
  }

  @Put("/{id}")
  public async update(
    @Path() id: string,
    @Body() data: IItemTDO
  ): Promise<IItem> {
    const response = await this.itemsServiceInstance.updateItem(id, data);
    return response;
  }

  @Delete("/{id}")
  public async delete(@Path() id: string): Promise<IItem> {
    const response = await this.itemsServiceInstance.deleteItem(id);
    return response;
  }
}
