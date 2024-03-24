import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import GroceryTable from './components/GroceryTable';
import { grey } from '@mui/material/colors';

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      paddingX={20}
      gap={2}
    >
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">Today's groceries</Typography>
        <Button
          component="label"
          variant="outlined"
          startIcon={<ManageSearchIcon />}
          sx={{
            color: grey[800],
            textTransform: 'none',
            borderColor: grey[200],
            '.MuiButton-startIcon': {
              color: grey[400],
            },
            ':hover': {
              borderColor: grey[400],
            },
          }}
        >
          Filter by section
        </Button>
      </Box>
      <GroceryTable />
    </Box>
  );
}

export default App;
