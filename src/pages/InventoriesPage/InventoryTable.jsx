import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const InventoryTable = ({ inventory }) => {
  const { id, name, created_at, user_id, category_name, fields = [], items = [] } = inventory;

  const columns = fields.map(({ field_name = '' }) => ({
    field: field_name,
    headerName: field_name,
    width: 150,
  }));

  return (
    <>
      {category_name && (
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          {category_name}
        </Typography>
      )}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Name inventory: {name}
      </Typography>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid columns={columns} pageSizeOptions={[5]} sx={{ border: 0 }} />
      </div>
    </>
  );
};

export default InventoryTable;
