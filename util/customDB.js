const answers = {
  0: {
    from: "@xelopsys",
    answer: [],
  },
};

/**
 * Create or add data to user
 * @param user user ctx.id
 * @param username ctx.from.username
 * @param answer string user response
 * @returns {Promise<void>}
 */
export const addAnswer = async (user, username, answer) => {
  if (typeof answers[user] === "undefined") {
    answers[user] = {
      from: username,
      answer: [answer],
    };
  }

  answers[user].answer.push(answer);
};

export const getAnswers = async (user) => {
  return answers[user];
};

export const clearUser = async (user) => {
  delete answers[user];
};

export const fixedData = async (user) => {
  await answers[user].answer.shift();
  return answers[user];
};
