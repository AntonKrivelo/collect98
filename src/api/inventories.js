import axiosBase from './axiosBase';

export const getAllInventories = async () => {
  const { data } = await axiosBase.get('/inventories');
  return data;
};

export const getInventoriesByUser = async (userId) => {
  const { data } = await axiosBase.get(`/inventories/${userId}`);
  return data;
};

export const createInventory = async (payload) => {
  const { data } = await axiosBase.post('/inventories', payload);
  return data;
};

export const addInventoryItem = async (inventoryId, payload) => {
  const { data } = await axiosBase.post(`/inventories/${inventoryId}`, payload);
  return data;
};

export const deleteInventoryItems = async (payload) => {
  const { data } = await axiosBase.delete('/inventory-items', { data: payload });
  return data;
};

export const deleteInventory = async (inventoryId) => {
  const { data } = await axiosBase.delete(`/inventories/${inventoryId}`);
  return data;
};
