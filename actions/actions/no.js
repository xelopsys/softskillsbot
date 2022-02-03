import { composer, middleware } from "../../core/core.js";

composer.action("not_ready", async (ctx) => {
  await ctx.deleteMessage();
});

middleware(composer);
