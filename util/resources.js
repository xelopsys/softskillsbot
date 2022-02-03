import telegraf from "telegraf";
const { Markup } = telegraf;

export const message = (item, index) =>
  `<b>Questions ${index}</b>` + `\n` + `\n` + `${item}?`;
