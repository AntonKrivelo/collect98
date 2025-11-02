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
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardTable from './DashboardTable';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOnlyWithItems, setShowOnlyWithItems] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredInventories = inventories.filter((inv) => {
    const matchesCategory = selectedCategory ? inv.category_id === selectedCategory : true;
    const matchesItems = showOnlyWithItems
      ? Array.isArray(inv.items) && inv.items.length > 0
      : true;
    return matchesCategory && matchesItems;
  });

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
  console.log(inventories);

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

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
            <MenuItem sx={{ fontWeight: 'bold' }}>All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showOnlyWithItems}
                onChange={(e) => setShowOnlyWithItems(e.target.checked)}
              />
            }
            label="Hide empty inventories"
          />
        </FormGroup>
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
