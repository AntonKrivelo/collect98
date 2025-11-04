import axiosBase from './axiosBase';

export const getAllInventories = async () => await axiosBase.get('/inventories');

export const getInventoriesByUser = async (userId) => await axiosBase.get(`/inventories/${userId}`);

export const createInventory = async (payload) => await axiosBase.post('/inventories', payload);

export const addInventoryItem = async (inventoryId, payload) =>
  await axiosBase.post(`/inventories/${inventoryId}`, payload);

export const deleteInventoryItems = async (payload) =>
  await axiosBase.delete('/inventory-items', { data: payload });

export const deleteInventory = async (inventoryId) =>
  await axiosBase.delete(`/inventories/${inventoryId}`);
