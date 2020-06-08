// Obtendo token da API Trivia
export const getTriviaToken = async () => {
  const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(TOKEN_URL);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

// Obtendo questões da API Trivia
export const getTriviaQuestions = async (token) => {
  const QUESTIONS_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(QUESTIONS_URL);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

// Obtendo informações da API Gravatar
export const getAvatar = async (hash) => {
  const AVATAR_URL = `https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`;
  const response = await fetch(AVATAR_URL);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};
