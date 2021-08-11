import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL!;
export const connection = MongoClient.connect(url).then(function (client) {
  return client.db();
});
