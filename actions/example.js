import { composer, middleware } from "../core/core.js";

composer.command("example", async (ctx) => {
  await ctx.replyWithHTML("<b>Hello!</b>");
});

middleware(composer);
