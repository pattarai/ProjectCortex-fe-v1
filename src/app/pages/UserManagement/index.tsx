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
  Typography,
  TableContainer,
  Paper,
  IconButton,
} from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import { RiAddFill } from 'react-icons/ri';

interface Props {}

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
    createData('Joshua', 'joshuafrankle7@gmail.com', 'VPE', 'Cortex'),
    createData('Joshua', 'joshuafrankle7@gmail.com', 'VPE', 'Cortex'),
    createData('Joshua', 'joshuafrankle7@gmail.com', 'VPE', 'Cortex'),
  ];
  return (
    <>
      <div className="vh-100 d-flex align-justify-center">
        <Container>
          <div className="d-flex justify-content-between mb-3">
            <Typography variant="h4" gutterBottom>
              User
            </Typography>
            <div className="">
              <Button variant="outlined">
                <RiAddFill />
                Add User
              </Button>
            </div>
          </div>
          <Card>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Role</TableCell>
                    <TableCell align="left">Project</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell align="left">{row.project}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="Edit">
                          <MdEdit />
                        </IconButton>
                        <IconButton aria-label="Delete" className="mx-2">
                          <MdDelete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Container>
      </div>
    </>
  );
}
