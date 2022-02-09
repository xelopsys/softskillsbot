import { composer, middleware } from "../../core/core.js";
import pkg from "telegraf";
const { Extra, Markup } = pkg;
// import axios from "axios";

composer.start(async (ctx) => {
  await ctx
    .replyWithHTML(
      `Assalom aleykum, botimizga xush kelibsiz, davom etish uchun bir tilni tanlang.
        
--------------------------
        
Здравствуйте, добро пожаловать в наш бот, выбери язык для продолжения. 
        `,
      Markup.keyboard([["Русский 🇷🇺", "O`zbekcha 🇺🇿"]])
        .oneTime()
        .resize()
        .extra()
    )
    .then((r) => console.log(r));
});

composer.hears("Русскый 🇷🇺", async (ctx) => {
  // let user = ctx.from.id
  // let text = ctx.message.text
  // console.log(text)

  // ctx.telegram.sendMessage(user, text).then();
  // ctx.telegram.sendContact(user, contact).then()
  // await ctx
  //   .reply(
  //     "Пожалуйста, отправите свой номер телефон нажимая на кнопку.",
  //     Extra.markup((markup) => {
  //       return markup
  //         .resize()
  //         .oneTime()
  //         .keyboard([markup.contactRequestButton("Send contact")]);
  //     })
  //   )
  //   .then((r) => console.log(r));
  const text = ctx.message.text;

  if (text === "Русский 🇷🇺") {
    await ctx.replyWithHTML(
      `Пожалуйста, отправляйте информацию в следующем порядке:
1.<b>ФИО</b>
2.<b>Возраст</b> 
3.<b>Номер телефона</b>
и <b>ЗАТЕМ</b>, отправив данныx, нажмите кнопку, чтобы выбрать свой пол`,
      Markup.keyboard([["мужчина", "женщина"]])
        .oneTime()
        .resize()
        .extra()
    );
  }
});

composer.hears("O`zbekcha 🇺🇿", async (ctx) => {
  // let user = ctx.from.id
  // let text = ctx.message.text
  // console.log(text)

  // ctx.telegram.sendMessage(user, text).then();
  // ctx.telegram.sendContact(user, contact).then()
  const text = ctx.message.text;
  // await ctx
  //     .reply(
  //         "Iltimos, tugmani bosib o’z telefon raqamingizni jo’nating.",
  //         Extra.markup((markup) => {
  //             return markup
  //                 .resize()
  //                 .oneTime()
  //                 .keyboard([markup.contactRequestButton("Send contact")]);
  //         })
  //     )
  //     .then((r) => console.log(r));

  if (text === "O`zbekcha 🇺🇿") {
    await ctx.replyWithHTML(
      `Iltimos o'z ma’lumotlaringizni quyidagi tartibda jo'nating:
1.<b>FIO</b>
2.<b>Yosh</b> 
3.<b>Telefon raqami</b>  
va <b>SO'NGRA</b>, ma'lumotlarni jo'natib, o'z jinsingizni tanlash uchun tugmani bosing`,
      Markup.keyboard([["erkak", "ayol"]])
        .oneTime()
        .resize()
        .extra()
    );
  }
});

//     let user = ctx.from.id
//     let text = ctx.message.text
//     let contact = ctx.message.contact
//     console.log(text)
//     console.log(contact)
//     let chatId = -1001737340674
//     let text = ctx.message.text
//     await ctx.telegram.sendMessage(chatId, text)
// let contact = ctx.message.contact.phone_number

middleware(composer);
