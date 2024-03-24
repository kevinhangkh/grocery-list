import { SetStateAction } from 'react';
import {
  Box,
  TableHead,
  TableRow,
  TableSortLabel,
  styled,
  tableCellClasses,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { headCells } from '../data/groceryList';
import { Order, StyledTableCell } from './GroceryTable';

const StyledSortLabel = styled(TableSortLabel)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: grey[400],
    fontWeight: 800,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  borderRight: `1px solid ${grey[200]}`,
}));

interface Props {
  order: Order;
  setOrder: React.Dispatch<SetStateAction<Order>>;
  orderBy: string;
  setOrderBy: React.Dispatch<SetStateAction<string>>;
}

export default function CustomTableHead(props: Props) {
  const { order, setOrder, orderBy, setOrderBy } = props;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id}>
            <StyledSortLabel
              key={headCell.id}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ width: '100%', border: 'none' }}
            >
              {orderBy === headCell.id ? (
                <Box component="span" display="none">
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
              {headCell.label}
            </StyledSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
