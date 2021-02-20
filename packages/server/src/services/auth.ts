import jwt from "jsonwebtoken";

import { IUser, IUserAuth } from "interfaces/IUser";
import UserModel from "models/user";
import Logger from "loaders/logger";
import { MailerService } from "./mailer";

import config from "config";

export class AuthService {
  private mailer: MailerService;

  constructor() {
    this.mailer = new MailerService();
  }

  public async signUp(authData: {
    email: string;
    password: string;
  }): Promise<IUserAuth> {
    const user = await UserModel.create(authData);

    if (!user) {
      throw new Error("Failed to create new user");
    }

    const token = await this.generateToken(user);

    Logger.silly(`Sign Up user: ${user._id}`);

    this.mailer.sendWelcomeEmail(user.email);

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  public async signIn(authData: {
    email: string;
    password: string;
  }): Promise<IUserAuth> {
    const user = await UserModel.findOne({ email: authData.email });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.comparePassword(authData.password)) {
      throw new Error("Incorrect email or password");
    }

    const token = await this.generateToken(user);

    Logger.silly(`Sign In user: `, user._id);
    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  public async generateToken(user: IUser): Promise<string> {
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        email: user.email
      },
      config.jwtSecret,
      { expiresIn: "24h" }
    );

    Logger.silly(`Sign JWT token for userId: ${user._id}`);
    return token;
  }
}
