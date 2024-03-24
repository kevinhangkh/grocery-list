import { useState } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TablePagination,
  styled,
  tableCellClasses,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { groceryItems } from '../data/groceryList';
import CustomTableHead from './CustomTableHead';
import CustomTableBody from './CustomTableBody';

export type Order = 'asc' | 'desc';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: grey[400],
    fontWeight: 800,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  borderRight: `1px solid ${grey[200]}`,
}));

export default function GroceryTable() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={1}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <CustomTableHead
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
          <CustomTableBody
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <TablePagination
        count={groceryItems?.length}
        onPageChange={handlePageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: grey[400],
          '.MuiTablePagination-select': {
            color: 'black',
          },
        }}
      />
    </Paper>
  );
}
