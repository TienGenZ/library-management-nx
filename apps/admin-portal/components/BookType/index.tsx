/* eslint-disable react-hooks/exhaustive-deps */
import BookTypeForm from '@components/BookTypeForm';
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
  useDeleteBookTypeMutation,
  useGetAllBookTypeMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from './styles';

export interface BookType {
  id: number;
  name: string;
}

const BookCategory = () => {
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [bookTypes, setBookTypes] = useState<BookType[]>([]);
  const [bookTypeEdit, setBookTypeEdit] = useState<BookType>(null);
  const [showConfirm, setShowConfim] = useState(false);
  const [bookTypeId, setBookTypeId] = useState(null);
  const [getBooktype, getBookTypeResult] = useGetAllBookTypeMutation();
  const [removeBooktype, removeResult] = useDeleteBookTypeMutation();
  const dispatch = useDispatch();

  const handleShowPopupEdit = (bookType: BookType) => {
    setShowPopup(true);
    setBookTypeEdit(bookType);
  };

  const handleAcceptedConfirm = () => {
    if (bookTypeId) {
      removeBooktype(bookTypeId);
      setShowConfim(false);
    }
  };

  const onDelete = (id: number) => {
    setBookTypeId(id);
    setShowConfim(true);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  const handleShowPopup = () => {
    setBookTypeEdit(null);
    setShowPopup(true);
  };

  const closePopup = (closed: boolean) => {
    setShowPopup(closed);
    setBookTypeEdit(null);
  };

  useEffect(() => {
    if (getBookTypeResult.isSuccess) {
      setBookTypes(getBookTypeResult?.data);
    }
  }, [getBookTypeResult.isSuccess]);

  useEffect(() => {
    if (removeResult.isSuccess) {
      dispatch(setAlert({ message: 'X??a th??? lo???i s??ch th??nh c??ng' }));
      getBooktype(null);
    }
  }, [removeResult.isSuccess]);

  useEffect(() => {
    if (removeResult.isError) {
      dispatch(
        setAlert({
          severity: 'error',
          message: 'C?? l???i x???y ra vui l??ng th??? l???i',
        })
      );
    }
  }, [removeResult.isError]);

  useEffect(() => {
    getBooktype(null);
  }, []);

  return (
    <Box>
      <BookTypeForm
        isOpen={showPopup}
        bookTypeEdit={bookTypeEdit}
        onClose={closePopup}
        valueChange={() => getBooktype(null)}
      ></BookTypeForm>
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
          X??a th??? lo???i s??ch?
        </DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <DialogContentText
            sx={{ fontFamily: 'Montserrat', fontWeight: '500' }}
          >
            Sau khi x??a kh??ng th??? kh??i ph???c th??ng tin
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfim(false)}>H???y</Button>
          <Button sx={{ color: '#f44336' }} onClick={handleAcceptedConfirm}>
            X??a
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            margin: '10px 0',
          }}
        >
          <Button variant="contained" onClick={handleShowPopup}>
            <AddIcon />
            Th??m th??? lo???i s??ch
          </Button>
        </Box>
        <Box sx={{ maxHeight: 'calc(100vh - 260px)', overflow: 'auto' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Th??? lo???i s??ch</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookTypes.map((bookType) => (
                  <StyledTableRow key={bookType.id}>
                    <StyledTableCell>{bookType.id}</StyledTableCell>
                    <StyledTableCell>{bookType.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button onClick={() => handleShowPopupEdit(bookType)}>
                        <DriveFileRenameOutlineIcon />
                      </Button>
                      <Button onClick={() => onDelete(bookType.id)}>
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
          count={1}
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
