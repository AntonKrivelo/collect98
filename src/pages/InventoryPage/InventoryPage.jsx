import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Button, Toolbar, Typography } from '@mui/material';
import SearchBar from '../../components/Utils/SearchBar';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'equipment', headerName: 'Equipment', width: 130 },
  { field: 'year', headerName: 'Year', width: 130, type: 'number' },
];

const rows = [
  { id: 1, equipment: 'NoteBook', year: 2025 },
  { id: 2, equipment: 'MacBook', year: 2024 },
  { id: 3, equipment: 'Iphone', year: 2023 },
];

const paginationModel = { page: 0, pageSize: 5 };

const InventoryPage = () => {
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleOnRowSelectionModelChange = ({ type, ids }) => {
    if (type === 'include') {
      setSelectedRows([...ids]);
    }
    console.log({ type, ids });
    if (type === 'exclude') {
      const selectedRows = rows.filter(({ id }) => ![...ids].includes(id)).map(({ id }) => id);
      setSelectedRows(selectedRows);
    }
  };

  const filteredRows = rows.filter((row) =>
    row.equipment.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <Box sx={{ maxWidth: 1100, margin: '20px auto' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Inventories Panel
        </Typography>
        <Paper elevation={3} sx={{ mb: 2, p: 1 }}>
          <Toolbar
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <SearchBar value={search} onChange={setSearch} placeholder="Search by equipment..." />
            <Button
              variant="contained"
              onClick={() => {}}
              disabled={selectedRows.length === 0}
              size="small"
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => {}}
              disabled={selectedRows.length === 0}
              size="small"
            >
              Delete
            </Button>
          </Toolbar>
        </Paper>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(rows) => handleOnRowSelectionModelChange(rows)}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default InventoryPage;
