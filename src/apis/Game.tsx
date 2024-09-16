import api from ".";

const BASE_URL = "Games";

export const getAllWords = async () => {
  return (await api.get(`/${BASE_URL}/words`))?.data;
};

export const getAllAvailableRooms = async () => {
  return (await api.get(`/${BASE_URL}/rooms`))?.data;
};

export const createSession = async (
  wordList: string[],
  isMultiplayer: boolean,
  maxGuesses: number,
  word?: string
) => {
  return (
    await api.post(`/${BASE_URL}/sessions`, {
      wordList,
      word,
      maxGuesses,
      isMultiplayer,
    })
  )?.data;
};

export const checkGuess = async (id?: string, guess?: string) => {
  return (await api.get(`/${BASE_URL}/check/${id}/${guess}`))?.data;
};
