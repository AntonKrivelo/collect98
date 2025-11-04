import axiosBase from './axiosBase';

export const patchUsers = async (usersUpdateData) =>
  await axiosBase.patch('/users', { users: usersUpdateData });

export const getUserById = async (id) => await axiosBase.get(`/users/${id}`);

export const deleteUsers = async (ids) => await axiosBase.delete('/users', { data: { ids } });
