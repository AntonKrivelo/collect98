import { Alert, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import axios from 'axios';
import useConfirmDialog from '../../components/Utils/useConfirmDialog';

const DashboardTable = ({ inventory }) => {
  const { id, name, user_id, category_name, fields = [], items = [] } = inventory;

  const columns = fields.map(({ field_name = '' }) => ({
    field: field_name,
    headerName: field_name,
    width: 150,
  }));

  const [loading, setLoading] = useState(false);
  const [itemsInventory, setItemsInventory] = useState(items);

  const [error, setError] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleOnRowSelectionModelChange = ({ type, ids }) => {
    if (type === 'include') {
      setSelectedRows([...ids]);
    }

    if (type === 'exclude') {
      const selectedItems = itemsInventory
        .filter(({ id }) => ![...ids].includes(id))
        .map(({ id }) => id);
      setSelectedRows(selectedItems);
    }
  };

  const rows = itemsInventory.map((item) => ({
    id: item.id,
    created_at: item.created_at,
    ...(item.values || {}),
  }));

  return (
    <>
      <Typography>Inventory ID:{id}</Typography>
      {category_name && (
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Name category: {category_name}
        </Typography>
      )}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Name inventory: {name}
      </Typography>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          onRowSelectionModelChange={(rows) => handleOnRowSelectionModelChange(rows)}
          checkboxSelection
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          sx={{ border: 0 }}
        />
      </div>
    </>
  );
};

export default DashboardTable;
