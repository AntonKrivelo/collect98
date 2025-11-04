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
import InventoryTable from '../../components/InventoryTable/InventoryTable';
import { getAllInventories } from '../../api/inventories';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showOnlyWithItems, setShowOnlyWithItems] = useState(false);
  const [sortOption, setSortOption] = useState('newest');

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const filteredInventories = inventories.filter((inv) => {
    const matchesCategory = selectedCategory ? inv.category_id === selectedCategory : true;
    const matchesItems = showOnlyWithItems
      ? Array.isArray(inv.items) && inv.items.length > 0
      : true;
    return matchesCategory && matchesItems;
  });

  const sortedInventories = [...filteredInventories].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'most':
        return (b.items?.length || 0) - (a.items?.length || 0);
      case 'least':
        return (a.items?.length || 0) - (b.items?.length || 0);
      default:
        return 0;
    }
  });

  const currentInventories = sortedInventories.slice(
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

        const res = await getAllInventories();

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
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="sort-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sortOption}
            label="Sort by"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value="newest">Newest first</MenuItem>
            <MenuItem value="oldest">Oldest first</MenuItem>
            <MenuItem value="most">Most popular</MenuItem>
            <MenuItem value="least">Least popular</MenuItem>
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {currentInventories.map((inventory) => (
              <Paper key={inventory.id} sx={{ mb: 4, p: 2 }}>
                <InventoryTable inventory={inventory} withControls={false} />
              </Paper>
            ))}
            <Pagination
              count={Math.ceil(sortedInventories.length / itemsPerPage)}
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
