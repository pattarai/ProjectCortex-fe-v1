/**
 *
 * RankingAdmin
 *
 */
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
import {
  Avatar,
  Button,
  CardActionArea,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';

interface Props {}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100, type: 'number' },
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
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const eventList = [
  { label: 'FestX', id: 1 },
  { label: 'Ideathon', id: 2 },
  { label: 'Crew Meet 30 Oct', id: 3 },
];
export function RankingAdmin(props: Props) {
  return (
    <>
      <section className="vh-100">
        <div className="container mt-2">
          <div className="d-md-flex py-4 justify-content-md-end">
            <div className="mb-3 mb-md-0">
              {' '}
              <Autocomplete
                disablePortal
                id="clear-on-escape"
                sx={{ width: 250, marginRight: 4 }}
                clearOnEscape
                options={eventList}
                renderInput={params => (
                  <TextField {...params} label="Select Phase" />
                )}
              />
            </div>
            <TextField
              sx={{ width: 250 }}
              id="input-with-sx"
              label="Other Factors"
              variant="outlined"
            />{' '}
            <IconButton aria-label="add" size="large">
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              //checkboxSelection
            />
          </div>
        </div>
      </section>
    </>
  );
}
