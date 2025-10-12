import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { confirmDialog } from 'primereact/confirmdialog';
import { Box, Button, Toolbar, Typography, Paper } from '@mui/material';
import SearchBar from '../Utils/SearchBar';

const initialUsers = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', role: 'user', blocked: false },
  { id: 2, name: 'Мария Иванова', email: 'maria@example.com', role: 'admin', blocked: false },
  { id: 3, name: 'Павел Смирнов', email: 'pavel@example.com', role: 'user', blocked: true },
  { id: 4, name: 'Алексей Сидоров', email: 'alexey@example.com', role: 'user', blocked: false },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'role', headerName: 'Role', width: 120 },
  {
    field: 'blocked',
    headerName: 'Status',
    width: 130,
    renderCell: (params) =>
      params.row.blocked ? (
        <Typography color="error">Blocked</Typography>
      ) : (
        <Typography color="success.main">Active</Typography>
      ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function AdminPanel() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState('');

  const filteredRows = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOnRowSelectionModelChange = ({ type, ids }) => {
    if (type === 'include') {
      setSelectedRows([...ids]);
    }
    console.log({ type, ids });
    if (type === 'exclude') {
      const selectedUsers = users.filter(({ id }) => ![...ids].includes(id)).map(({ id }) => id);
      setSelectedRows(selectedUsers);
    }
  };

  const handleBlock = () => {
    confirmDialog({
      message: 'Are you sure you want to block selected users?',
      header: 'Confirmation',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        setUsers((prev) =>
          prev.map((u) => (selectedRows.includes(u.id) ? { ...u, blocked: true } : u)),
        );
        setSelectedRows([]);
      },
    });
  };

  const handleUnblock = () => {
    setUsers((prev) =>
      prev.map((u) => (selectedRows.includes(u.id) ? { ...u, blocked: false } : u)),
    );
    setSelectedRows([]);
  };

  const handleDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete selected users?',
      header: 'Confirmation',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        setUsers((prev) => prev.filter((u) => !selectedRows.includes(u.id)));
        setSelectedRows([]);
      },
    });
  };

  return (
    <div>
      <Box sx={{ maxWidth: 1100, margin: '20px auto' }}>
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
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name or email..."
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleBlock}
                disabled={selectedRows.length === 0}
                size="small"
              >
                Block
              </Button>
              <Button
                variant="contained"
                onClick={handleUnblock}
                disabled={selectedRows.length === 0}
                size="small"
              >
                Unblock
              </Button>
              <Button
                variant="contained"
                onClick={handleDelete}
                disabled={selectedRows.length === 0}
                size="small"
              >
                Delete
              </Button>
            </Box>
          </Toolbar>
        </Paper>

        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
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
}
