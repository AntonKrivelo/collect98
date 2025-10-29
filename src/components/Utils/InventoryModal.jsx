import { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FFF',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const InventoryModal = ({ open, onClose, onCreated }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inventoryName, setInventoryName] = useState('');
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:4000/categories', {});
        setCategories(res.data.category || []);
        setFields([
          { field_name: '', field_type: 'string', is_visible: true },
          { field_name: '', field_type: 'string', is_visible: true },
        ]);
      } catch (err) {
        console.error('Error loading category:', err);
      }
    };
    fetchCategories();
  }, [open]);

  const handleAddField = () => {
    if (fields.length >= 5) {
      setError('Max fields to 5');
      return;
    }
    setFields([...fields, { field_name: '', field_type: 'string', is_visible: true }]);
    setError('');
  };

  const handleFieldChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleRemoveField = (index) => {
    if (fields.length <= 2) {
      setError('Minimal fields 2...');
      return;
    }
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!userId) return setError('User ID not found.');

      if (fields.length < 2) {
        return setError('Minimal 2 fields');
      }

      const res = await axios.post(
        'http://localhost:4000/inventories',
        {
          userId,
          name: inventoryName,
          categoryId: selectedCategory,
          fields,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.data.ok) {
        setInventoryName([...inventoryName, res.data.inventory]);
      }
      onClose();
    } catch (err) {
      console.error('Error creating inventory:', err);
      setError('Error creating inventory');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create new inventory
        </Typography>
        <FormControl fullWidth required sx={{ mb: 3 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Name is inventory"
          fullWidth
          required
          value={inventoryName}
          onChange={(e) => setInventoryName(e.target.value)}
          sx={{ mb: 2 }}
        />

        {fields.map((f, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
            <TextField
              label="Name Field"
              value={f.field_name}
              onChange={(e) => handleFieldChange(index, 'field_name', e.target.value)}
              fullWidth
            />
            <Select
              value={f.field_type}
              onChange={(e) => handleFieldChange(index, 'field_type', e.target.value)}
              sx={{ width: 150 }}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
            </Select>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveField(index)}
              disabled={fields.length <= 2}
            >
              Delete
            </Button>
          </Box>
        ))}

        <Button disabled={fields.length >= 5} onClick={handleAddField} sx={{ mt: 2 }}>
          Add field
        </Button>

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Created...' : 'Create'}
        </Button>
        {onCreated && (
          <Alert variant="outlined" severity="success">
            The Inventory was successfully created!.
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default InventoryModal;
