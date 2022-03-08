import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  InputAdornment,
  TableContainer,
  TextField,
  IconButton,
  LinearProgress,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  ButtonBase,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { RiAddFill } from 'react-icons/ri';

import Popup from '../../components/Popup';
import DeleteForm from '../../components/DeleteForm';
import FactorForm from './FactorForm';

import { useSelector, useDispatch } from 'react-redux';
import { useRankingAdminSlice } from './slice';
import { selectRankingAdmin } from './slice/selectors';
import { RankingAdminState, Factor, Ranking } from './slice/types';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#ffeee6',
  },
}));

interface Props {}

export function RankingAdmin(props: Props) {
  const { actions } = useRankingAdminSlice();
  const rankingAdminData = useSelector(selectRankingAdmin);
  const dispatch = useDispatch();

  // <--------- Flags ---------->
  /** FactorAction
   * 0 - Add Factor
   * 1 - update Factor
   * 2 - delete Factor
   */
  const [factorAction, setFactorAction] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  // <--------- Flags ---------->

  const [phaseList, setPhaseList] = useState<number[]>([]);
  const [factorsList, setFactorsList] = useState<Factor[]>([]);
  const [rankingData, setRankingData] = useState<
    typeof rankingAdminData | null
  >(null);
  const [phase, setPhase] = useState<number | null>(2);
  const [selectedFactor, setSelectedFactor] = useState<Factor | null>(null);
  const [textFieldValue, setTextFieldValue] = useState<string>('');

  useEffect(() => {
    dispatch(actions.getFactors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRankingData(rankingAdminData);
    setRankingData(rankingAdminData);
    console.log(rankingData);

    setFactorsList(
      rankingAdminData !== null
        ? rankingAdminData.factors.filter(factor => factor.phase == phase)
        : [],
    );

    const tempList: number[] = [];
    rankingAdminData?.factors.forEach(factor => {
      if (!tempList.includes(factor.phase)) tempList.push(factor.phase);
    });
    tempList.sort();
    setPhaseList(tempList);

    rankingData && setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rankingAdminData]);

  function handleFactorChange(_, value: string) {
    setTextFieldValue(value);
    const val = (value: string): Factor | null => {
      var _fl: Factor[] = [];
      factorsList.forEach(f => {
        if (f.factorName === value) _fl.push(f);
      });
      if (_fl.length > 0) return _fl[0];
      return null;
    };
    setSelectedFactor(val(value));
  }
  function handlePhaseChange(e) {
    const phaseNum: number = e.target.value;
    setPhase(phaseNum);
    setFactorsList(
      rankingData != null
        ? rankingData.factors.filter(factor => factor.phase == phaseNum)
        : [],
    );
    // Reset the factor field
    setTextFieldValue('');
    setSelectedFactor(null);
  }

  function addFactor(_containInput: boolean) {
    setFactorAction(0);
    !_containInput && setTextFieldValue('');
    setOpenPopup(true);
  }

  function editFactor() {
    setFactorAction(1);
    setOpenPopup(true);
  }

  function deleteFactor() {
    setFactorAction(2);
    setOpenPopup(true);
  }

  const deleteFactorAction = () => {
    if (selectedFactor !== null) {
      dispatch(actions.deleteFactor({ factorId: selectedFactor.factorId }));
      setTextFieldValue('');
      setSelectedFactor(null);
    }
  };

  return (
    <>
      <div className="vh-100 d-flex flex-column align-justify-center">
        {loading ? (
          <div style={{ width: '100%' }}>
            <LinearProgress />
          </div>
        ) : (
          <Card
            className="d-flex flex-column align-justify-center p-3 p-md-5"
            style={{ width: '90%' }}
          >
            <h1 className="mb-3">Ranking</h1>
            <div className="d-md-flex justify-content-between align-items-center mb-2 w-md-100">
              <FormControl className="col-12 col-md-6 mb-2 mx-2">
                <InputLabel id="phase-label">Phase</InputLabel>
                <Select
                  id="phase"
                  labelId="phase-label"
                  value={phase}
                  label="Phase"
                  onChange={handlePhaseChange}
                >
                  {phaseList.length > 0 ? (
                    phaseList.map(p => {
                      return <MenuItem value={p}>{p}</MenuItem>;
                    })
                  ) : (
                    <MenuItem value={1}>1</MenuItem>
                  )}
                </Select>
              </FormControl>
              <div className="col-12 col-md-6 mb-2 d-flex justify-content-end">
                <Autocomplete
                  disablePortal
                  id="factors"
                  options={factorsList}
                  value={selectedFactor}
                  sx={{ width: 300 }}
                  getOptionLabel={factor => factor.factorName}
                  onInputChange={handleFactorChange}
                  noOptionsText={
                    textFieldValue != '' ? (
                      <div className="d-flex flex-column align-items-center my-2">
                        <span className="text-center mb-2">
                          No Factor named "{textFieldValue}"
                        </span>
                        <Button
                          variant="contained"
                          onClick={() => {
                            addFactor(true);
                          }}
                        >
                          Add Factor
                        </Button>
                      </div>
                    ) : (
                      'No Factors Found'
                    )
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Contribution Factor"
                      value={textFieldValue}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    addFactor(false);
                  }}
                  className="mx-2"
                >
                  <FaPlus />
                </Button>
              </div>
            </div>
            {selectedFactor && (
              <div className="w-md-100 d-flex flex-column flex-md-row justify-content-around my-2 align-items-center">
                <div className="d-flex flex-column align-items-center align-items-md-start my-2">
                  <div
                    className="mb-0"
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                  >
                    Contribution Score For
                  </div>
                  <h1 style={{ marginTop: '-5px' }}>
                    {selectedFactor?.factorName}
                  </h1>
                </div>
                <div className="d-flex justify-content-around my-2">
                  <div className="mx-2 my-auto">
                    Max Score: {selectedFactor?.maxScore}
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="mx-2"
                    onClick={editFactor}
                  >
                    <MdEdit /> Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    className="mx-2"
                    onClick={deleteFactor}
                  >
                    <MdDelete /> Delete
                  </Button>
                </div>
              </div>
            )}
            <TableContainer>
              {/*<Table sx={{ minWidth: 650 }} aria-label="Ranking Table">
              <TableHead sx={{ bgcolor: '#dee2fc' }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  {/* {rankingData? 
                  rankingData.factors.map(factor => {
                      return (
                        <TableCell align="center">Committee</TableCell>

                      )
                  }) : <></>
                } 
                </TableRow>
              </TableHead>
              <TableBody>
                {rankingData ? (
                  userData.ranking.map(row => (
                    <CustomTableRow
                      key={row.uid}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.first_name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.project}</TableCell>
                      <TableCell align="center">{row.committee}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          disabled={loading}
                          aria-label="Edit"
                          color="primary"
                          onClick={() => {
                            setDeleteUser(null);
                            setUpdateUser(row.uid);
                            setOpenPopup(true);
                          }}
                        >
                          <MdEdit />
                        </IconButton>
                        <IconButton
                          disabled={loading}
                          aria-label="Delete"
                          color="secondary"
                          className="ms-2"
                          onClick={() => {
                            setDeleteUser(row.uid);
                            setOpenPopup(true);
                          }}
                        >
                          <MdDelete />
                        </IconButton>
                      </TableCell>
                    </CustomTableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No User</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>*/}
            </TableContainer>

            <Popup
              title={
                factorAction === 0
                  ? 'Add a Contribution Factor'
                  : factorAction === 1
                  ? 'Update Contribution Factor'
                  : `Delete ${selectedFactor?.factorName}?`
              }
              openModal={openPopup}
              setOpenModal={setOpenPopup}
            >
              {factorAction === 2 ? (
                <DeleteForm
                  setLoading={setLoading}
                  setOpenModal={setOpenPopup}
                  action={deleteFactorAction}
                />
              ) : (
                <FactorForm
                  setOpenModal={setOpenPopup}
                  addFactor={factorAction === 0}
                  setLoading={setLoading}
                  preFillFactor={
                    factorAction === 0 || selectedFactor === null
                      ? {
                          factorId: null,
                          factorName: textFieldValue,
                          maxScore: null,
                          phase: null,
                        }
                      : selectedFactor
                  }
                  actions={actions}
                />
              )}
            </Popup>
          </Card>
        )}
      </div>
    </>
  );
}
