import { connection } from "./connection";
import { appFactory } from "./app";

(async () => {
  const app = appFactory(await connection);

  app.listen(process.env.PORT, function () {
    console.log("Example app listening on port 3000!");
  });
})();
