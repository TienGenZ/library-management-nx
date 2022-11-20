/* eslint-disable react-hooks/exhaustive-deps */
import BookForm from '@components/BookForm';
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
  useDeleteBookMutation,
  useGetAllBookMutation,
  useGetQueryBookMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from './styles';
import { Dayjs } from 'dayjs';

export interface Book {
  id: number;
  name: string;
  author: string;
  createdAt: string;
  publishedAt: string;
  publisherId: number;
  publisher: string;
  bookTypeId: number;
  type: string;
  borrowed: boolean;
  receivingDate: Dayjs;
}

const ListBook = () => {
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [bookEdit, setBookEdit] = useState<Book>(null);
  const [showConfirm, setShowConfim] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [getBook, getResult] = useGetAllBookMutation();
  const [removeBook, removeResult] = useDeleteBookMutation();
  const [getQueryBook, getQueryBookResult] = useGetQueryBookMutation();
  const dispatch = useDispatch();

  const handleAcceptedConfirm = () => {
    if (bookId) {
      removeBook(bookId);
      setShowConfim(false);
    }
  };

  const onEdit = (book: Book) => {
    setShowPopup(true);
    setBookEdit(book);
  };

  const onDelete = (id: number) => {
    setBookId(id);
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
    setBookEdit(null);
    setShowPopup(true);
  };

  const closePopup = (closed: boolean) => {
    setShowPopup(closed);
    setBookEdit(null);
  };

  const mapBooks = (books: any[]) => {
    return books.map((book) => {
      return {
        id: book?.id,
        name: book?.name,
        author: book?.author,
        publishedAt: book?.publishedAt,
        createdAt: book?.createdAt,
        publisher: book?.publisher?.name,
        publisherId: book?.publisher?.id,
        bookTypeId: book?.type?.id,
        type: book?.type?.name,
        borrowed: book?.borrowed,
        receivingDate: book?.receivingDate,
      };
    });
  };

  const searchBook = async (query: string) => {
    if (query) {
      getQueryBook(query);
      if (getQueryBookResult.isSuccess) {
        const data = mapBooks(getQueryBookResult.data);
        setBooks(data);
      }

      if (getQueryBookResult.isError) {
        dispatch(
          setAlert({
            severity: 'error',
            title: 'Oops!',
            message: 'Có lỗi xảy ra vui lòng liên hệ quản trị viên',
          })
        );
      }
    } else {
      getBook(null);
    }
  };

  const handleOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const query = event.target.value.trim();
      searchBook(query);
    }
  };

  const handleOnChange = (event) => {
    const query = event.target.value.trim();
    setSearchValue(query);
  };

  const handleOnClickIconSearch = () => {
    searchBook(searchValue);
  };

  useEffect(() => {
    if (getResult.isSuccess) {
      const data = mapBooks(getResult.data);
      setBooks(data);
    }
  }, [getResult.isSuccess]);

  useEffect(() => {
    if (removeResult.isSuccess) {
      dispatch(setAlert({ message: 'Xóa sách thành công' }));
      getBook(null);
    }
  }, [removeResult.isSuccess]);

  useEffect(() => {
    if (removeResult.isError) {
      const error: any = removeResult.error;
      if (error.status == 403) {
        console.log(error);
        dispatch(
          setAlert({
            severity: 'error',
            message: 'Sách đang được mượn, vui lòng kiểm tra lại. ',
          })
        );
        return;
      }
      dispatch(
        setAlert({
          severity: 'error',
          message: 'Có lỗi xảy ra vui lòng thử lại',
        })
      );
    }
  }, [removeResult.isError]);

  useEffect(() => {
    getBook(null);
  }, []);

  return (
    <Box>
      <BookForm
        isOpen={showPopup}
        bookEdit={bookEdit}
        onClose={closePopup}
        valueChange={() => getBook(null)}
      ></BookForm>
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
          <Button sx={{ color: '#f44336' }} onClick={handleAcceptedConfirm}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <SearchBar
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChange}
            onClickIcon={handleOnClickIconSearch}
            placeHolder={'Nhập tên hoặc thể loại để tìm kiếm sách...'}
          />
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
            Thêm sách
          </Button>
        </Box>
        <Box sx={{ maxHeight: 'calc(100vh - 340px)', overflow: 'auto' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Tên sách</StyledTableCell>
                  <StyledTableCell>Tác giả</StyledTableCell>
                  <StyledTableCell>Thể loại</StyledTableCell>
                  <StyledTableCell>Trạng thái</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <StyledTableRow key={book.id}>
                    <StyledTableCell>{book.id}</StyledTableCell>
                    <StyledTableCell>{book.name}</StyledTableCell>
                    <StyledTableCell>{book.author}</StyledTableCell>
                    <StyledTableCell>{book.type}</StyledTableCell>
                    <StyledTableCell>
                      {book.borrowed ? 'Đang cho mượn' : 'Còn trên kệ'}
                    </StyledTableCell>
                    {book.borrowed ? (
                      <StyledTableCell align="right">
                        <Button onClick={() => onEdit(book)} disabled>
                          <DriveFileRenameOutlineIcon />
                        </Button>
                        <Button onClick={() => onDelete(book.id)} disabled>
                          <DeleteOutlineIcon />
                        </Button>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="right">
                        <Button onClick={() => onEdit(book)}>
                          <DriveFileRenameOutlineIcon />
                        </Button>
                        <Button onClick={() => onDelete(book.id)}>
                          <DeleteOutlineIcon sx={{ color: '#f44336' }} />
                        </Button>
                      </StyledTableCell>
                    )}
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
            count={1}
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

export default ListBook;
