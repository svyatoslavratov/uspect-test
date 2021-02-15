import { Get, Route, Controller } from "tsoa";

@Route("/hello")
export class HelloController extends Controller {
  @Get("/")
  public index(): { text: string } {
    return { text: "hello" };
  }
}
