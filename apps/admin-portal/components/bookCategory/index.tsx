import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';

function createData(id: number, name: string) {
  return { id, name };
}

const rows = [
  createData(1, 'Dế mèn phưu lưu kí'),
  createData(2, 'Dế mèn phưu lưu kí'),
  createData(3, 'Dế mèn phưu lưu kí'),
  createData(4, 'Dế mèn phưu lưu kí'),
  createData(5, 'Dế mèn phưu lưu kí'),
  createData(6, 'Dế mèn phưu lưu kí'),
];

const BookCategory = () => {
  const [page, setPage] = useState(1);

  const onEdit = () => {
    console.log('ahuhuhuhu');
  };

  const onDelete = (id: number) => {
    console.log(id);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  return (
    <Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Thể loại sách</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={onEdit}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => onDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Pagination
          count={10}
          page={page}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default BookCategory;
