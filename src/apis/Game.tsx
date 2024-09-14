import api from ".";

const BASE_URL = "Games";

export const getAllWords = async () => {
  return await api.get(`/${BASE_URL}/words`);
};

export const createSession = async (word?: string) => {
  return await api.post(`/${BASE_URL}/sessions`, word);
};
