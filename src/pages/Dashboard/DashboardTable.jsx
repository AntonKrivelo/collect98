import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const DashboardTable = ({ inventory }) => {
  const { id, name, category_name, fields = [], items = [], user_name, created_at } = inventory;

  const columns = fields.map(({ field_name = '', category_name = '' }) => ({
    field: field_name,
    headerName: field_name,
    width: 150,
  }));

  const [itemsInventory, setItemsInventory] = useState(items);

  const rows = itemsInventory.map((item) => ({
    id: item.id,
    created_at: item.created_at,
    ...(item.values || {}),
  }));

  return (
    <>
      <Typography>Inventory ID:{id}</Typography>
      {category_name && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          Name category: {category_name}
        </Typography>
      )}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Name inventory: {name}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Created user: {user_name}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Created inventory: {created_at}
      </Typography>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5]} sx={{ border: 0 }} />
      </div>
    </>
  );
};

export default DashboardTable;
