import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  Button,
  Checkbox,
  Paper,
  Tooltip,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const initialUsers = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', role: 'user', blocked: false },
  { id: 2, name: 'Мария Иванова', email: 'maria@example.com', role: 'admin', blocked: false },
  { id: 3, name: 'Павел Смирнов', email: 'pavel@example.com', role: 'user', blocked: true },
  { id: 4, name: 'Алексей Сидоров', email: 'alexey@example.com', role: 'user', blocked: false },
];

export default function AdminPanel() {
  const [users, setUsers] = useState(initialUsers);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');

  const handleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]));
  };

  const handleBlock = () => {
    confirmDialog({
      message: 'Are you sure you want to blocked selected users?',
      header: 'Confirmation',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        setUsers((prev) =>
          prev.map((u) => (selected.includes(u.id) ? { ...u, blocked: true } : u)),
        );
        setSelected([]);
      },
    });
  };

  const handleUnblock = () => {
    setUsers((prev) => prev.map((u) => (selected.includes(u.id) ? { ...u, blocked: false } : u)));
    setSelected([]);
  };

  const handleDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete selected users?',
      header: 'Confirmation',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        setUsers((prev) => prev.filter((u) => !selected.includes(u.id)));
        setSelected([]);
      },
    });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const allSelected = selected.length > 0;

  return (
    <Box sx={{ maxWidth: 1100, margin: '50px auto' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Admin Panel — User Management
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
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, maxWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Block the selected">
              <Button
                variant="contained"
                onClick={handleBlock}
                disabled={!allSelected}
                size="small"
              >
                Blocked
              </Button>
            </Tooltip>
            <Tooltip title="Unlock the selected">
              <Button
                variant="contained"
                onClick={handleUnblock}
                disabled={!allSelected}
                size="small"
              >
                Unblock
              </Button>
            </Tooltip>
            <Tooltip title="Delete selected">
              <Button
                variant="contained"
                onClick={handleDelete}
                disabled={!allSelected}
                size="small"
              >
                Delete
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Paper>

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">Users is not...</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  selected={selected.includes(user.id)}
                  sx={{
                    backgroundColor: user.blocked ? '#ffebee' : 'inherit',
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(user.id)}
                      onChange={() => handleSelect(user.id)}
                    />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.blocked ? (
                      <Typography color="error">Blocked</Typography>
                    ) : (
                      <Typography color="success.main">Active</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
