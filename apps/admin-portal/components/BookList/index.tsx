/* eslint-disable react-hooks/exhaustive-deps */
import API from '@api/index';
import BookForm from '@components/BookForm';
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
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';

export interface Book {
  id: number;
  name: string;
  author: string;
  createdAt: string;
  publishedAt: string;
  publisher: string;
  type: string;
}

const ListBook = () => {
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookEdit, setBookEdit] = useState<Book>(null);

  const onEdit = (book: Book) => {
    setBookEdit(book);
  };

  const onDelete = (id: number) => {
    deleteBook(id);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };
  const onShow = () => {
    setBookEdit(null);
    setShowPopup(true);
  };

  const onClose = (closed: boolean) => {
    setShowPopup(closed);
    setBookEdit(null);
  };

  const handleValue = (value) => {
    getAllBook();
  };

  const getAllBook = () => {
    API.get('/book')
      .then((response) => {
        console.log(response.data);
        const data = response.data?.map((book) => {
          return {
            id: book?.id,
            name: book?.name,
            author: book?.author,
            publishedAt: book?.publishedAt,
            createdAt: book?.createdAt,
            publisher: book?.publisher?.name,
            type: book?.type?.name,
          };
        });
        setBooks(data);
      })
      .catch((error) => {
        console.log('errr');
      });
  };

  const deleteBook = (id: number) => {
    API.delete(`/book/${id}`)
      .then(() => {
        getAllBook();
      })
      .catch((error) => {
        console.log('errr');
      });
  };

  useEffect(() => {
    getAllBook();
  }, []);

  return (
    <Box>
      <BookForm
        isOpen={showPopup}
        bookEdit={bookEdit}
        onClose={onClose}
        valueChange={handleValue}
      ></BookForm>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            margin: '10px 0',
          }}
        >
          <Button variant="contained" onClick={onShow}>
            <AddIcon />
            Thêm sách
          </Button>
        </Box>
        <Box sx={{ maxHeight: 'calc(100vh - 260px)', overflow: 'auto' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Tên sách</StyledTableCell>
                  <StyledTableCell>Tác giả</StyledTableCell>
                  <StyledTableCell>Ngày nhập</StyledTableCell>
                  <StyledTableCell>Năm xuất bản</StyledTableCell>
                  <StyledTableCell>Thể loại</StyledTableCell>
                  <StyledTableCell>Nhà xuất bản</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <StyledTableRow key={book.id}>
                    <StyledTableCell>{book.id}</StyledTableCell>
                    <StyledTableCell>{book.name}</StyledTableCell>
                    <StyledTableCell>{book.author}</StyledTableCell>
                    <StyledTableCell>{book.createdAt}</StyledTableCell>
                    <StyledTableCell>{book.publishedAt}</StyledTableCell>
                    <StyledTableCell>{book.type}</StyledTableCell>
                    <StyledTableCell>{book.publisher}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button onClick={() => onEdit(book)}>
                        <DriveFileRenameOutlineIcon />
                      </Button>
                      <Button onClick={() => onDelete(book.id)}>
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

export default ListBook;
