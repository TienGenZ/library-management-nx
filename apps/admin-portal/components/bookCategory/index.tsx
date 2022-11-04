import API from '@api/index';
import { ToastProps } from '@components/toast';
import { Context } from '@context/state';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BookTypeForm from '@components/bookTypeForm';
import AddIcon from '@mui/icons-material/Add';
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
import React, { useContext, useEffect, useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';

export interface BookType {
  id: number;
  name: string;
}

const BookCategory = () => {
  const [page, setPage] = useState(1);
  const [context, setContext] = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [bookTypes, setBookTypes] = useState<BookType[]>([]);
  const [bookTypeEdit, setBookTypeEdit] = useState<BookType>(null);

  const showToast = (props: ToastProps) => {
    setContext({
      ...context,
      toast: {
        isShow: true,
        ...props,
      },
    });
  };

  const onEdit = (bookType: BookType) => {
    setShowPopup(true);
    setBookTypeEdit(bookType);
  };

  const onDelete = (id: number) => {
    deleteBookType(id);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  const onShow = () => {
    setBookTypeEdit(null);
    setShowPopup(true);
  };

  const onClose = (closed: boolean) => {
    setShowPopup(closed);
    setBookTypeEdit(null);
  };

  const handleValue = (value) => {
    getAllBookType();
  };

  const getAllBookType = () => {
    API.get('/book-type')
      .then((response) => {
        setBookTypes(response.data);
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          message: 'ahuhuhu',
        });
      });
  };

  const deleteBookType = (id: number) => {
    API.delete(`/book-type/${id}`)
      .then(() => {
        showToast({
          message: 'Xóa thể loại sách thành công',
        });
        getAllBookType();
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Có lỗi xảy ra - vui lòng liên hệ quản trị viên',
        });
      });
  };

  useEffect(() => {
    getAllBookType();
  }, []);

  return (
    <Box>
      <BookTypeForm
        isOpen={showPopup}
        bookTypeEdit={bookTypeEdit}
        onClose={onClose}
        valueChange={handleValue}
      ></BookTypeForm>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            margin: '10px 0',
          }}
        >
          <Button variant="contained" onClick={onShow}>
            <AddIcon />
            Thêm thể loại sách
          </Button>
        </Box>
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
              {bookTypes.map((bookType) => (
                <StyledTableRow key={bookType.id}>
                  <StyledTableCell>{bookType.id}</StyledTableCell>
                  <StyledTableCell>{bookType.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => onEdit(bookType)}>
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
