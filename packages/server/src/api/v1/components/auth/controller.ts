import { Get, Route, Controller, Post, Body, Request } from "tsoa";
import { Document } from "mongoose";
import { Request as ExpressRequest } from "express";

import { IUser, IUserAuth } from "../../../../interfaces/IUser";
import { AuthService } from "services/auth";
import Logger from "loaders/logger";

@Route("/auth")
export class AuthController extends Controller {
  private authServiceInstance: AuthService;

  constructor() {
    super();
    this.authServiceInstance = new AuthService();
  }

  @Post("/signup")
  public async signUp(
    @Body() authData: { email: string; password: string }
  ): Promise<IUserAuth> {
    const response = await this.authServiceInstance.signUp(authData);
    return response;
  }

  @Post("/signin")
  public async signIn(
    @Body() authData: { email: string; password: string }
  ): Promise<IUserAuth> {
    const response = await this.authServiceInstance.signIn(authData);
    return response;
  }

  @Get("/me")
  public async me(@Request() req: ExpressRequest): Promise<IUserAuth> {
    const user = req.user as IUser & Document;
    const token = (req.headers.authorization as string).slice(7);

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  public async logout(@Request() req: ExpressRequest): Promise<void> {
    Logger.silly(
      `User logout (clear session). User id: ${(req.user as IUser)._id}`
    );
    req.logOut();
  }
}
