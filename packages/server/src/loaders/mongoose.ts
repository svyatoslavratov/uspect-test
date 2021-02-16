import mongoose from "mongoose";

export default async (dbUrl: string): Promise<typeof mongoose> => {
  const connection = await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  return connection;
};
