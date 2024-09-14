import api from ".";

const BASE_URL = "Games";

export const getAllWords = async () => {
  return await api.get(`/${BASE_URL}/words`);
};
