const InventoryTable = ({ inventory }) => {
  const { id, name, created_at, user_id, category_name, fields = [], items = [] } = inventory;

  const columns = fields.map(({ field_name = '' }) => {
    return { field: field_name, headerName: field_name, width: 150 };
  });
};

export default InventoryTable;
