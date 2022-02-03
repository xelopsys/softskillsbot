import telegraf from "telegraf";
const { Markup } = telegraf;
import { composer, middleware } from "../../core/core.js";

composer.command("quiz", async (ctx) => {
  await ctx.replyWithHTML("<b>Are you ready?!</b>", {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`Yes`, `next_0_0`),
        Markup.callbackButton(`No`, `not_ready`),
      ],
    ]),
  });
});

middleware(composer);
