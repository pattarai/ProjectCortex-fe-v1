import * as React from 'react';
import {
  TextField,
  Autocomplete,
  InputLabel,
  MenuItem,
  ListSubheader,
  Select,
  Button,
  FormControl,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DatePicker from '@mui/lab/DatePicker';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRef } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Name', editable: true, width: 250 },
  {
    field: 'status',
    type: 'singleSelect',
    headerName: 'Status',
    editable: true,
    valueOptions: ['Present', 'Absent', 'Informed'],
    width: 250,
  },
];

const rows = [
  { id: 1, name: 'Snow', status: 'Present' },
  { id: 2, name: 'Lannister', status: 'Present' },
  { id: 3, name: 'Lannister', status: 'Absent' },
  { id: 4, name: 'Stark', status: 'Informed' },
  { id: 5, name: 'Targaryen', status: 'Absent' },
  { id: 6, name: 'Melisandre', status: 'Present' },
  { id: 7, name: 'Clifford', status: 'Present' },
  { id: 8, name: 'Frances', status: 'Informed' },
  { id: 9, name: 'Roxie', status: 'Present' },
];

const options = ['Crew', 'Learnzeit', 'External'];

export function EventPage(props: Props) {
  const conductedByDisplayRef = useRef<HTMLDivElement>(null);
  const conductedByRef = useRef<HTMLSelectElement>(null);
  const topicRef = useRef<HTMLInputElement | null>(null);
  const phaseRef = useRef<HTMLInputElement | null>(null);
  const nameDisplayRef = useRef<HTMLDivElement | null>(null);
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  // const [value, setValue] = useState<string | null>('');
  const [conductedByValue, setConductedByValue] = React.useState<string | null>(
    '',
  );
  const [datevalue, setDateValue] = React.useState<Date | null>(null);

  function handleSubmit() {
    const conductedBy = conductedByRef.current?.value;
    const name = nameFieldRef.current?.value;
    const topic = topicRef.current?.value;
    const date = dateRef.current?.value;
    console.log(conductedBy, name, topic, date, conductedByValue);
  }

  function handleDelete() {
    console.log('delete');
  }

  function handleChange(e: string | null) {
    console.log(e);
    if (e === 'External') {
      conductedByDisplayRef.current &&
        (conductedByDisplayRef.current.style.display = 'block');
    }
    if (e === 'Crew' || e === 'Learnzeit' || e === null) {
      conductedByDisplayRef.current &&
        (conductedByDisplayRef.current.style.display = 'none');
    }
  }

  const handleConductedByChange = (event: SelectChangeEvent) => {
    setConductedByValue(event.target.value);
    if (event.target.value === 'individual') {
      nameDisplayRef.current &&
        (nameDisplayRef.current.style.display = 'block');
    } else {
      nameDisplayRef.current && (nameDisplayRef.current.style.display = 'none');
    }
    console.log(event.target.value);
  };

  return (
    <>
      <section className="w-100">
        <div className="mt-2 d-md-flex justify-content-around">
          <div className="">
            <Autocomplete
              id="controllable-states-demo"
              options={options}
              sx={{ width: 200 }}
              renderInput={params => (
                <TextField {...params} label="Event Type" />
              )}
              onChange={(e, v) => {
                handleChange(v);
              }}
            />
          </div>

          <div
            className="my-md-0 mx-md-2 mx-0 my-2"
            style={{ display: 'none' }}
            ref={conductedByDisplayRef}
          >
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel htmlFor="grouped-select">Conducted By</InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                label="Grouping"
                inputRef={conductedByRef}
                onChange={handleConductedByChange}
              >
                <ListSubheader>Projects</ListSubheader>
                <MenuItem value="cortex">Cortex</MenuItem>
                <MenuItem value="helix">Helix</MenuItem>
                <MenuItem value="pager">Pager</MenuItem>
                <MenuItem value="website">Website</MenuItem>
                <MenuItem value="opencloud">Opencloud</MenuItem>
                <ListSubheader>Committee</ListSubheader>
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="bd">Business Dev</MenuItem>
                <MenuItem value="inm">Innovation and Media</MenuItem>
                <ListSubheader>Individual</ListSubheader>
                <MenuItem value="individual">
                  <em>Individual</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="my-md-0 my-2">
            <TextField
              id="outlined-basic"
              label="Topic"
              variant="outlined"
              inputRef={topicRef}
            />
          </div>

          <div className="my-md-0 my-2">
            <TextField
              id="outlined-basic"
              label="Phase"
              variant="outlined"
              inputRef={phaseRef}
            />
          </div>

          <div className="my-md-0 my-2 mx-md-2 mx-0">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={props => <TextField {...props} />}
                label="Date Time"
                value={datevalue}
                ampm={false}
                onChange={newValue => {
                  setDateValue(newValue);
                }}
                inputRef={dateRef}
              />
            </LocalizationProvider>
          </div>

          <div className="" style={{ display: 'none' }} ref={nameDisplayRef}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              inputRef={nameFieldRef}
            />
          </div>
        </div>
      </section>

      <section className="d-flex flex-column align-items-center justify-content-center mt-3">
        <div style={{ height: 400, width: '80%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
        <div className="row">
          <div className="col">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              style={{ backgroundColor: '#8E2DE2', height: 40, float: 'right' }}
              onClick={handleSubmit}
              className="mt-3"
            >
              ADD
            </Button>
          </div>
          <div className="col">
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              style={{
                backgroundColor: '#8E2DE2',
                height: 40,
                float: 'right',
                color: '#fff',
              }}
              onClick={handleDelete}
              className="mt-3"
            >
              DELETE
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
