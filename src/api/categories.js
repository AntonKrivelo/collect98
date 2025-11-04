import axiosBase from './axiosBase';

export const getCategories = async () => {
  const { data } = await axiosBase.get('/categories');
  return data.category;
};

export const createCategory = async (categoryName) => {
  const { data } = await axiosBase.post('/categories', { category: categoryName });
  return data.category;
};
