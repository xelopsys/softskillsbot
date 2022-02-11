import reader from "../../../util/jsonuz.js";
import { addAnswer, clearUser, fixedData } from "../../../util/customDB.js";
import { composer, middleware } from "../../../core/core.js";
import { message } from "../../../util/resources.js";
import telegraf from "telegraf";
const { Markup } = telegraf;

composer.action(/uzf_(.+)_(.+)/iu, async (ctx) => {
  const isInit = parseInt(ctx.match[1]) === 0;
  const current = isInit ? 1 : parseInt(ctx.match[1]);
  const next = current + 1;

  const database = await reader();
  const datasets = database[current - 1];
  console.log(ctx.match[2]);
  if (!isInit) {
    const responseDs = database[current - 2]["answer"];
    const response = responseDs[parseInt(ctx.match[2])];

    // console.log("adding", response);

    await addAnswer(ctx.from.id, ctx.from.username, response);
  }

  // When completes
  if (current > database.length) {
    // Show user responses and then clear
    const result = await fixedData(ctx.from.id);

    // console.log(result);

    ////////////////////////

    let nastoychivost = result.answer.slice(0, 5);

    let planomernost = result.answer.slice(5, 9);
    let fiksatsiya = result.answer.slice(9, 14);
    let tseleustremlyonnost = result.answer.slice(14, 20);
    let orientatsiya = result.answer.slice(20, 22);
    let samoorganizatsiya = result.answer.slice(22);

    let sum = 0;
    let sump = 0;
    let sumf = 0;
    let sumt = 0;
    let sumo = 0;
    let sums = 0;
    let sumGeneral = 0;
    for (let n in nastoychivost) {
      sum += 8 - nastoychivost[n];
    }
    for (let p in planomernost) {
      sump += planomernost[p];
    }
    for (let f in fiksatsiya) {
      sumf += fiksatsiya[f];
    }
    sumt =
      tseleustremlyonnost[0] +
      tseleustremlyonnost[1] +
      tseleustremlyonnost[2] +
      tseleustremlyonnost[3] +
      (8 - tseleustremlyonnost[4]) +
      tseleustremlyonnost[5];

    for (let o in orientatsiya) {
      sumo += orientatsiya[o];
    }
    for (let s in samoorganizatsiya) {
      sums += samoorganizatsiya[s];
    }
    for (let g in result.answer) {
      sumGeneral += result.answer[g];
    }

    const resultN = () => {
      if (sum < 11.98) {
        return `Boshlagan ishni mantiqiy yakuniga yetkazish uchun irodali sa'y-harakatlar qilish qiyin bo'lishi mumkin, sizni begona narsalar bilan chalg'itishga moyil bo'lasiz.`;
      }
      if (sum > 11.98 && sum <= 17.41) {
        return `Siz juda tartibli va tuzilgansiz, irodali harakatlarga qodirsiz, garchi siz boshlagan ishni tashlab, siz uchun muhimroq ishlarga o'tishingiz mumkin.`;
      }
      if (sum > 17.41) {
        return `Sizni kuchli irodali va uyushqoq, xulq-atvor faoliyatini tizimlashtirib, iroda kuchi bilan boshlagan ishni oxiriga yetkaza oladigan shaxs deb ta’riflash mumkin.`;
      }
    };
    const resultP = () => {
      if (sump <= 11.98) {
        return `Faoliyatingizni rejalashtirish va ishlab chiqilgan rejani muntazam ravishda bajarish siz uchun qiyin bo'lishi mumkin.`;
      }
      if (sump > 11.98 && sump <= 17.41) {
        return `Siz o'z maqsadlaringizga erishishda aniq rejalar ishlab chiqishga va ularga muntazam ravishda amal qilishga o'rtacha darajada moyilsiz.`;
      }
      if (sump > 17.41) {
        return `Siz juda tizimlisiz, maqsadlaringizga doimiy ravishda erishishni afzal ko'rasiz va taktik rejalashtirish ko'nikmalariga egasiz.`;
      }
    };
    const resultF = () => {
      if (sumf <= 11.98) {
        return `Siz yangi faoliyat va munosabatlarga osongina o'tadigan moslashuvchan odamsiz. Ba'zi hollarda, siz etarli darajada bog'lanmagan va izchil deb hisoblanasiz.`;
      }
      if (sumf > 11.98 && sumf <= 17.41) {
        return `Siz o'z faoliyatingizni rejalashtirishda va munosabatlarni o'rnatishda juda moslashuvchan odamsiz, ammo siz o'z zimmangizga olgan majburiyatlarni bajarishga intilasiz.`;
      }
      if (sumf > 17.41) {
        return `Siz ijrochi va majburiy shaxssiz, boshlagan ishni oxiriga etkazish uchun har tomonlama harakat qilasiz. Ehtimol, siz o'z faoliyatingizni rejalashtirish va munosabatlarni o'rnatishda etarlicha moslashuvchan bo'lmasligingiz mumkin. `;
      }
    };
    const resultT = () => {
      if (sumt <= 11.98) {
        return `Siz har doim ham o'z maqsadlaringizni aniq ko'ra olmaysiz yoki o'zingiz uchun aniq maqsadlar qo'yishga moyil emassiz, maqsadli ravishda biror narsaga intilish va maqsadlaringizga erishish uchun harakat qilish tabiiy bo'lmasligi mumkin.`;
      }
      if (sumt > 11.98 && sumt <= 17.41) {
        return `Siz o'z maqsadlaringizni juda yaxshi ko'rasiz va tushunasiz va ularga erisha olasiz, garchi hayotingizda barcha harakatlaringiz sizga tushunarli bo'lgan maqsadlarga erishishga qaratilgan bo'lmagan davrlar bo'lishi mumkin.`;
      }
      if (sumt > 17.41) {
        return `Siz maqsadli va maqsadlisiz, nima istayotganingizni va nimaga intilayotganingizni bilasiz, maqsadlaringiz sari intilasiz.`;
      }
    };

    const resultO = () => {
      if (sumo <= 11.98) {
        return `Siz o'zingizning psixologik o'tmishingizda yoki kelajagingizda bu erda va hozirdan ko'ra ko'proq qiymat topasiz.`;
      }
      if (sumo > 11.98 && sumo <= 17.41) {
        return `Siz o'zingizning psixologik o'tmishingizni va kelajagingizni, ayni paytda siz bilan nima sodir bo'layotganini ko'rish va qadrlash imkoniyatiga egasiz.`;
      }
      if (sumo > 17.41) {
        return `Siz hozirgi vaqtda siz bilan nima sodir bo'layotganiga e'tibor qaratishga moyilsiz; siz uchun tajriba va "bu erda va hozir" sodir bo'layotgan narsalar alohida ahamiyatga ega.`;
      }
    };
    const resultS = () => {
      if (sums <= 11.98) {
        return `Faoliyatingizni tashkil qilishda siz o'z-o'zini tashkil qilish darajangizga salbiy ta'sir ko'rsatishi mumkin bo'lgan vaqtni boshqarishda yordam beradigan tashqi vositalardan foydalanishga moyil emassiz.`;
      }
      if (sums > 11.98 && sums <= 17.41) {
        return `Ishingizni va shaxsiy vaqtingizni rejalashtirishda siz ham yordamchi vositalarga (kundalik, daftar, rejalashtirish) va tabiiy tashkilotingizga tayanishingiz mumkin.`;
      }
      if (sums > 17.41) {
        return `Sizda o'z-o'zini tashkil qilish darajasi yuqori, rejalashtirishda siz yordamchi vositalardan (kundalik, rejalashtirish, vaqtni rejalashtirish) foydalanishga moyilsiz.`;
      }
    };
    const generalSum = () => {
      if (sumGeneral <= 89.28) {
        return `Faoliyatingizni qat'iy tuzilma va maqsadlarga bog'lashni emas, balki o'z-o'zidan yashashni afzal ko'rasiz. Sizning kelajagingiz o'zingiz uchun juda noaniq, siz kundalik faoliyatingizni aniq rejalashtirishga moyil emassiz va boshlagan ishni yakunlash uchun irodali harakatlar qilmaysiz, ammo bu sizga "olmasdan" tez va moslashuvchan ravishda yangi faoliyat turlariga o'tishga imkon beradi. faoliyatingizni tizimlashtirishda tiqilib qoldi.`;
      }
      if (sumGeneral > 89.28 && sumGeneral <= 108.3) {
        return `Siz hayotingizning vaqtini o'z-o'zidan va moslashuvchanlik bilan tashkil qilishda tizimli yondashuvni birlashtira olasiz, siz o'zingizning psixologik vaqtingizning barcha tarkibiy qismlarini qanday qadrlashni bilasiz va hayotingizning xilma-xilligidan o'zingiz uchun qimmatli tajribaga ega bo'lasiz.`;
      }
      if (sumGeneral > 108.3) {
        return `Siz maqsadlarni ko'rishga va belgilashga, o'z faoliyatingizni, shu jumladan tashqi vositalar yordamida rejalashtirishga va kuchli irodali fazilatlar va qat'iyatlilik bilan unga erishishga intilasiz. Ehtimol, muayyan harakatlarda siz haddan tashqari tuzilgan, tartibli va etarlicha moslashuvchan emassiz. Shunga qaramay, siz o'z faoliyatingizni samarali tarzda tuzishingiz mumkin.`;
      }
    };

    ///////////////

    // console.log(Math.floor(sum/3))

    await clearUser(ctx.from.id);

    return ctx.editMessageText(
      `Sizning test javoblaringiz\n\n` +
        `Шкала Настойчивость:\n` +
        `${resultN()}\n\n` +
        `Шкала Целеустремленность:\n` +
        `${resultT()}\n\n` +
        `Шкала Планомерность:\n` +
        `${resultP()}\n\n` +
        `Шкала Фиксация:\n` +
        `${resultF()}\n\n` +
        `Шкала Ориентация на настоящее:\n` +
        `${resultO()}\n\n` +
        `Шкала Самоорганизации:\n` +
        `${resultS()}` +
        `Общий суммарный балл по ОСД:\n` +
        `${generalSum()}`,
      {
        parse_mode: "HTML",
      }
    );
  }

  const keyboard = [];
  datasets.answer.map((item, index) =>
    keyboard.push([Markup.callbackButton(item, `uzf_${next}_${index}`)])
  );

  await ctx.editMessageText(message(datasets.question, datasets.id), {
    parse_mode: "HTML",
    reply_markup: Markup.inlineKeyboard(keyboard),
  });
});

middleware(composer);
