import { Get, Route, Controller, Request } from "tsoa";
import { Request as ExpressRequest } from "express";

import { IUser } from "interfaces/IUser";
@Route("/test")
export class TestController extends Controller {
  @Get()
  public index(): { message: string } {
    return { message: "test route" };
  }

  @Get("/secret")
  public secret(
    @Request() req: ExpressRequest
  ): { message: string; email: string } {
    const email = (req.user as IUser)?.email;
    return {
      message: "secret test route",
      email
    };
  }
}
