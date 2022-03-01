/**
 *
 * Event
 *
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, LinearProgress } from '@mui/material';
import {
  DataGrid,
  GridColumns,
  GridRowParams,
  GridActionsCellItem,
  GridOverlay,
} from '@mui/x-data-grid';
import { MdDelete, MdEdit } from 'react-icons/md';
import { RiAddFill } from 'react-icons/ri';

import Popup from '../../components/Popup';
import Problem from '../../components/Problem';
import DeleteForm from '../../components/DeleteForm';
import EventForm from './EventForm';

import { useSelector, useDispatch } from 'react-redux';
import { useEventsSlice } from './slice';
import { selectEvents } from './slice/selectors';

interface Props {}

export function EventPage(props: Props) {
  const { actions } = useEventsSlice();
  const { events, error } = useSelector(selectEvents);
  const dispatch = useDispatch();

  const [err, setErr] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [EventData, setEventData] = useState<typeof events | null>(null);
  const [updateEvent, setUpdateEvent] = useState<number | null>(null);
  const [deleteEvent, setDeleteEvent] = useState<number | null>(null);

  useEffect(() => {
    if (error) {
      setErr(true);
    } else {
      setEventData(events);
      EventData && setLoading(false);
    }
  }, [events, error]);

  useEffect(() => {
    dispatch(actions.getEvent());
  }, []);

  const columns: GridColumns = [
    {
      field: 'eventId',
      headerName: 'S.No.',
      minWidth: 50,
      flex: 0.5,
      filterable: false,
    },
    {
      field: 'eventName',
      headerName: 'Name',
      minWidth: 100,
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'eventDate',
      headerName: 'Date',
      minWidth: 150,
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'phase',
      headerName: 'Phase',
      minWidth: 100,
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<MdEdit style={{ fontSize: '23px' }} />}
          disabled={loading}
          color="primary"
          onClick={() => {
            setDeleteEvent(null);
            setUpdateEvent(params.row.eventId);
            setOpenPopup(true);
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          disabled={loading}
          icon={<MdDelete style={{ fontSize: '23px' }} />}
          color="secondary"
          onClick={() => {
            setDeleteEvent(params.row.eventId);
            setOpenPopup(true);
          }}
          label="Delete"
        />,
      ],
    },
  ];

  function AddEvent() {
    return (
      <div className="my-3 d-md-flex justify-content-end">
        <Button
          disabled={loading}
          aria-label="Add Event"
          color="primary"
          variant="outlined"
          onClick={() => {
            setUpdateEvent(null);
            setDeleteEvent(null);
            setOpenPopup(true);
          }}
        >
          <RiAddFill />
          Add Event
        </Button>
      </div>
    );
  }

  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  }

  return (
    <>
      <Problem isError={err} />
      <div className="vh-100 d-flex align-justify-center">
        <div style={{ height: 600, width: '95%' }}>
          <DataGrid
            rows={EventData ? EventData : []}
            columns={columns}
            getRowId={r => r.eventId}
            paginationMode="server"
            hideFooterSelectedRowCount
            loading={loading}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              Toolbar: AddEvent,
            }}
            sx={{
              boxShadow: 2,
              backgroundColor: 'white',
              padding: { xs: '10px', md: '15px' },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#dee2fc',
                borderRadius: '5px',
                fontSize: '16px',
              },
            }}
          />
        </div>
      </div>
      <Popup
        title={deleteEvent ? 'Are you sure wanna delete?' : 'Event Form'}
        openModal={openPopup}
        setOpenModal={setOpenPopup}
      >
        {deleteEvent ? (
          <DeleteForm
            setOpenModal={setOpenPopup}
            action={actions.deleteEvent(deleteEvent)}
            setLoading={setLoading}
          />
        ) : (
          <EventForm
            setOpenModal={setOpenPopup}
            updateEvent={updateEvent}
            setLoading={setLoading}
          />
        )}
      </Popup>
    </>
  );
}
