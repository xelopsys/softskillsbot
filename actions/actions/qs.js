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
  // console.log(ctx.match[2]);
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
      if (sum < 14.42) {
        return `Вам может быть сложно прикладывать волевые усилия для доведения начатого дела до его логического завершения, Вы склонны отвлекаться на посторонние дела.`;
      }
      if (sum > 14.42 && sum <= 19.03) {
        return `Вы достаточно организованны и структурированны, способны на волевые усилия, хотя и можете оставлять начатое дело, переключаясь на более значимые для Вас виды деятельности.`;
      }
      if (sum > 19.03) {
        return `Вас можно охарактеризовать как волевого и организованного человека, способного усилием воли структурировать свою поведенческую активность и завершить начатое дело.`;
      }
    };
    const resultP = () => {
      if (sump <= 14.42) {
        return `Вам может сложно даваться планирование Вашей деятельности и планомерное следование разработанному плану.`;
      }
      if (sump > 14.42 && sump <= 19.03) {
        return `Вы в умеренной степени склонны разрабатывать четкие планы и планомерно следовать им при достижении поставленных целей.`;
      }
      if (sump > 19.03) {
        return `Вы достаточно планомерны, предпочитаете последовательно реализовывать поставленные цели, имеете развитые навыки тактического планирования.`;
      }
    };
    const resultF = () => {
      if (sumf <= 14.42) {
        return `Вы гибкий человек, легко переключаетесь на новые виды деятельности и отношения. В отдельных ситуациях Вы можете восприниматься недостаточно обязательным и последовательным.`;
      }
      if (sumf > 14.42 && sumf <= 19.03) {
        return `Вы достаточно гибкий человек в планировании своей деятельности и в построении отношений, тем не менее Вы стремитесь выполнять данные Вами обязательства.`;
      }
      if (sumf > 19.03) {
        return `Вы исполнительный и обязательный человек, стремитесь всеми возможными способами завершить начатое дело. Возможно, Вы можете быть недостаточно гибкими в планировании своей деятельности и в построении отношений.`;
      }
    };
    const resultT = () => {
      if (sumt <= 14.42) {
        return `Вы не всегда четко видите свои цели или не склонны ставить перед собой конкретные цели, Вам может быть не свойственно к чему-либо целенаправленно стремиться и прилагать усилия для достижения поставленных целей.`;
      }
      if (sumt > 14.42 && sumt <= 19.03) {
        return `Вы достаточно хорошо видите и понимаете свои цели, способны достигать их, хотя в Вашей жизни могут быть периоды, когда не вся Ваша деятельность направлена на достижение каких-либо ясных для Вас целей.`;
      }
      if (sumt > 19.03) {
        return `Вы целеустремленны и целенаправленны, знаете, чего хотите и к чему стремитесь, идете по направлению к своим целям.`;
      }
    };

    const resultO = () => {
      if (sumo <= 14.42) {
        return `Вы склонны находить более ценным Ваше психологическое прошлое или будущее, нежели происходящее с Вами «здесь-и-сейчас».`;
      }
      if (sumo > 14.42 && sumo <= 19.03) {
        return `Вы способны видеть и ценить свое психологическое прошлое и будущее, наряду с происходящем с Вами в настоящий момент времени.`;
      }
      if (sumo > 19.03) {
        return `Вы склонны фиксироваться на происходящем с Вами в настоящий момент времени, для Вас переживания и происходящее «здесь-и-сейчас» имеет особую ценность и значимость.`;
      }
    };
    const resultS = () => {
      if (sums <= 14.42) {
        return `Вы не склонны при организации своей деятельности прибегать к помощи внешних средств, помогающих в управлении временем, что может негативно сказываться на Вашем уровне самоорганизации.`;
      }
      if (sums > 14.42 && sums <= 19.03) {
        return `При планировании своего рабочего и личного времени Вы можете полагаться как на вспомогательные средства (ежедневники, записные книжки, планнинги), так и на свою природную организованность.`;
      }
      if (sums > 19.03) {
        return `Вы обладаете высоким уровнем самоорганизации, при планировании склонны пользоваться вспомогательными средствами (ежедневником, планнингом, бюджетированием времени).`;
      }
    };
    const generalSum = () => {
      if (sumGeneral <= 94.11) {
        return `Вы предпочитаете жить спонтанно, не привязывать свою деятельность к жесткой структуре и целям. Ваше будущее для Вас самого достаточно туманно, Вам не свойственно четко планировать свою ежедневную активность и прилагать волевые усилия для завершения начатых дел, однако это позволяет Вам достаточно быстро и гибко переключаться на новые виды активности, не «застревая» на структурировании своей деятельности.`;
      }
      if (sumGeneral > 94.11 && sumGeneral <= 109.24) {
        return `Вы способны сочетать структурированный подход к организации времени своей жизни со спонтанностью и гибкостью, умеете ценить все составляющие Вашего психологического времени и извлекать для себя ценный опыт из многоплановости своей жизни.`;
      }
      if (sumGeneral > 109.24) {
        return `Вам свойственно видеть и ставить цели, планировать свою деятельность, в том числе с помощью внешних средств, и, проявляя волевые качества и настойчивость, идти к ее достижению. Возможно, в отдельных видах деятельности Вы можете быть чрезмерно структури- рованны, организованны и недостаточно гибки. Тем не менее Вы достаточно эффективно можете структурировать свою деятельность.`;
      }
    };

    ///////////////

    // console.log(Math.floor(sum/3))

    await clearUser(ctx.from.id);

    return ctx.editMessageText(
      `Ваши результаты теста\n\n` +
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
    keyboard.push([Markup.callbackButton(item, `next_${next}_${index}`)])
  );

  await ctx.editMessageText(message(datasets.question, datasets.id), {
    parse_mode: "HTML",
    reply_markup: Markup.inlineKeyboard(keyboard),
  });
});

middleware(composer);
