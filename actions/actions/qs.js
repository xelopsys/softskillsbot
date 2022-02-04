import reader from "../../util/json.js";
import { addAnswer, clearUser, fixedData } from "../../util/customDB.js";
import { composer, middleware } from "../../core/core.js";
import { message } from "../../util/resources.js";
import telegraf from "telegraf";
const { Markup } = telegraf;

composer.action(/next_(.+)_(.+)/gi, async (ctx) => {
  const isInit = parseInt(ctx.match[1]) === 0;
  const current = isInit ? 1 : parseInt(ctx.match[1]);
  const next = current + 1;

  const database = await reader();
  const datasets = database[current - 1];
  console.log(ctx.match[2]);
  if (!isInit) {
    const responseDs = database[current - 2]["answer"];
    const response = responseDs[parseInt(ctx.match[2])];

    console.log("adding", response);

    await addAnswer(ctx.from.id, ctx.from.username, response);
  }

  // When completes
  if (current > database.length) {
    // Show user responses and then clear
    const result = await fixedData(ctx.from.id);

    console.log(result)

    // let sum =0
    // for (let i in result.answer){
    //   sum+=result.answer[i]
    // }
    // console.log(Math.floor(sum/3))
    //



    await clearUser(ctx.from.id);

    return ctx.editMessageText(`You are done my friend!`, {
      parse_mode: "HTML",
    });
  }

  const keyboard = [];
  datasets.answer.map((item, index) =>
    keyboard.push([Markup.callbackButton(item, `next_${next}_${index}`)])
  );

  await ctx.editMessageText(message(datasets.question, datasets.id), {
    parse_mode: "HTML",
    reply_markup: Markup.inlineKeyboard(keyboard),
  });
});

middleware(composer);
