import { useMemo } from 'react';
import { TableBody, TableRow } from '@mui/material';

import { Order, StyledTableCell } from './GroceryTable';
import { Item, getUpdatedList } from '../data/groceryList';

interface Props {
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
}

export default function CustomTableBody(props: Props) {
  const { order, orderBy, page, rowsPerPage } = props;

  const groceryList = getUpdatedList();

  function stableSort<T>(array: Item[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const visibleRows = useMemo(
    () =>
      stableSort(groceryList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <TableBody>
      {visibleRows?.map((row) => (
        <TableRow key={row.id}>
          <StyledTableCell align="right">{row.name}</StyledTableCell>
          <StyledTableCell align="right">{row.section}</StyledTableCell>
          <StyledTableCell align="right">{row.price}</StyledTableCell>
          <StyledTableCell align="right">
            {row.pricePerHundredGrams}
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
