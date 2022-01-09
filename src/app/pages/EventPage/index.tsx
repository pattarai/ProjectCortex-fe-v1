/**
 *
 * UserManagement
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
import MemberForm from './EventForm';

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

  const [userData, setUserData] = useState<typeof events | null>(null);
  const [updateUser, setUpdateUser] = useState<number | null>(null);
  const [deleteUser, setDeleteUser] = useState<number | null>(null);

  useEffect(() => {
    if (error) {
      setErr(true);
    } else {
      setUserData(events);
      userData && setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, error]);

  useEffect(() => {
    dispatch(actions.getEvent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColumns = [
    {
      field: 'event_id',
      headerName: 'S.No.',
      minWidth: 50,
      flex: 0.5,
      filterable: false,
    },
    {
      field: 'event_name',
      headerName: 'Name',
      minWidth: 100,
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'event_date',
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
            setDeleteUser(null);
            setUpdateUser(params.row.event_id);
            setOpenPopup(true);
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          disabled={loading}
          icon={<MdDelete style={{ fontSize: '23px' }} />}
          color="secondary"
          onClick={() => {
            setDeleteUser(params.row.event_id);
            setOpenPopup(true);
          }}
          label="Delete"
        />,
      ],
    },
  ];

  function AddUser() {
    return (
      <div className="my-3 d-md-flex justify-content-end">
        <Button
          disabled={loading}
          aria-label="Add User"
          color="primary"
          variant="outlined"
          onClick={() => {
            setUpdateUser(null);
            setDeleteUser(null);
            setOpenPopup(true);
          }}
        >
          <RiAddFill />
          Add User
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
            rows={userData ? userData : []}
            columns={columns}
            getRowId={r => r.event_id}
            paginationMode="server"
            hideFooterSelectedRowCount
            loading={loading}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              Toolbar: AddUser,
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
        title={deleteUser ? 'Are you sure wanna delete?' : 'Member Form'}
        openModal={openPopup}
        setOpenModal={setOpenPopup}
      >
        {deleteUser ? (
          <DeleteForm
            setOpenModal={setOpenPopup}
            action={actions.deleteEvent(deleteUser)}
            setLoading={setLoading}
          />
        ) : (
          <MemberForm
            setOpenModal={setOpenPopup}
            updateUser={updateUser}
            setLoading={setLoading}
          />
        )}
      </Popup>
    </>
  );
}
