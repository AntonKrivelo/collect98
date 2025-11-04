import axiosBase from './axiosBase';

export const getCategories = async () => (await axiosBase.get('/categories')).data.category;

export const createCategory = async (categoryName) =>
  (await axiosBase.post('/categories', { category: categoryName })).data.category;
