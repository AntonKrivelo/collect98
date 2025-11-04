import axiosBase from './axiosBase';

export const login = async (credentials) => {
  const { data } = await axiosBase.post('/login', credentials);
  return data;
};

export const register = async (userData) => {
  const { data } = await axiosBase.post('/register', userData);
  return data;
};
