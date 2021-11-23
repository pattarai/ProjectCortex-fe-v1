/**
 *
 * RankingAdmin
 *
 */
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  { field: 'festx', headerName: 'FestX', width: 100, type: 'number' },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', festx: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', festx: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', festx: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', festx: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', festx: null },
  { id: 6, lastName: 'Melisandre', firstName: null, festx: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', festx: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', festx: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', festx: 65 },
];
const eventList = [
  { label: 'FestX', id: 1 },
  { label: 'Ideathon', id: 2 },
  { label: 'Crew Meet 30 Oct', id: 3 },
];

export function RankingAdmin(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <section className="vh-100">
        <div className="container mt-2">
          <div className="d-flex py-3 justify-content-center justify-content-md-end">
            <TextField
              sx={{ width: 250 }}
              id="input-with-sx"
              label="Other Factors"
              variant="outlined"
            />
            <IconButton aria-label="add" size="large">
              <AddIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="remove"
              onClick={handleClickOpen}
              size="large"
            >
              <RemoveIcon fontSize="inherit" />
            </IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Delete'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this rank factor?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleClose} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              //checkboxSelection
            />
            <div className="d-flex py-3 justify-content-center justify-content-md-end">
              <Button variant="contained" startIcon={<SaveIcon />}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
