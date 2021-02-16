import express, { Application } from "express";
import { Server } from "http";
import merge from "lodash.merge";

import { IConfig } from "interfaces/IConfig";

import config from "./config";
import loaders from "./loaders";

export default class App {
  instance: Application;
  conf: IConfig;
  server: Server | null = null;

  constructor(conf?: IConfig) {
    this.instance = express();
    this.conf = merge(config, conf);
  }

  async init(): Promise<void> {
    await loaders({ app: this.instance, config: this.conf });
  }

  start(): void {
    if (!this.server) {
      this.server = this.instance.listen(this.conf.port, () => {
        console.log(`Server was started on ${this.conf.port} port`);
      });
    }
  }

  stop(): void {
    if (this.server) {
      this.server.close();
    }
  }
}
