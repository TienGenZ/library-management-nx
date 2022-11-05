import CheckoutForm from '@components/CheckoutForm';
import SearchBar from '@components/SearchBox';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
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
import { TransitionProps } from '@mui/material/transitions';
import {
  useDeleteCheckoutMutation,
  useGetAllCheckoutMutation,
  useUpdateCheckoutMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<ReaderToBooks[]>([]);
  const [showConfirm, setShowConfim] = useState(false);
  const [idRemove, setIdRemove] = useState(null);
  const [returnBookId, setReturnBookId] = useState(null);
  const [getCheckout, getCheckoutResult] = useGetAllCheckoutMutation();
  const [returnBook, returnBookResult] = useUpdateCheckoutMutation();
  const [removeCheckout, removeCheckoutResult] = useDeleteCheckoutMutation();

  const closeConfirm = () => {
    setShowConfim(false);
    setIdRemove(null);
    setReturnBookId(null);
  };

  const handleAcceptedConfirm = () => {
    if (returnBookId) {
      returnBook({ id: returnBookId, body: { returned: true } });
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

  const showReturnBookConfirm = (id: number) => {
    setShowConfim(true);
    setReturnBookId(id);
  };

  const onClosePopup = (closed: boolean) => {
    setShowPopup(closed);
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
      console.log(getCheckoutResult?.data);
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
        };
      });
      setData(allRecord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCheckoutResult.isSuccess]);

  useEffect(() => {
    if (removeCheckoutResult.isSuccess) {
      getCheckout(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeCheckoutResult.isSuccess]);

  useEffect(() => {
    if (returnBookResult.isSuccess) {
      getCheckout(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnBookResult.isSuccess]);

  useEffect(() => {
    if (removeCheckoutResult.isError || returnBookResult.isError) {
      console.log('errrrr');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeCheckoutResult.isError, returnBookResult.isError]);

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
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            {returnBookId ? 'Nhận trả sách' : 'Xóa phiếu mượn sách?'}
          </DialogTitle>
          <DialogContent sx={{ minWidth: '400px' }}>
            <DialogContentText id="alert-dialog-slide-description">
              {returnBookId
                ? 'Xác nhận sách đã được trả'
                : 'Sau khi xóa không thể khôi phục thông tin'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeConfirm}>Hủy</Button>
            <Button
              sx={{ color: returnBookId ? '#357a38' : '#f44336' }}
              onClick={handleAcceptedConfirm}
            >
              {returnBookId ? 'Xác nhận' : 'Xóa'}
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
              <SearchBar onChange={(value) => console.log(value)} />
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
            <Box>
              <TableContainer
                sx={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}
                component={Paper}
              >
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
                        <StyledTableCell>{value.createdAt}</StyledTableCell>
                        <StyledTableCell>{value.bookName}</StyledTableCell>
                        <StyledTableCell>{value.bookType}</StyledTableCell>
                        <StyledTableCell>{value.author}</StyledTableCell>
                        <StyledTableCell>{value.expiredAt}</StyledTableCell>
                        <StyledTableCell>
                          {value.returned ? 'Đã trả' : 'Đang mượn'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {!value.returned && (
                            <Button
                              onClick={() => showReturnBookConfirm(value.id)}
                            >
                              <DoneAllIcon sx={{ color: '#357a38' }} />
                            </Button>
                          )}
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
    </Box>
  );
};

export default Checkout;