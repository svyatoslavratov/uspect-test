import { Get, Route, Controller } from "tsoa";

@Route("/test")
export class TestController extends Controller {
  @Get("/")
  public index(): { message: string } {
    return { message: "test route" };
  }

  @Get("/secret")
  public secret(email: string): { message: string; email: string } {
    return {
      message: "secret test route",
      email: email
    };
  }
}
