import request from "supertest";

import App from "app";
import ItemModel from "models/item";
import { removeAllCollections } from "db/utils/remove-all-collections";

const app = new App();

beforeAll(async () => {
  await app.init();
});

beforeEach(async () => {
  await removeAllCollections();
});

describe("/api/v1/items - testing API endpoint", () => {
  describe("GET /api/v1/items", () => {
    it("Should return all items", async (done) => {
      const items = await ItemModel.insertMany([
        {
          name: "Test_1",
          count: 1,
          price: 100
        }
      ]);

      const result = await request(app.instance).get("/api/v1/items");
      expect(JSON.stringify(result.body)).toEqual(JSON.stringify(items));
      expect(result.status).toEqual(200);
      done();
    });

    it("Pagintaion with limit (without page)", async (done) => {
      const items = await ItemModel.insertMany([
        {
          name: "Test_1",
          count: 1,
          price: 100
        },
        {
          name: "Test_2",
          count: 2,
          price: 100
        },
        {
          name: "Test_3",
          count: 3,
          price: 100
        }
      ]);

      const result = await request(app.instance).get("/api/v1/items").query({
        limit: 2
      });
      expect(JSON.stringify(result.body)).toEqual(
        JSON.stringify(items.slice(0, 2))
      );
      expect(result.status).toEqual(200);

      done();
    });

    it("Pagintaion with limit and page", async (done) => {
      const items = await ItemModel.insertMany([
        {
          name: "Test_1",
          count: 1,
          price: 100
        },
        {
          name: "Test_2",
          count: 2,
          price: 100
        },
        {
          name: "Test_3",
          count: 3,
          price: 100
        },
        {
          name: "Test_4",
          count: 3,
          price: 100
        },
        {
          name: "Test_5",
          count: 3,
          price: 100
        },
        {
          name: "Test_6",
          count: 3,
          price: 100
        }
      ]);

      const result = await request(app.instance).get("/api/v1/items").query({
        page: 2,
        limit: 2
      });
      expect(JSON.stringify(result.body)).toEqual(
        JSON.stringify(items.slice(2, 4))
      );
      expect(result.status).toEqual(200);

      done();
    });

    it("Should return filtered items by search name", async (done) => {
      const items = await ItemModel.insertMany([
        {
          name: "Mi Ultra",
          count: 1,
          price: 100
        },
        {
          name: "Apple S 10",
          count: 2,
          price: 100
        },
        {
          name: "Sumsung Ultra 10",
          count: 3,
          price: 100
        }
      ]);

      const result = await request(app.instance).get("/api/v1/items").query({
        search: "ultra"
      });
      expect(JSON.stringify(result.body)).toEqual(
        JSON.stringify([items[0], items[2]])
      );
      expect(result.status).toEqual(200);

      done();
    });

    it("Should return filtered items by stock (count > 0)", async (done) => {
      const items = await ItemModel.insertMany([
        {
          name: "Mi Ultra",
          count: 1,
          price: 100
        },
        {
          name: "Apple S 10",
          count: 0,
          price: 100
        },
        {
          name: "Sumsung Ultra 10",
          count: 3,
          price: 100
        }
      ]);

      const result = await request(app.instance).get("/api/v1/items").query({
        inStock: "true"
      });
      expect(JSON.stringify(result.body)).toEqual(
        JSON.stringify([items[0], items[2]])
      );
      expect(result.status).toEqual(200);

      done();
    });

    it("Should return filtered items by min price", async (done) => {
      const items = await ItemModel.insertMany([
        {
          name: "Mi Ultra",
          count: 1,
          price: 55000
        },
        {
          name: "Apple S 10",
          count: 0,
          price: 34000
        },
        {
          name: "Sumsung Ultra 10",
          count: 3,
          price: 100
        }
      ]);

      const result = await request(app.instance).get("/api/v1/items").query({
        minPrice: 50000
      });
      expect(JSON.stringify(result.body)).toEqual(JSON.stringify([items[0]]));
      expect(result.status).toEqual(200);

      done();
    });

    it("Should return filtered items by max price", async (done) => {
      const items = await ItemModel.insertMany([
        {
          name: "Mi Ultra",
          count: 1,
          price: 55000
        },
        {
          name: "Apple S 10",
          count: 0,
          price: 34000
        },
        {
          name: "Sumsung Ultra 10",
          count: 3,
          price: 100
        }
      ]);

      const result = await request(app.instance).get("/api/v1/items").query({
        maxPrice: 50000
      });
      expect(JSON.stringify(result.body)).toEqual(
        JSON.stringify([items[1], items[2]])
      );
      expect(result.status).toEqual(200);

      done();
    });

    it("Should return filtered items by min price and max price", async (done) => {
      const items = await ItemModel.insertMany([
        {
          name: "Mi Ultra",
          count: 1,
          price: 55000
        },
        {
          name: "Apple S 10",
          count: 0,
          price: 34000
        },
        {
          name: "Sumsung Ultra 10",
          count: 3,
          price: 100
        }
      ]);

      const result = await request(app.instance).get("/api/v1/items").query({
        maxPrice: 50000,
        minPrice: 30000
      });
      expect(JSON.stringify(result.body)).toEqual(JSON.stringify([items[1]]));
      expect(result.status).toEqual(200);

      done();
    });
  });

  describe("GET /api/v1/items/:id", () => {
    it("Should return item by 'id'", async (done) => {
      const item = await ItemModel.create({
        name: "Test_1",
        count: 1,
        price: 100
      });

      const result = await request(app.instance).get(
        `/api/v1/items/${item.id}`
      );
      expect(JSON.stringify(result.body)).toEqual(JSON.stringify(item));
      expect(result.status).toEqual(200);

      done();
    });
  });

  describe("POST /api/v1/items", () => {
    it("Should return new item", async (done) => {
      const item = {
        name: "Test_1",
        count: 1,
        price: 100
      };

      const result = await request(app.instance)
        .post(`/api/v1/items`)
        .send(item);

      const newItem = await ItemModel.findById(result.body._id);

      expect(JSON.stringify(result.body)).toEqual(JSON.stringify(newItem));
      expect(result.status).toEqual(201);

      done();
    });
  });

  describe("PUT /api/v1/items/:id", () => {
    it("Should return updated item", async (done) => {
      const item = await ItemModel.create({
        name: "Test_1",
        count: 1,
        price: 100
      });

      const result = await request(app.instance)
        .put(`/api/v1/items/${item.id}`)
        .send({
          name: "updated"
        });

      expect(result.body.name).toEqual("updated");
      expect(result.body._id).toEqual(item.id);
      expect(result.status).toEqual(202);

      done();
    });
  });

  describe("DELETE /api/v1/items/:id", () => {
    it("Should return deleted item", async (done) => {
      const item = await ItemModel.create({
        name: "Test_1",
        count: 1,
        price: 100
      });

      const result = await request(app.instance).delete(
        `/api/v1/items/${item.id}`
      );

      expect(JSON.stringify(result.body)).toEqual(JSON.stringify(item));
      expect(result.body._id).toEqual(item.id);
      expect(result.status).toEqual(200);

      done();
    });
  });
});
