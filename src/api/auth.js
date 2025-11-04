import axiosBase from './axiosBase';

export const login = async (credentials) => await axiosBase.post('/login', credentials);

export const registerAuth = async (userData) => await axiosBase.post('/register', userData);

export const getMe = async () => await axiosBase.get('/me');
