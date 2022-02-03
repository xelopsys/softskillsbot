import { composer, middleware } from "../../core/core.js";
import pkg from "telegraf";
const { Extra } = pkg;
import axios from "axios";

composer.start(async (ctx) => {
  await ctx
    .replyWithHTML("<b>Please write down your name</b>")
    .then(() => console.log(ctx.chat.id));
  // composer.on('text', ctx => {
  //     let user = ctx.from.id
  //     let text = ctx.message.text
  //     let contact = ctx.message.contact
  //     console.log(text)
  //     console.log(contact)
  //
  //     ctx.telegram.sendMessage(user, text).then();
  //     // ctx.telegram.sendContact(user, contact).then()
  // })
  //     let chatId = -1001737340674
  //     let text = ctx.message.text
  //     await ctx.telegram.sendMessage(chatId, text)
});

composer.on("text", async (ctx) => {
  // let user = ctx.from.id
  // let text = ctx.message.text
  // console.log(text)

  // ctx.telegram.sendMessage(user, text).then();
  // ctx.telegram.sendContact(user, contact).then()
  await ctx
    .reply(
      "please send me ur contacts",
      Extra.markup((markup) => {
        return markup
          .resize()
          .oneTime()
          .keyboard([markup.contactRequestButton("Send contact")]);
      })
    )
    .then((r) => console.log(r));
});

composer.on("contact", async (ctx) => {
  await ctx
    .reply(`thank you, you can start your quiz \n` + `/quiz`)
    .then((r) => console.log(r));
  // let contact = ctx.message.contact.phone_number
  // console.log(contact)
});

// const admins = [1440607729, -1001737340674];
// const token = process.env.TOKEN
//
// const sendMessage =  (ctx) => {
//  if (
//         ctx.from.id &&
//          ctx.message.text &&
//         ctx.message.contact.phone_number
//
//     ) {
//
//         // "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$id}&parse_mode=html&text={$text}
//         admins.forEach((chat_id) => {
//             axios
//                 .get(`https://api.telegram.org/bot${token}/sendMessage`, {
//                     params: {
//                         chat_id: chat_id,
//                         parse_mode: "markdown",
//                         text: `**🥳 Тринг-тринг, у нас появился новый клиент!**\n\n👨🏻‍💻 ФИО: ${ctx.from.id + " " + ctx.message.text}\n📞Telefon: ${ctx.message.contact.phone_number}\n`
//                     },
//                 })
//                 .then(r => console.log(r))
//
//         });
//     } else {
//         ctx.reply('asdasd')
//     }
// };

middleware(composer);
