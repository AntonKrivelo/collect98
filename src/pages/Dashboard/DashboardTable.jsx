import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const DashboardTable = ({ inventory }) => {
  const { id, name, category_name, fields = [], items = [], user_name, created_at } = inventory;

  const columns = fields.map(({ field_name = '' }) => ({
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

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <>
      <Typography>Inventory ID:{id}</Typography>
      <Box display="flex" gap="15px">
        {category_name && (
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            {category_name}
          </Typography>
        )}
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          {name}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Created by: {user_name}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Created inventory: {formatDate(inventory.created_at)}
        </Typography>
      </Box>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5]} sx={{ border: 0 }} />
      </div>
    </>
  );
};

export default DashboardTable;
