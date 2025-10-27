import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Toolbar, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import { Alert } from '@mui/material';

import axios from 'axios';
import CategoryModal from '../../components/Utils/CategoryModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'category', headerName: 'Category name', width: 380 },
];

const paginationModel = { page: 0, pageSize: 5 };

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/categories', {});
        setCategories(res.data.category || []);
      } catch (err) {
        console.error('Errors is loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  const handleCreateCategory = async (categoryName, id) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:4000/categories', {
        category: categoryName,
      });
      console.log('Category created:', categoryName);
      setIsSuccess(true);
      const newCategory = {
        category: categoryName,
        id: (categories.length + 1).toString(),
      };
      setCategories([...categories, newCategory]);
    } catch {
      console.error('Errors is create category:');
      setError(true);
      showModal(true);
    } finally {
      setLoading(false);
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
            <Button
              onClick={() => setShowModal(true)}
              sx={{ fontSize: '12px' }}
              variant="contained"
              size="small"
            >
              + Add category
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
            loading={loading}
            onRowSelectionModelChange={(rows) => handleOnRowSelectionModelChange(rows)}
            sx={{ border: 0 }}
          />
        </Paper>
        {isSuccess && (
          <Alert variant="outlined" severity="success">
            The category was successfully created!.
          </Alert>
        )}
        <CategoryModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateCategory}
          loading={loading}
          title="Create New Category"
          submitButtonText="Create"
        />
      </Box>
    </div>
  );
};

export default CategoriesPage;
