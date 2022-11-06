/* eslint-disable react-hooks/exhaustive-deps */
import PublisherForm from '@components/PublisherForm';
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
  useDeletePublisherMutation,
  useGetAllPublisherMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow } from './styles';

export interface PublisherValue {
  id: number;
  name: string;
}

const Publisher = () => {
  const [page, setPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [publishers, setPublishers] = useState<PublisherValue[]>([]);
  const [publisherEdit, setPublisherEdit] = useState(null);
  const [showConfirm, setShowConfim] = useState(false);
  const [publisherId, setPublisherId] = useState(null);
  const [getPublisher, getPublisherResult] = useGetAllPublisherMutation();
  const [removePublisher, removePublisherResult] = useDeletePublisherMutation();
  const dispatch = useDispatch();

  const handleAcceptedConfirm = () => {
    if (publisherId) {
      removePublisher(publisherId);
      setShowConfim(false);
    }
  };

  const onEdit = (publisher: PublisherValue) => {
    setShowPopup(true);
    setPublisherEdit(publisher);
  };

  const onDelete = (id: number) => {
    setPublisherId(id);
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
    setPublisherEdit(null);
    setShowPopup(true);
  };

  const closePopup = (closed: boolean) => {
    setShowPopup(closed);
    setPublisherEdit(null);
  };

  useEffect(() => {
    if (getPublisherResult.isSuccess) {
      setPublishers(getPublisherResult?.data);
    }
  }, [getPublisherResult.isSuccess]);

  useEffect(() => {
    if (removePublisherResult.isSuccess) {
      dispatch(setAlert({ message: 'Xóa thể loại sách thành công' }));
      getPublisher(null);
    }
  }, [removePublisherResult.isSuccess]);

  useEffect(() => {
    if (removePublisherResult.isError) {
      dispatch(
        setAlert({
          severity: 'error',
          message: 'Có lỗi xảy ra vui lòng thử lại',
        })
      );
    }
  }, [removePublisherResult.isError]);

  useEffect(() => {
    getPublisher(null);
  }, []);

  return (
    <Box>
      <PublisherForm
        isOpen={showPopup}
        publisherEdit={publisherEdit}
        onClose={closePopup}
        valueChange={() => getPublisher(null)}
      ></PublisherForm>
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
          Xóa nhà xuất bản?
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
            Thêm nhà xuất bản
          </Button>
        </Box>
        <Box sx={{ maxHeight: 'calc(100vh - 260px)', overflow: 'auto' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Nhà xuất bản</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {publishers.map((publisher) => (
                  <StyledTableRow key={publisher.id}>
                    <StyledTableCell>{publisher.id}</StyledTableCell>
                    <StyledTableCell>{publisher.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button onClick={() => onEdit(publisher)}>
                        <DriveFileRenameOutlineIcon />
                      </Button>
                      <Button onClick={() => onDelete(publisher.id)}>
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
  );
};

export default Publisher;
