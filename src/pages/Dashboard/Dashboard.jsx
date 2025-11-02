import { Box, Paper, Typography, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardTable from './DashboardTable';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [inventories, setInventories] = useState([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const currentInventories = inventories.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
      <Typography variant="h5" sx={{ mb: 4, mt: 4, fontWeight: 'bold', textAlign: 'center' }}>
        Dashboard
      </Typography>

      <Box sx={{ maxWidth: 1100, margin: '20px auto' }}>
        {inventories.length === 0 ? (
          <Typography>No inventories found.</Typography>
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
