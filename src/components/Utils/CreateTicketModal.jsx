import { useState } from 'react';
import axiosBase from '../../api/axiosBase';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};

export default function CreateTicketModal({ currentUser, currentPageLink, inventories, onClose }) {
  const [summary, setSummary] = useState('');
  const [priority, setPriority] = useState('Average');
  const [admins, setAdmins] = useState('admin@example.com');
  const [selectedInventoryId, setSelectedInventoryId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const inventoryTitle = inventories.find((i) => i.id === selectedInventoryId)?.name || null;

      await axiosBase.post('/tickets/upload-json', {
        reported_by: `${currentUser.name} <${currentUser.email}>`,
        inventory: inventoryTitle,
        link: currentPageLink,
        summary,
        priority,
        admins: admins
          .split(',')
          .map((a) => a.trim())
          .filter(Boolean),
      });

      alert('Ticket successfully created and uploaded to Dropbox!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error while creating support ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create Support Ticket
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Inventory</InputLabel>
          <Select
            value={selectedInventoryId}
            label="Inventory"
            onChange={(e) => setSelectedInventoryId(e.target.value)}
          >
            <MenuItem value="">No inventory</MenuItem>
            {inventories.map((inv) => (
              <MenuItem key={inv.id} value={inv.id}>
                {inv.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          fullWidth
          value={priority}
          label="Priority"
          onChange={(e) => setPriority(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Average">Average</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Admins (comma separated)"
          value={admins}
          onChange={(e) => setAdmins(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button variant="contained" fullWidth disabled={loading} onClick={handleSend}>
          {loading ? 'Sending...' : 'Send Ticket'}
        </Button>
      </Box>
    </Modal>
  );
}
