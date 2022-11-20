/* eslint-disable react-hooks/exhaustive-deps */
import { formatDate } from '@common/formatDate';
import CheckoutForm from '@components/CheckoutForm';
import SearchBar from '@components/SearchBox';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
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
  Slide,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { TransitionProps } from '@mui/material/transitions';
import { setAlert } from '@store/appSlice';
import {
  useDeleteCheckoutMutation,
  useGetAllCheckoutMutation,
  useUpdateCheckoutMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from './styles';

export interface ReaderToBooks {
  id: number;
  readerName: string;
  createdAt: string;
  bookName: string;
  bookType: string;
  author: string;
  expiredAt: string;
  returned: boolean;
  readerId: number;
  bookId: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Checkout = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<ReaderToBooks[]>([]);
  const [showConfirm, setShowConfim] = useState(false);
  const [idRemove, setIdRemove] = useState(null);
  const [bookReturn, setBookReturn] = useState(null);
  const [getCheckout, getCheckoutResult] = useGetAllCheckoutMutation();
  const [returnBook, returnBookResult] = useUpdateCheckoutMutation();
  const [removeCheckout, removeCheckoutResult] = useDeleteCheckoutMutation();
  const [checkoutEdit, setCheckoutEdit] = useState(null);

  const closeConfirm = () => {
    setShowConfim(false);
    setIdRemove(null);
    setBookReturn(null);
    setCheckoutEdit(null);
  };

  const handleShowPopupEdit = (checkout) => {
    setShowPopup(true);
    setCheckoutEdit(checkout);
  };

  const handleAcceptedConfirm = () => {
    if (bookReturn?.id) {
      returnBook({
        id: bookReturn.id,
        body: { returned: true, bookId: bookReturn.bookId },
      });
    }
    if (idRemove) {
      removeCheckout(idRemove);
    }
    closeConfirm();
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  const showRemoveConfirm = (id: number) => {
    setShowConfim(true);
    setIdRemove(id);
  };

  const showReturnBookConfirm = (value) => {
    setShowConfim(true);
    setBookReturn(value);
  };

  const onClosePopup = (closed: boolean) => {
    setShowPopup(closed);
    setCheckoutEdit(null);
  };

  const onShowPopup = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    getCheckout(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getCheckoutResult.isSuccess) {
      const allRecord = getCheckoutResult?.data.map((value) => {
        const {
          id,
          book: {
            author,
            name: bookName,
            type: { name: bookType },
          },
          reader: { name: readerName },
          createdAt,
          expiredAt,
          returned,
          readerId,
          bookId,
        } = value;

        return {
          id,
          author,
          bookName,
          bookType,
          readerName,
          createdAt,
          expiredAt,
          returned,
          readerId,
          bookId,
        };
      });
      setData(allRecord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCheckoutResult.isSuccess]);

  useEffect(() => {
    if (removeCheckoutResult.isSuccess) {
      dispatch(
        setAlert({
          message: 'Xóa phiếu mượn sách thành công',
        })
      );

      getCheckout(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeCheckoutResult.isSuccess]);

  useEffect(() => {
    if (returnBookResult.isSuccess) {
      dispatch(
        setAlert({
          message: 'Nhận trả sách thành công',
        })
      );
      getCheckout(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnBookResult.isSuccess]);

  useEffect(() => {
    if (
      removeCheckoutResult.isError ||
      returnBookResult.isError ||
      getCheckoutResult.isError
    ) {
      dispatch(
        setAlert({
          severity: 'error',
          title: 'Oops!',
          message: 'Có lỗi xảy ra vui lòng liên hệ quản trị viên',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    removeCheckoutResult.isError,
    returnBookResult.isError,
    getCheckoutResult.isError,
  ]);

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
          display: 'flex',
          background: '#fff',
          borderRadius: '10px',
          height: '100%',
          padding: '30px',
          boxShadow: 'rgb(58 53 65 / 10%) 0px 2px 10px 0px',
        }}
      >
        <Box>
          <CheckoutForm
            isOpen={showPopup}
            checkoutEdit={checkoutEdit}
            onClose={onClosePopup}
            created={(value) => {
              if (value) {
                getCheckout(null);
              }
            }}
          />
        </Box>
        <Dialog
          open={showConfirm}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeConfirm}
        >
          <DialogTitle
            sx={{
              fontFamily: 'Montserrat',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            {bookReturn?.id ? 'Nhận trả sách' : 'Xóa phiếu mượn sách?'}
          </DialogTitle>
          <DialogContent sx={{ minWidth: '400px' }}>
            <DialogContentText
              sx={{ fontFamily: 'Montserrat', fontWeight: '500' }}
            >
              {bookReturn?.id
                ? 'Xác nhận sách đã được trả'
                : 'Sau khi xóa không thể khôi phục thông tin'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirm}>Hủy</Button>
            <Button
              sx={{ color: bookReturn?.id ? '#357a38' : '#f44336' }}
              onClick={handleAcceptedConfirm}
            >
              {bookReturn?.id ? 'Xác nhận' : 'Xóa'}
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Box>
            <Box>
              <SearchBar placeHolder="Nhập tên độc giả hoặc mã phiếu để tìm kiếm..." />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
                margin: '10px 0',
              }}
            >
              <Button variant="contained" onClick={onShowPopup}>
                <AddIcon sx={{ marginRight: '5px', width: '20px' }} />
                Lập phiếu mượn sách
              </Button>
            </Box>
            <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ID</StyledTableCell>
                      <StyledTableCell>Tên độc giả</StyledTableCell>
                      <StyledTableCell>Ngày mượn</StyledTableCell>
                      <StyledTableCell>Sách</StyledTableCell>
                      <StyledTableCell>Thể loại</StyledTableCell>
                      <StyledTableCell>Tác giả</StyledTableCell>
                      <StyledTableCell>Hạn trả</StyledTableCell>
                      <StyledTableCell>Trạng thái</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((value) => (
                      <StyledTableRow key={value.id}>
                        <StyledTableCell>{value.id}</StyledTableCell>
                        <StyledTableCell>{value.readerName}</StyledTableCell>
                        <StyledTableCell>
                          {formatDate(value.createdAt)}
                        </StyledTableCell>
                        <StyledTableCell>{value.bookName}</StyledTableCell>
                        <StyledTableCell>{value.bookType}</StyledTableCell>
                        <StyledTableCell>{value.author}</StyledTableCell>
                        <StyledTableCell>
                          {formatDate(value.expiredAt)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {value.returned ? 'Đã trả' : 'Đang mượn'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {!value.returned && (
                            <Button
                              onClick={() => showReturnBookConfirm(value)}
                            >
                              <DoneAllIcon sx={{ color: '#357a38' }} />
                            </Button>
                          )}
                          <Button onClick={() => handleShowPopupEdit(value)}>
                            <DriveFileRenameOutlineIcon />
                          </Button>
                          <Button onClick={() => showRemoveConfirm(value.id)}>
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
          {getCheckoutResult.isLoading && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          )}
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
    </Box>
  );
};

export default Checkout;
