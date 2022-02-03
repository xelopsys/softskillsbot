import { promises } from "fs";
import { join } from "path";

const location = join("./", "quizzes.json");
export default async () => {
  return JSON.parse(await promises.readFile(location, "utf-8"));
};
