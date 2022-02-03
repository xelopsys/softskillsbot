import env from "./env.js";
import telegraf from "telegraf";
const { Telegraf, Composer, session } = telegraf;

const token = env.TOKEN;
const bot = new Telegraf(token);

const composer = new Composer();
const middleware = (composer) => {
  bot.use(composer.middleware());
};

(async () => {
  await bot.use(session());
  await bot.launch();
})();

export { composer, middleware };
