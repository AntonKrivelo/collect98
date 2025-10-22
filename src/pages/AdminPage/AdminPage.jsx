import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Toolbar, Typography, Paper } from '@mui/material';
import SearchBar from '../../components/Utils/SearchBar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

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

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error('Errors is loading users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

  const handleBlock = () => {};

  const handleUnblock = () => {};

  const handleDeleteUsers = async () => {
    console.log(selectedRows);

    const token = localStorage.getItem('token');

    await axios.delete('http://localhost:4000/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids: selectedRows,
      },
    });
    setUsers((prevUsers) => prevUsers.filter((user) => !selectedRows.includes(user.id)));
    setSelectedRows([]);
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
            <Button
              variant="contained"
              onClick={() => {
                navigate('/dashboard');
              }}
              size="small"
            >
              Back
            </Button>
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
                onClick={handleDeleteUsers}
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
            loading={loading}
            onRowSelectionModelChange={(rows) => handleOnRowSelectionModelChange(rows)}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </div>
  );
}
