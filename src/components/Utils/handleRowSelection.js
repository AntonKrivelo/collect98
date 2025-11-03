const handleRowSelection = ({ rows, setSelectedRows, items }) => {
  const { type, ids } = rows;

  if (type === 'include') {
    setSelectedRows([...ids]);
  }

  if (type === 'exclude') {
    const selectedItems = items.filter(({ id }) => ![...ids].includes(id)).map(({ id }) => id);
    setSelectedRows(selectedItems);
  }
};

export default handleRowSelection;
