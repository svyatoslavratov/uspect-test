import { Get, Route, Controller, Post } from "tsoa";
import { Document } from "mongoose";

import { IUser, IUserAuth } from "interfaces/IUser";
import { AuthService } from "services/auth";

@Route("/auth")
export class AuthController extends Controller {
  private authServiceInstance: AuthService;

  constructor() {
    super();
    this.authServiceInstance = new AuthService();
  }

  @Post("/signup")
  public async signUp(authData: {
    email: string;
    password: string;
  }): Promise<IUserAuth> {
    const response = await this.authServiceInstance.signUp(authData);
    return response;
  }

  @Post("/signin")
  public async signIn(authData: {
    email: string;
    password: string;
  }): Promise<IUserAuth> {
    const response = await this.authServiceInstance.signIn(authData);
    return response;
  }

  @Get("/me")
  public async me(user: IUser & Document, token: string): Promise<IUserAuth> {
    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token
    };
  }
}
