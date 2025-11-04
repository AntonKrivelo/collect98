import axiosBase from './axiosBase';

export const patchUsers = async (usersUpdateData) => {
  const { data } = await axiosBase.patch('/users', { users: usersUpdateData });
  return data;
};

export const getUserById = async (id) => {
  const { data } = await axiosBase.get(`/users/${id}`);
  return data;
};

export const deleteUsers = async (ids) => {
  const { data } = await axiosBase.delete('/users', { data: { ids } });
  return data;
};
