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
  createData(1, 'Nhà xuất bản Kim Đồng'),
  createData(2, 'Nhà xuất bản Trẻ'),
  createData(3, 'Nhà xuất bản Giáo dục'),
  createData(4, 'Nhà xuất bản Thời đại'),
  createData(5, 'Nhà xuất bản Lao Động'),
  createData(6, 'Nhã Nam'),
];

const Publisher = () => {
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
                <StyledTableCell>Nhà xuất bản</StyledTableCell>
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

export default Publisher;
