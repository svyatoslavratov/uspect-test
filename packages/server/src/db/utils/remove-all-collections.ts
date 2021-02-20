import mongoose from "mongoose";

export const removeAllCollections = async (): Promise<void> => {
  const collections = Object.keys(mongoose.connection.collections);
  collections.map(async (i) => {
    const collection = mongoose.connection.collections[i];
    await collection.deleteMany({});
  });
};
