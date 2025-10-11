// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Toolbar,
//   Button,
//   TextField,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Checkbox,
//   IconButton,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import { Add, Delete, FilterList, Sort } from '@mui/icons-material';
// import axios from 'axios';

// export default function Inventories() {
//   const [inventories, setInventories] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     axios.get(`/api/inventories?search=${search}`).then((res) => setInventories(res.data.items));
//   }, [search]);

//   const handleSelect = (id) => {
//     setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
//   };

//   const handleDelete = async () => {
//     await Promise.all(selected.map((id) => axios.delete(`/api/inventories/${id}`)));
//     setSelected([]);
//     setInventories(inventories.filter((inv) => !selected.includes(inv.id)));
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" mb={2}>
//         Inventories
//       </Typography>
//       <Toolbar disableGutters sx={{ gap: 2 }}>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <Button variant="contained" startIcon={<Add />}>
//           New Inventory
//         </Button>
//         {selected.length > 0 && (
//           <Button color="error" startIcon={<Delete />} onClick={handleDelete}>
//             Delete ({selected.length})
//           </Button>
//         )}
//         <IconButton>
//           <FilterList />
//         </IconButton>
//         <IconButton>
//           <Sort />
//         </IconButton>
//       </Toolbar>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell padding="checkbox">
//               <Checkbox />
//             </TableCell>
//             <TableCell>Title</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>Owner</TableCell>
//             <TableCell align="right">Items</TableCell>
//             <TableCell>Updated</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {inventories.map((inv) => (
//             <TableRow key={inv.id} hover>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   checked={selected.includes(inv.id)}
//                   onChange={() => handleSelect(inv.id)}
//                 />
//               </TableCell>
//               <TableCell>{inv.title}</TableCell>
//               <TableCell>{inv.category}</TableCell>
//               <TableCell>{inv.owner.name}</TableCell>
//               <TableCell align="right">{inv.itemCount}</TableCell>
//               <TableCell>{new Date(inv.updatedAt).toLocaleDateString()}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// }
