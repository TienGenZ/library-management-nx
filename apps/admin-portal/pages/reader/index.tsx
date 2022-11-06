/* eslint-disable react-hooks/exhaustive-deps */
import FormCard from '@components/ReaderForm';
import SearchBar from '@components/SearchBox';
import Transition from '@components/Transition';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { setAlert } from '@store/appSlice';
import {
  useDeleteReaderMutation,
  useGetAllReaderMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [showConfirm, setShowConfim] = useState(false);
  const [readerId, setReaderId] = useState(null);
  const [getReader, getResult] = useGetAllReaderMutation();
  const [removeReader, removeResult] = useDeleteReaderMutation();
  const dispatch = useDispatch();

  const handleAcceptedConfirm = () => {
    if (readerId) {
      removeReader(readerId);
      setShowConfim(false);
    }
  };

  const handleShowPopup = () => {
    setReaderEdit(null);
    setShowPopup(true);
  };

  const onEdit = (reader: Reader) => {
    setReaderEdit(reader);
    setShowPopup(true);
  };

  const onDelete = (id: number) => {
    setReaderId(id);
    setShowConfim(true);
  };

  const closePopup = (closed: boolean) => {
    setShowPopup(closed);
    setReaderEdit(null);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  useEffect(() => {
    if (getResult.isSuccess) {
      setReaderList(getResult.data);
    }
  }, [getResult.isSuccess]);

  useEffect(() => {
    if (removeResult.isSuccess) {
      dispatch(setAlert({ message: 'Xóa thẻ độc giả thành công' }));
      getReader(null);
    }
  }, [removeResult.isSuccess]);

  useEffect(() => {
    if (removeResult.isError) {
      dispatch(
        setAlert({
          severity: 'error',
          message: 'Có lỗi xảy ra vui lòng thử lại',
        })
      );
    }
  }, [removeResult.isError]);

  useEffect(() => {
    getReader(null);
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
          maxHeight: '100%',
          padding: '30px',
          boxShadow: 'rgb(58 53 65 / 10%) 0px 2px 10px 0px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box>
            <FormCard
              isOpen={showPopup}
              readerEdit={readerEdit}
              onClose={closePopup}
              valueChange={() => getReader(null)}
            />
            <Dialog
              open={showConfirm}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setShowConfim(false)}
            >
              <DialogTitle
                sx={{
                  fontFamily: 'Montserrat',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                Xóa sách?
              </DialogTitle>
              <DialogContent sx={{ minWidth: '400px' }}>
                <DialogContentText
                  sx={{ fontFamily: 'Montserrat', fontWeight: '500' }}
                >
                  Sau khi xóa không thể khôi phục thông tin
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowConfim(false)}>Hủy</Button>
                <Button
                  sx={{ color: '#f44336' }}
                  onClick={handleAcceptedConfirm}
                >
                  Xóa
                </Button>
              </DialogActions>
            </Dialog>
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
            <Button variant="contained" onClick={handleShowPopup}>
              <AddIcon />
              Lập thẻ độc giả
            </Button>
          </Box>

          <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
            <TableContainer component={Paper}>
              <Table>
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
