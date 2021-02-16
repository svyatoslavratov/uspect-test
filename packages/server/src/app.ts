import express, { Application } from "express";
import { Server } from "http";

import config from "./config";
import loaders from "./loaders";

export default class App {
  instance: Application;
  PORT: number;
  server: Server | null = null;

  constructor() {
    this.instance = express();
    this.PORT = config.port;
  }

  async init(): Promise<void> {
    await loaders({ app: this.instance });
  }

  start(): void {
    if (!this.server) {
      this.server = this.instance.listen(this.PORT, () => {
        console.log(`Server was started on ${this.PORT} port`);
      });
    }
  }

  stop(): void {
    if (this.server) {
      this.server.close();
    }
  }
}
