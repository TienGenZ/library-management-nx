import API from '@api/index';
import PublisherForm from '@components/publisherForm';
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
  TableRow,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';

export interface PublisherValue {
  id: number;
  name: string;
}

const Publisher = () => {
  const [page, setPage] = useState(1);
  const [context, setContext] = useContext(Context);
  const [showPopup, setShowPopup] = useState(false);
  const [publishers, setPublishers] = useState<PublisherValue[]>([]);
  const [publisherEdit, setPublisherEdit] = useState(null);

  const showToast = (props: ToastProps) => {
    setContext({
      ...context,
      toast: {
        isShow: true,
        ...props,
      },
    });
  };

  const onEdit = (publisher: PublisherValue) => {
    setShowPopup(true);
    setPublisherEdit(publisher);
  };

  const onDelete = (id: number) => {
    deletePublisher(id);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(`Current page: ${value}`);
  };

  const onShow = () => {
    setPublisherEdit(null);
    setShowPopup(true);
  };

  const onClose = (closed: boolean) => {
    setShowPopup(closed);
    setPublisherEdit(null);
  };

  const handleValue = (value) => {
    getPublishers();
  };

  const getPublishers = () => {
    API.get('/publisher')
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          message: 'ahuhuhu',
        });
      });
  };

  const deletePublisher = (id: number) => {
    API.delete(`/publisher/${id}`)
      .then(() => {
        showToast({
          message: 'Xóa nhà xuất bản thành công',
        });
        getPublishers();
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
    getPublishers();
  }, []);

  return (
    <Box>
      <PublisherForm
        isOpen={showPopup}
        publisherEdit={publisherEdit}
        onClose={onClose}
        valueChange={handleValue}
      ></PublisherForm>
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
            Thêm nhà xuất bản
          </Button>
        </Box>
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
