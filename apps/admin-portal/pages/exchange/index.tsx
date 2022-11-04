import API from '@api/index';
import ExchangeForm from '@components/ExchangeForm';
import SearchBar from '@components/SearchBox';
import { ToastProps } from '@components/ToastMessage';
import { Context } from '@context/state';
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
import { TransitionProps } from '@mui/material/transitions';
import React, { useContext, useEffect, useState } from 'react';
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
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Exchange = () => {
  const [context, setContext] = useContext(Context);
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<ReaderToBooks[]>([]);
  const [open, setOpen] = useState(false);
  const [idRemove, setIdRemove] = useState(null);
  const [returnBookId, setReturnBookId] = useState(null);
  const [valueEdit, setValueEdit] = useState<ReaderToBooks>(null);

  const handleClose = () => {
    setOpen(false);
    setIdRemove(null);
    setReturnBookId(null);
  };

  const handleConfirm = () => {
    if (returnBookId) {
      makeReturnedReaderToBooks(returnBookId);
    }
    if (idRemove) {
      deleteReaderToBooks(idRemove);
    }
    handleClose();
  };

  const showToast = (props: ToastProps) => {
    setContext({
      ...context,
      toast: {
        isShow: true,
        ...props,
      },
    });
  };

  const deleteReaderToBooks = (id: number) => {
    API.delete(`/checkout/${id}`)
      .then((response) => {
        showToast({
          message: 'Xóa thẻ độc giả thành công',
        });
        getAllReaderToBooks();
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Có lỗi xảy ra - vui lòng liên hệ quản trị viên',
        });
      });
  };

  const getAllReaderToBooks = () => {
    API.get('/checkout')
      .then((response) => {
        if (response?.data) {
          const allRecord = response.data.map((value) => {
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
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Có lỗi xảy ra - vui lòng liên hệ quản trị viên',
        });
      });
  };

  const makeReturnedReaderToBooks = (id: number) => {
    API.put(
      `/checkout/${id}`,
      { returned: true },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(() => {
        showToast({
          message: 'Nhận trả sách thành công',
        });
        getAllReaderToBooks();
      })
      .catch(() => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Có lỗi xảy ra - vui lòng liên hệ quản trị viên',
        });
      });
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  const onEdit = (value: ReaderToBooks) => {
    setValueEdit(value);
    setShowPopup(true);
  };

  const onDelete = (id: number) => {
    setOpen(true);
    setIdRemove(id);
  };

  const onReturn = (id: number) => {
    setOpen(true);
    setReturnBookId(id);
  };

  const onClose = (closed: boolean) => {
    setShowPopup(closed);
    setValueEdit(null);
  };

  const onShow = () => {
    setValueEdit(null);
    setShowPopup(true);
  };

  const handleValue = (value) => {
    getAllReaderToBooks();
  };

  useEffect(() => {
    getAllReaderToBooks();
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
          <ExchangeForm
            isOpen={showPopup}
            valueEdit={valueEdit}
            onClose={onClose}
            valueChange={handleValue}
          />
        </Box>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
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
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              sx={{ color: returnBookId ? '#357a38' : '#f44336' }}
              onClick={handleConfirm}
            >
              {returnBookId ? 'Xác nhận' : 'Xóa'}
            </Button>
          </DialogActions>
        </Dialog>
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
            <AddIcon sx={{ marginRight: '5px', width: '20px' }} />
            Lập phiếu mượn sách
          </Button>
        </Box>
        <Box>
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
                        <Button onClick={() => onReturn(value.id)}>
                          <DoneAllIcon sx={{ color: '#357a38' }} />
                        </Button>
                      )}

                      <Button
                        sx={{ color: '#2979f' }}
                        onClick={() => onEdit(value)}
                      >
                        <DriveFileRenameOutlineIcon />
                      </Button>
                      <Button onClick={() => onDelete(value.id)}>
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

export default Exchange;
