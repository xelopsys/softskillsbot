import { composer, middleware } from "../../core/core.js";
import pkg from "telegraf";
const { Extra, Markup } = pkg;
// import axios from "axios";

composer.start(async (ctx) => {
  await ctx.replyWithHTML(
    `Assalom aleykum, botimizga xush kelibsiz, avval telefon raqamingizni jo'nating.
        
--------------------------
        
Здравствуйте, добро пожаловать в наш бот, пожалуйста, сначала пришлите свой номер телефона. 
        `,
    //   Markup.keyboard([["Русский 🇷🇺", "O`zbekcha 🇺🇿"]])
    //     .oneTime()
    //     .resize()
    //     .extra()
    // )
    // .then(() => console.log(ctx.message.text));

    Extra.markup((markup) => {
      return markup
        .resize()
        .oneTime()
        .keyboard([markup.contactRequestButton("Send contact")]);
    })
  );
});

composer.on("contact", async (ctx) => {
  await ctx.replyWithHTML(
    `Tahsil olayotgan yo\`nalishingizni tanlang\n\n` +
      `--------------------------\n\n` +
      `Выберите направление обучения`,
    Markup.keyboard([["Fullstack", "Data Science", "Software Engineering"]])
      .oneTime()
      .resize()
      .extra()
  );
  // .then(() => console.log(ctx.message.text))
  // let chatId = -1001737340674
  // const message = ctx.message.text
  // await ctx.telegram.sendMessage(chatId, message)

  // const contact = ctx.message.contact.phone_number
  //
  // console.log(contact)
});

composer.hears("Software Engineering", async (ctx) => {
  // const course = ctx.message.text
  // console.log((course))

  await ctx.replyWithHTML(
    `Ism, familiyangizni va yoshingizni yozib yuboring\n\n` +
      `--------------------------\n\n` +
      `Напишите свое имя, фамилию и возраст`
  );
  // .then(() => console.log(ctx.message))
});

composer.hears("Fullstack", async (ctx) => {
  // const course = ctx.message.text
  // console.log((course))

  await ctx.replyWithHTML(
    `Ism, familiyangizni va yoshingizni yozib yuboring\n\n` +
      `--------------------------\n\n` +
      `Напишите свое имя, фамилию и возраст`
  );
  // .then(() => console.log(ctx.message))
});
composer.hears("Data Science", async (ctx) => {
  // const course = ctx.message.text
  // console.log((course))

  await ctx.replyWithHTML(
    `Ism, familiyangizni va yoshingizni yozib yuboring\n\n` +
      `--------------------------\n\n` +
      `Напишите свое имя, фамилию и возраст`
  );
  // .then(() => console.log(ctx.message))
});

composer.hears("Русский 🇷🇺", async (ctx) => {
  // const sss = ctx.message.text
  //
  // var user = ctx.from.id
  // let message = ctx.message.text.toString()
  // console.log(message)

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
  // const text = ctx.message.text;
  // console.log(text)

  //         `Пожалуйста, отправляйте информацию в следующем порядке:
  // 1.<b>ФИО</b>
  // 2.<b>Возраст</b>
  // 3.<b>Номер телефона</b>
  // и <b>ЗАТЕМ</b>, отправив данныx, нажмите кнопку, чтобы выбрать свой пол`

  if (text === "Русский 🇷🇺") {
    await ctx.replyWithHTML(
      `Пожалуйста, выберите свой пол`,
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
      `Iltimos, jinsingizni tanlang`,
      Markup.keyboard([["erkak", "ayol"]])
        .oneTime()
        .resize()
        .extra()
    );
  }
});

composer.on("text", async (ctx) => {
  await ctx.replyWithHTML(
    `Testni boshlash uchun o\`zingizga qulay tilni tanlang\n\n` +
      `--------------------------\n\n` +
      `Выберите язык, который подходит вам, чтобы начать тест`,
    Markup.keyboard([["Русский 🇷🇺", "O`zbekcha 🇺🇿"]])
      .oneTime()
      .resize()
      .extra()
  );
  // .then(() => console.log(ctx.message))
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
