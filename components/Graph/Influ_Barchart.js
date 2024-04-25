import React, { useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Typography, TextField, useMediaQuery } from '@mui/material';

const CustomSearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      label="Custom Search"
      variant="outlined"
      size="medium"
      value={searchTerm}
      onChange={handleChange}
      sx={{ backgroundColor: 'white' }}
    />
  );
};

const Table_for_influ = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = searchTerm => {
    const filteredRows = data.filter(row => {
      // Check if any value in the main row matches the search term
      const mainRowMatches = Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Check if any value in the detail panel content matches the search term
      const detailPanelMatches =
        row.original &&
        Object.values(row.original).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Include row if either main row or detail panel content matches the search term
      return mainRowMatches || detailPanelMatches;
    });

    setFilteredData(filteredRows);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'username',
        header: 'User Name',
        size: 200,
      },
      {
        accessorKey: 'followers',
        header: 'Followers',
        size: 200,
        sortDescFirst: false,
      },
      {
        accessorKey: 'location',
        header: 'Influencer Location',
        size: 200,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    enableColumnPinning: isMobile,
    enableGlobalFilterModes: true,
    globalFilterModeOptions: ['fuzzy', 'startsWith'],
    initialState: {
      expanded: false,
      sorting: [{ id: 'followers', desc: true }],
    },
    state: {
      columnPinning: isMobile ? { right: ['mrt-row-expand'] } : {},
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
        }}
      >
        <Typography>
          HashTags Used:{' '}
          {Array.isArray(row.original.hashtags)
            ? row.original.hashtags.join(', ')
            : row.original.hashtags}
        </Typography>
        <Typography>
          Tweet Languages:{' '}
          {Array.isArray(row.original.languages)
            ? row.original.languages.join(', ')
            : row.original.languages}
        </Typography>
        <Typography>
          Tweet Regions:{' '}
          {Array.isArray(row.original.regions)
            ? row.original.regions.join(', ')
            : row.original.regions}
        </Typography>
      </Box>
    ),
    positionExpandColumn: 'last',
  });

  return (
    <div className='bg-white text-lg p-2'>
      <div className='pb-1'>Custom Search Box (May take a few seconds to filter)</div>
      <CustomSearchBox onSearch={handleSearch} />
      <div className='p-1 font-bold'>Top Influencers</div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Table_for_influ;
