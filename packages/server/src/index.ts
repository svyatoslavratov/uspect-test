import App from "./app";

async function startServer() {
  const app = new App();
  await app.init();
  app.start();
}

startServer();
