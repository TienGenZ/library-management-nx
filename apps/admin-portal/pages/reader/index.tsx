import API from '@api/index';
import FormCard, { CardValue } from '@components/formCard';
import SearchBar from '@components/searchBar';
import { ToastProps } from '@components/toast';
import { Context } from '@context/state';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';
export interface Reader {
  id: number;
  name: string;
  dob: string;
  email: string;
  address: string;
  type: 'STUDENT' | 'TEACHER';
  createdAt: string;
  expiredAt: string;
}

const Reader = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [readerEdit, setReaderEdit] = useState<Reader>(null);
  const [page, setPage] = useState(1);
  const [readerList, setReaderList] = useState<Reader[]>([]);
  const [context, setContext] = useContext(Context);

  const showToast = (props: ToastProps) => {
    setContext({
      ...context,
      toast: {
        isShow: true,
        ...props,
      },
    });
  };

  const deleteReader = (id: number) => {
    API.delete(`/reader/${id}`)
      .then((response) => {
        showToast({
          message: 'Xóa thẻ độc giả thành công',
        });
        getReader();
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          message: 'ahuhuhu',
        });
      });
  };

  const onShow = () => {
    setReaderEdit(null);
    setShowPopup(true);
  };

  const onEdit = (reader: Reader) => {
    setReaderEdit(reader);
    setShowPopup(true);
  };

  const onDelete = (id: number) => {
    deleteReader(id);
  };

  const onClose = (closed: boolean) => {
    setShowPopup(closed);
    setReaderEdit(null);
  };

  const handleValue = (value: CardValue) => {
    getReader();
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  const getReader = () => {
    API.get('/reader')
      .then((response) => {
        setReaderList(response.data);
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          message: 'ahuhuhu',
        });
      });
  };

  useEffect(() => {
    getReader();
  }, []);

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
            readerEdit={readerEdit}
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
                {readerList.map((reader) => (
                  <StyledTableRow key={reader.id}>
                    <StyledTableCell>{reader.id}</StyledTableCell>
                    <StyledTableCell>{reader.name}</StyledTableCell>
                    <StyledTableCell>{reader.dob}</StyledTableCell>
                    <StyledTableCell>{reader.email}</StyledTableCell>
                    <StyledTableCell>{reader.address}</StyledTableCell>
                    <StyledTableCell>
                      {reader.type === 'TEACHER' ? 'Giáo viên' : 'Học sinh'}
                    </StyledTableCell>
                    <StyledTableCell>{reader.createdAt}</StyledTableCell>
                    <StyledTableCell>{reader.expiredAt}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button onClick={() => onEdit(reader)}>
                        <DriveFileRenameOutlineIcon />
                      </Button>
                      <Button onClick={() => onDelete(reader.id)}>
                        <DeleteOutlineIcon sx={{ color: '#f44336' }} />
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
