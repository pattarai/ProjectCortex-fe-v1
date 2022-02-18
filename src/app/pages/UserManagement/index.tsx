/**
 *
 * UserManagement
 *
 */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, LinearProgress, Chip } from '@mui/material';
import {
  DataGrid,
  GridColumns,
  GridRowParams,
  GridActionsCellItem,
  GridOverlay,
  GridValueGetterParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  MdDelete,
  MdEdit,
  MdOutlineCheck,
  MdNotInterested,
  MdInfoOutline,
} from 'react-icons/md';
import { RiAddFill } from 'react-icons/ri';

import Popup from '../../components/Popup';
import Problem from '../../components/Problem';
import DeleteForm from '../../components/DeleteForm';
import MemberForm from './MemberForm';

import { useSelector, useDispatch } from 'react-redux';
import { useUserManagementSlice } from './slice';
import { selectUserManagement } from './slice/selectors';

interface Props {}

export function UserManagement(props: Props) {
  const { actions } = useUserManagementSlice();
  const { users, error } = useSelector(selectUserManagement);
  const dispatch = useDispatch();

  const [err, setErr] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState<typeof users | null>(null);
  const [updateUser, setUpdateUser] = useState<number | null>(null);
  const [deleteUser, setDeleteUser] = useState<number | null>(null);

  useEffect(() => {
    if (error) {
      setErr(true);
    } else {
      setUserData(users);
      userData && setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, error]);

  useEffect(() => {
    dispatch(actions.getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function customCellRender(params: GridRenderCellParams) {
    return (
      <>
        {params.value === 1 && (
          <Chip
            icon={<MdOutlineCheck />}
            variant="outlined"
            color="success"
            label="Active"
          />
        )}
        {params.value === 0 && (
          <Chip
            icon={<MdNotInterested />}
            variant="outlined"
            color="error"
            label="Inactive"
          />
        )}
        {params.value === 2 && (
          <Chip
            icon={<MdInfoOutline />}
            variant="outlined"
            color="warning"
            label="Break"
          />
        )}
      </>
    );
  }

  const columns: GridColumns = [
    {
      field: 'userId',
      headerName: 'S.No.',
      minWidth: 50,
      flex: 0.5,
      filterable: false,
    },
    {
      field: 'firstName',
      headerName: 'Name',
      minWidth: 100,
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 150,
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 100,
      flex: 0.5,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.roles.role;
      },
    },
    {
      field: 'project',
      headerName: 'Project',
      minWidth: 100,
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'committee',
      headerName: 'Committee',
      minWidth: 70,
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      renderCell: customCellRender,
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
            setUpdateUser(params.row.userId);
            setOpenPopup(true);
          }}
          label="Edit"
        />,
        <GridActionsCellItem
          disabled={loading}
          icon={<MdDelete style={{ fontSize: '23px' }} />}
          color="secondary"
          onClick={() => {
            setDeleteUser(params.row.userId);
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
            getRowId={r => r.userId}
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
            action={actions.deleteUser(deleteUser)}
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
