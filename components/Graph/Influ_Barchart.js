import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Typography, useMediaQuery } from '@mui/material';

const data = [
  {
    "followers": 1400000,
    "hashtags": "الحفلات الغناييه",
    "id": 1,
    "languages": ["ar","en"],
    "location": "المملكة العربية السعودية",
    "regions": [
      "Saudi Arabia",
      "Lebanon",
      "Qatar",
      "Iraq",
      "Oman",
      "Iran",
      "Bahrain"
    ],
    "username": "@TurkiasdShalhoub"
  },
  {
    "followers": 1400000,
    "hashtags": ["الحفلات الغناييه","الحفلات الغناييasdه"],
    "id": 2,
    "languages": "ar",
    "location": "المملكة العربية السعودية",
    "regions": ["Saudi Arabia"],
    "username": "@TurkiShalhoub"
  },
]

const Table_for_influ = () => {
  const isMobile = useMediaQuery('(max-width: 720px)');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'username',
        header: 'User Name',
        size: 200,
      },
      {
        accessorKey: 'followers',
        header: 'Followers',
        size: 200,
      },
      {
        accessorKey: 'location',
        header: 'Influencer Location',
        size: 200.
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnPinning: isMobile,
    initialState: {
      expanded: true,
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
        <Typography>HashTags Used: {Array.isArray(row.original.hashtags) ? row.original.hashtags.join(', ') : row.original.hashtags}</Typography>
        <Typography>Tweet Languages: {Array.isArray(row.original.languages) ? row.original.languages.join(', ') : row.original.languages}</Typography>
        <Typography>Tweet Regions: {Array.isArray(row.original.regions) ? row.original.regions.join(', ') : row.original.regions}</Typography>
      </Box>
    ),
    positionExpandColumn: 'last',
  });

  return <MaterialReactTable table={table} />;
};

export default Table_for_influ;

