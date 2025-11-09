import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Toolbar, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import { Alert } from '@mui/material';
import CategoryModal from '../../components/Utils/CategoryModal';
import axiosBase from '../../api/axiosBase';

const CategoriesPage = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'category', headerName: 'Category name', width: 380 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDeleteCategory(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axiosBase.get('/categories');
        setCategories(res.data.category || []);
      } catch (err) {
        console.error('Errors is loading categories:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async (categoryName, id) => {
    setLoading(true);
    try {
      const res = await axiosBase.post('/categories', {
        category: categoryName,
      });

      if (res.data.ok) {
        setIsSuccess(true);
        setCategories([...categories, res.data.category]);
      }
    } catch {
      console.error('Errors is create category:');
      setError(true);
      showModal(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
    }
  };

  const handleDeleteCategory = async (id) => {
    setLoading(true);
    try {
      const res = await axiosBase.delete(`/categories/${id}`);
      if (res.data.ok) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        setIsSuccess(true);
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => setIsSuccess(false), 1000);
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
            loading={loading}
            sx={{ border: 0 }}
          />
        </Paper>

        {isSuccess && (
          <Alert variant="outlined" severity="success">
            The category was successfully created!.
          </Alert>
        )}

        {error && (
          <Alert variant="outlined" severity="error">
            An error occurred while loading or creating categories.
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
