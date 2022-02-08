import telegraf from "telegraf";
const { Markup } = telegraf;
import { composer, middleware } from "../../core/core.js";
// мужчина   женщина   erkak  ayol

composer.hears("мужчина", async (ctx) => {
  await ctx.replyWithHTML("<b>Вы готовы начать тест?</b>", {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`я готов`, `next_0_0`),
        Markup.callbackButton(`я не готов`, `not_ready`),
      ],
    ]),
  });
});
composer.hears("женщина", async (ctx) => {
  await ctx.replyWithHTML("<b>Вы готовы начать тест?</b>", {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`я готовa`, `fnext_0_0`),
        Markup.callbackButton(`я не готовa`, `not_ready`),
      ],
    ]),
  });
});
composer.hears("erkak", async (ctx) => {
  await ctx.replyWithHTML("<b>Testni boshlashga tayyormisiz?</b>", {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`Men tayyorman`, `uznext_0_0`),
        Markup.callbackButton(`Men tayyor emasman`, `not_ready`),
      ],
    ]),
  });
});
composer.hears("ayol", async (ctx) => {
  await ctx.replyWithHTML("<b>Testni boshlashga tayyormisiz?</b>", {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`Men tayyorman`, `uzfnext_0_0`),
        Markup.callbackButton(`Men tayyor emasman`, `not_ready`),
      ],
    ]),
  });
});
middleware(composer);
