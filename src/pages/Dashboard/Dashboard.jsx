import {
  Box,
  Paper,
  Typography,
  Pagination,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardTable from './DashboardTable';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const filteredInventories = selectedCategory
    ? inventories.filter((inv) => inv.category_id === selectedCategory)
    : inventories;

  const currentInventories = filteredInventories.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/categories', {});
        setCategories(res.data.category || []);
      } catch (err) {
        console.error('Error loading category:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`http://localhost:4000/inventories`, {});

        setInventories(res.data.inventories || []);
      } catch (err) {
        console.error('Error loading inventories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4, mt: 4, fontWeight: 'bold', textAlign: 'center' }}>
        Dashboard
      </Typography>

      <Box sx={{ maxWidth: 1100, margin: '20px auto' }}>
        <FormControl fullWidth required sx={{ mb: 3 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {inventories.length === 0 ? (
          <Typography>Is loading...</Typography>
        ) : (
          <>
            {currentInventories.map((inventory) => (
              <Paper key={inventory.id} sx={{ mb: 4, p: 2 }}>
                <DashboardTable setInventories={setInventories} inventory={inventory} />
              </Paper>
            ))}
            <Pagination
              count={Math.ceil(inventories.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
            />
          </>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
