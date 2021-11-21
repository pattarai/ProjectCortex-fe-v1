/**
 *
 * UserManagement
 *
 */
import * as React from 'react';
import {
  Card,
  Table,
  Button,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Container,
  InputAdornment,
  TableContainer,
  TextField,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { RiAddFill } from 'react-icons/ri';

interface Props {}

const CustomTable = styled(Table)(({ theme }) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

export function UserManagement(props: Props) {
  function createData(
    name: string,
    email: string,
    role: string,
    project: string,
  ) {
    return { name, email, role, project };
  }

  const rows = [
    createData('Joshua', 'joshuafrankle7@gmail.com', 'VPE', 'Cortex'),
    createData('Jesin', 'jesinthan@gmail.com', 'Dir. Activities', 'Cortex'),
  ];

  return (
    <>
      <div
        className="vh-100 d-flex flex-column align-justify-center"
        style={{
          backgroundColor: '#f4f5fd',
        }}
      >
        <Card
          className="d-flex align-justify-center p-5"
          style={{ width: '90%' }}
        >
          <Container>
            <div className="d-md-flex justify-content-between align-items-center mb-4">
              <TextField
                label="Search Members"
                id="outlined-start-adornment"
                className="w-md-50 mb-3 mb-md-0"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch />
                    </InputAdornment>
                  ),
                }}
              />
              <div>
                <Button
                  variant="outlined"
                  className="w-100"
                  style={{ width: '100%' }}
                >
                  <RiAddFill />
                  <span className="d-none d-md-block">Add User</span>
                </Button>
              </div>
            </div>
            <TableContainer>
              <CustomTable
                sx={{ minWidth: 650 }}
                aria-label="User Management table"
              >
                <TableHead sx={{ bgcolor: '#d3d1ff' }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align="left">Project</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.project}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" aria-label="Edit">
                          <MdEdit />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          color="secondary"
                          className="mx-2"
                        >
                          <MdDelete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </CustomTable>
            </TableContainer>
          </Container>
        </Card>
      </div>
    </>
  );
}
