import telegraf from "telegraf";
const { Markup } = telegraf;
import { composer, middleware } from "../../core/core.js";
// мужчина   женщина   erkak  ayol

composer.hears("мужчина", async (ctx) => {
  await ctx.replyWithHTML(`«Вам предлагается ряд утверждений, касающихся различных сторон Вашей жизни и способов обращения со временем. Выберите на шкале ту цифру, которая в наибольшей мере характеризует Вас и отражает Вашу точку зрения (1 — полное несогласие, 7 — полное согласие с данным утверждением, 4 — нейтрально).»\n\n` + `<b>Вы готовы начать тест?</b>`, {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`я готов`, `next_0_0`),
        Markup.callbackButton(`я не готов`, `not_ready`),
      ],
    ]),
  });
});
composer.hears("женщина", async (ctx) => {
  await ctx.replyWithHTML(`«Вам предлагается ряд утверждений, касающихся различных сторон Вашей жизни и способов обращения со временем. Выберите на шкале ту цифру, которая в наибольшей мере характеризует Вас и отражает Вашу точку зрения (1 — полное несогласие, 7 — полное согласие с данным утверждением, 4 — нейтрально).»\n\n` + `<b>Вы готовы начать тест?</b>`, {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`я готовa`, `next_0_0`),
        Markup.callbackButton(`я не готовa`, `not_ready`),
      ],
    ]),
  });
});
composer.hears("erkak", async (ctx) => {
  await ctx.replyWithHTML(`«Sizga hayotingizning turli sohalari va vaqt bilan munosabatda bo'lish usullariga oid bir qator bayonotlar taklif etiladi. O'lchovda sizni eng ko'p tavsiflovchi va sizning nuqtai nazaringizni aks ettiruvchi raqamni tanlang (1 - mos emas, 7 - bu bayonot to'liq mos, 4 - o'rtacha).»\n\n` + `<b>Testni boshlashga tayyormisiz?</b>`, {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`Men tayyorman`, `uz_0_0`),
        Markup.callbackButton(`Men tayyor emasman`, `not_ready`),
      ],
    ]),
  });
});
composer.hears("ayol", async (ctx) => {
  await ctx.replyWithHTML(`«Sizga hayotingizning turli sohalari va vaqt bilan munosabatda bo'lish usullariga oid bir qator bayonotlar taklif etiladi. O'lchovda sizni eng ko'p tavsiflovchi va sizning nuqtai nazaringizni aks ettiruvchi raqamni tanlang (1 - mos emas, 7 - bu bayonot to'liq mos, 4 - o'rtacha).»\n\n` + `<b>Testni boshlashga tayyormisiz?</b>`, {
    reply_markup: Markup.inlineKeyboard([
      [
        Markup.callbackButton(`Men tayyorman`, `uz_0_0`),
        Markup.callbackButton(`Men tayyor emasman`, `not_ready`),
      ],
    ]),
  });
});
middleware(composer);
