import { composer, middleware } from "../../core/core.js";

composer.help(async (ctx) => {
  await ctx.replyWithHTML("<b>Hello!</b>");
});

middleware(composer);
