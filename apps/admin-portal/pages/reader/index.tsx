import FormCard, { CardValue } from '@components/formCard';
import SearchBar from '@components/searchBar';
import {
  Box,
  Button,
  Paper,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  Table,
  Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';

function createData(
  id: number,
  fullName: string,
  dob: string,
  email: string,
  address: string,
  type: 'Học sinh' | 'Giáo viên',
  createdAt: string,
  expirationAt: string
) {
  return { id, fullName, dob, email, address, type, createdAt, expirationAt };
}

const rows = [
  createData(
    1,
    'Mai Thị Hằng Thư',
    '01-01-1990',
    'Thu.Mai@library.com',
    '7/11 Trần Mai Ninh - Phường 12 - Quận Tân Bình',
    'Học sinh',
    '01-01-1990',
    '01-01-2000'
  ),
  createData(
    2,
    'Mai Thị Hằng Thư',
    '01-01-1990',
    'Thu.Mai@library.com',
    '7/11 Trần Mai Ninh - Phường 12 - Quận Tân Bình',
    'Học sinh',
    '01-01-1990',
    '01-01-2000'
  ),
  createData(
    3,
    'Mai Thị Hằng Thư',
    '01-01-1990',
    'Thu.Mai@library.com',
    '7/11 Trần Mai Ninh - Phường 12 - Quận Tân Bình',
    'Học sinh',
    '01-01-1990',
    '01-01-2000'
  ),
  createData(
    4,
    'Mai Thị Hằng Thư',
    '01-01-1990',
    'Thu.Mai@library.com',
    '7/11 Trần Mai Ninh - Phường 12 - Quận Tân Bình',
    'Học sinh',
    '01-01-1990',
    '01-01-2000'
  ),
  createData(
    5,
    'Mai Thị Hằng Thư',
    '01-01-1990',
    'Thu.Mai@library.com',
    '7/11 Trần Mai Ninh - Phường 12 - Quận Tân Bình',
    'Học sinh',
    '01-01-1990',
    '01-01-2000'
  ),
  createData(
    6,
    'Mai Thị Hằng Thư',
    '01-01-1990',
    'Thu.Mai@library.com',
    '7/11 Trần Mai Ninh - Phường 12 - Quận Tân Bình',
    'Học sinh',
    '01-01-1990',
    '01-01-2000'
  ),
];

const Reader = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);

  const onShow = () => {
    setIsEdit(false);
    setShowPopup(true);
  };

  const onEdit = () => {
    setIsEdit(true);
    setShowPopup(true);
  };

  const onDelete = (id: number) => {
    console.log(id);
  };

  const onClose = (closed: boolean) => {
    setShowPopup(closed);
  };

  const handleValue = (value: CardValue) => {
    console.log(value);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        padding: '20px 20px 20px 0',
      }}
    >
      <Box
        sx={{
          background: '#fff',
          borderRadius: '10px',
          height: '100%',
          padding: '30px',
          boxShadow: 'rgb(58 53 65 / 10%) 0px 2px 10px 0px',
        }}
      >
        <Box>
          <FormCard
            isOpen={showPopup}
            isEdit={isEdit}
            onClose={onClose}
            valueChange={handleValue}
          />
        </Box>
        <Box>
          <SearchBar onChange={(value) => console.log(value)} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            margin: '10px 0',
          }}
        >
          <Button variant="contained" onClick={onShow}>
            <AddIcon />
            Lập thẻ độc giả
          </Button>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Họ và tên</StyledTableCell>
                  <StyledTableCell>Ngày sinh</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Địa chỉ</StyledTableCell>
                  <StyledTableCell>Loại độc giả</StyledTableCell>
                  <StyledTableCell>Ngày lập thẻ</StyledTableCell>
                  <StyledTableCell>Hạn thẻ</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{row.fullName}</StyledTableCell>
                    <StyledTableCell>{row.dob}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.address}</StyledTableCell>
                    <StyledTableCell>{row.type}</StyledTableCell>
                    <StyledTableCell>{row.createdAt}</StyledTableCell>
                    <StyledTableCell>{row.expirationAt}</StyledTableCell>
                    <StyledTableCell align='right'>
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
    </Box>
  );
};

export default Reader;
