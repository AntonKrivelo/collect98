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
import styles from './InventoryModal.module.scss';
import axiosBase from '../../api/axiosBase';

const InventoryModal = ({
  open,
  onClose,
  setIsSuccessCreatedAlert,
  inventories,
  setInventories,
  userId,
}) => {
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
        setLoading(true);
        const res = await axiosBase.get('/categories');
        setCategories(res.data.category || []);
        setFields([
          { field_name: '', field_type: 'string', is_visible: true },
          { field_name: '', field_type: 'string', is_visible: true },
        ]);
      } catch (err) {
        console.error('Error loading category:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [open]);

  const handleAddField = () => {
    setFields([...fields, { field_name: '', field_type: 'string', is_visible: true }]);
    setError('');
  };

  const handleFieldChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleRemoveField = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);

      if (!userId) return setError('User ID not found.');

      if (fields.some((f) => !f.field_name.trim())) {
        return setError('All fields must have a name.');
      }

      const mapFields = fields.map((e) => ({
        ...e,
        field_name: e.field_name.trim().toLowerCase(),
      }));

      const res = await axiosBase.post('/inventories', {
        userId,
        name: inventoryName.trim().toLowerCase(),
        categoryId: selectedCategory,
        fields: mapFields,
      });

      if (res.status === 201 || res.data.inventory) {
        setIsSuccessCreatedAlert(true);
        setInventories([res.data.inventory, ...inventories]);
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong while creating inventory');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalStyle} component="form" onSubmit={handleSubmit}>
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
              small="true"
            />
            <Select
              value={f.field_type}
              onChange={(e) => handleFieldChange(index, 'field_type', e.target.value)}
              sx={{ width: 100 }}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
            </Select>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveField(index)}
              disabled={fields.length <= 2 || loading}
            >
              Delete
            </Button>
          </Box>
        ))}

        <Button disabled={fields.length >= 8} onClick={handleAddField} sx={{ mt: 2 }}>
          Add field
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Create
        </Button>

        <Button
          onClick={handleCancel}
          disabled={loading}
          sx={{ marginTop: '10px' }}
          variant="contained"
          color="primary"
          fullWidth
        >
          Cancel
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default InventoryModal;
