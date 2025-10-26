import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Toolbar, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router';

import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'category', headerName: 'Category', width: 380 },
];

const paginationModel = { page: 0, pageSize: 5 };

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const handleOnRowSelectionModelChange = ({ type, ids }) => {
    if (type === 'include') {
      setSelectedRows([...ids]);
    }
    console.log({ type, ids });
    if (type === 'exclude') {
      const selectedCategories = categories
        .filter(({ id }) => ![...ids].includes(id))
        .map(({ id }) => id);
      setSelectedRows(selectedCategories);
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: 1100, margin: '20px auto' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Categories
        </Typography>

        <Paper elevation={3} sx={{ mb: 2, p: 1 }}>
          <Toolbar
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'space-between',
            }}
          >
            <Button
              sx={{ fontSize: '12px' }}
              variant="contained"
              onClick={() => {
                navigate('/admin-panel');
              }}
              size="small"
            >
              Back
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}></Box>
          </Toolbar>
        </Paper>

        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={categories}
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

export default CategoriesPage;
