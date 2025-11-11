import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Toolbar, Typography, Paper, CircularProgress } from '@mui/material';
import SearchBar from '../../components/Utils/SearchBar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import useConfirmDialog from '../../components/Utils/useConfirmDialog';
import axiosBase from '../../api/axiosBase';

export default function AdminPage() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 220 },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => {
        const color = params.row.role === 'admin' ? 'error' : 'success.main';
        const text = params.row.role === 'admin' ? 'Admin' : 'User';

        return <Typography color={color}>{text}</Typography>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const color =
          params.row.status === 'active'
            ? 'success.main'
            : params.row.status === 'blocked'
            ? 'error'
            : 'warning.main';

        return <Typography color={color}>{params.row.status}</Typography>;
      },
    },
    {
      field: 'action',
      headerName: '',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ minWidth: 60, textTransform: 'none' }}
          onClick={() => handleUserButtonClick(params.row)}
        >
          to page user
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const { user } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { openConfirm, ConfirmDialog } = useConfirmDialog();

  const handleUserButtonClick = (user) => {
    navigate(`/users/${user.id}`);
  };

  useEffect(() => {
    if (!user || user.role !== 'admin' || user.status === 'blocked') {
      navigate('/dashboard');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosBase.get('/users');
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

  const fetchEditUsers = async ({ ids, editField }) => {
    const usersUpdateData = ids.map((id) => ({ id, ...editField }));

    return await axiosBase.patch(`/users`, { users: usersUpdateData });
  };

  const handleBlock = async () => {
    try {
      await fetchEditUsers({ ids: selectedRows, editField: { status: 'blocked' } });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedRows.includes(user.id) ? { ...user, status: 'blocked' } : user,
        ),
      );
    } catch (e) {
      console.error(e);
    }
  };
  const handleUnblock = async () => {
    try {
      await fetchEditUsers({ ids: selectedRows, editField: { status: 'active' } });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedRows.includes(user.id) ? { ...user, status: 'active' } : user,
        ),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUsers = async () => {
    try {
      await axiosBase.delete('/users', {
        data: {
          ids: selectedRows,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => !selectedRows.includes(user.id)));
      setSelectedRows([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleProvideAdminAccess = async () => {
    try {
      await fetchEditUsers({ ids: selectedRows, editField: { role: 'admin' } });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedRows.includes(user.id) ? { ...user, role: 'admin' } : user,
        ),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveAdminAccess = async () => {
    try {
      await fetchEditUsers({ ids: selectedRows, editField: { role: 'user' } });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedRows.includes(user.id) ? { ...user, role: 'user' } : user,
        ),
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

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
              sx={{ fontSize: '12px' }}
              variant="contained"
              onClick={() => {
                navigate('/dashboard');
              }}
              size="small"
            >
              Back
            </Button>
            <Button
              sx={{ fontSize: '12px' }}
              variant="contained"
              onClick={() => {
                navigate('/categories');
              }}
              size="small"
            >
              Categories
            </Button>
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name or email..."
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                sx={{ fontSize: '12px' }}
                variant="contained"
                onClick={() =>
                  openConfirm({
                    title: 'Blocked users',
                    message: 'Are you sure you want to block the user?',
                    onConfirm: handleBlock,
                  })
                }
                disabled={selectedRows.length === 0}
                size="small"
              >
                Block
              </Button>
              <Button
                sx={{ fontSize: '12px' }}
                variant="contained"
                onClick={() =>
                  openConfirm({
                    title: 'Unblock users',
                    message: 'Are you sure you want to unblock the user?',
                    onConfirm: handleUnblock,
                  })
                }
                disabled={selectedRows.length === 0}
                size="small"
              >
                Unblock
              </Button>
              <Button
                sx={{ fontSize: '12px' }}
                variant="contained"
                onClick={() =>
                  openConfirm({
                    title: 'delete users',
                    message: 'Are you sure you want to delete the user?',
                    onConfirm: handleDeleteUsers,
                  })
                }
                disabled={selectedRows.length === 0}
                size="small"
              >
                Delete
              </Button>
              <Button
                sx={{ fontSize: '12px' }}
                variant="contained"
                onClick={() =>
                  openConfirm({
                    title: 'add admin rights',
                    message: 'Are you sure you want to grant administrator rights to the user?',
                    onConfirm: handleProvideAdminAccess,
                  })
                }
                disabled={selectedRows.length === 0}
                size="small"
              >
                Provide admin access
              </Button>
              <Button
                sx={{ fontSize: '12px' }}
                variant="contained"
                onClick={() =>
                  openConfirm({
                    title: 'delete admin rights',
                    message: 'Are you sure you want to change the administrator rights to a user?',
                    onConfirm: handleRemoveAdminAccess,
                  })
                }
                disabled={selectedRows.length === 0}
                size="small"
              >
                Remove admin access
              </Button>
              {ConfirmDialog}
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
