import { promises } from "fs";
import { join } from "path";

const location = join("./util", "quizzesuz.json");
export default async () => {
  return JSON.parse(await promises.readFile(location, "utf-8"));
};
