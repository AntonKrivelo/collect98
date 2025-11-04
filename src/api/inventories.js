import axiosBase from './axiosBase';

export const getInventories = async () => await axiosBase.get(`/inventories`);

export const getInventoriesByUserId = async (userId) =>
  await axiosBase.get(`/inventories/${userId}`);

export const createInventory = async (payload) => await axiosBase.post('/inventories', payload);

export const deleteInventoryById = async ({ inventoryId, userId }) =>
  axiosBase.delete(`/inventories/${inventoryId}`, {
    data: { userId, inventoryId },
  });

export const createInventoryItem = async ({ inventoryId, payload }) =>
  await axiosBase.post(`http://localhost:4000/inventories/${inventoryId}`, {
    payload,
  });

export const deleteInventoryItems = async ({ inventoryId, payload }) =>
  axiosBase.delete(`http://localhost:4000/inventories/${inventoryId}/items`, {
    data: payload,
  });
