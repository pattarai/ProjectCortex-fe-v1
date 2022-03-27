import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  LinearProgress,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { MdDelete, MdEdit } from 'react-icons/md';
import { SlideProps } from '@mui/material/Slide';
import { FaPlus } from 'react-icons/fa';

import Popup from '../../components/Popup';
import DeleteForm from '../../components/DeleteForm';
import FactorForm from './FactorForm';

import { useSelector, useDispatch } from 'react-redux';
import { useRankingAdminSlice } from './slice';
import { selectRankingAdmin } from './slice/selectors';
import { Factor, Ranking } from './slice/types';
import { AiOutlineClose } from 'react-icons/ai';

type TransitionProps = Omit<SlideProps, 'direction'>;

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#ffeee6',
  },
}));

interface Props {}
interface DisplayDataType {
  [key: number]: {
    name: string;
    factors: {
      factorId: number;
      factorName: String;
      score: number;
    }[];
  };
}

type User = {
  userId: number;
  factorId: number;
  score: number;
};

export function RankingAdmin(props: Props) {
  const { actions } = useRankingAdminSlice();
  const { factors, ranking, loadingState } = useSelector(selectRankingAdmin);
  const dispatch = useDispatch();

  // <--------- Flags ---------->
  /** FactorAction
   * 0 - Add Factor | 1 - update Factor | 2 - delete Factor
   */
  const [factorAction, setFactorAction] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [snackbarVisibility, setSnackbarVisibility] = useState<boolean>(false);
  const [transition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  // <!--------- Flags ---------->

  // Phase List and factors list, for the dropdown boxes
  const [phaseList, setPhaseList] = useState<number[]>([0]);
  const [factorsList, setFactorsList] = useState<Factor[]>([]);

  // Selected phase
  const [phase, setPhase] = useState<number>(0);
  // Selected Factor
  const [selectedFactor, setSelectedFactor] = useState<Factor | null>(null);
  // Factor TextField Controller
  const [textFieldValue, setTextFieldValue] = useState<string>('');

  /**
   * Formatted Ranking data
   * {
   *   userId: {
   *      name: String;
   *      factors: {
   *        factorId: number;
   *        factorName: string;
   *        score: number;
   *      }
   *   }
   * }
   */
  const [displayRankingData, setDisplayRankingData] =
    useState<DisplayDataType | null>(null);

  useEffect(() => {
    // Dispatch Actions
    dispatch(actions.getFactors());
    dispatch(actions.getRanking());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set Factors List for the Dropdown Box
    setFactorsList(
      factors.length
        ? phase === 0
          ? factors
          : factors.filter(factor => factor.phase === phase)
        : [],
    );

    const tempList: number[] = [0];
    factors.forEach(factor => {
      if (!tempList.includes(factor.phase)) tempList.push(factor.phase);
    });
    tempList.sort();
    setPhaseList(tempList);

    // Hide loader
    loadingState.factors && loadingState.ranking && setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factors]);

  useEffect(() => {
    if (!(loadingState.factors || loadingState.ranking)) {
      // Hide loader
      setLoading(false);
    } else {
      // show loader
      setLoading(true);
    }
    // eslint-disable-next-line
  }, [loadingState]);

  useEffect(() => {
    if (!(loadingState.factors && loadingState.ranking)) {
      // Arrange ranking data
      handleDisplayRankingData(phase, selectedFactor);
    }
    // eslint-disable-next-line
  }, [ranking]);

  const EditableTableCell = (userId, factor, userFactors) => {
    for (var i = 0; i < userFactors.length; i++) {
      if (userFactors[i].factorId === factor.factorId) {
        return (
          <TableCell align="center">
            <TextField
              className="w-auto"
              variant="standard"
              type="number"
              InputProps={{
                inputProps: { min: 0, max: factor.maxScore },
              }}
              value={userFactors[i].score}
              onChange={e => {
                e.target.value !== '' &&
                  changeScore(userId, factor.factorId, e.target.value);
              }}
            />
          </TableCell>
        );
      }
    }
  };

  function saveChanges() {
    setLoading(true);

    var crewScore: User[] = [];

    if (displayRankingData) {
      Object.entries(displayRankingData).map(([userId, user]) => {
        user.factors.forEach(factor => {
          const userEntry: User = {
            userId: Number(userId),
            factorId: factor.factorId,
            score: factor.score,
          };
          crewScore.push(userEntry);
        });
      });

      dispatch(actions.updateRanking({ crewScore }));

      setLoading(false);
      setSnackbarVisibility(true);
    }
  }

  function changeScore(userId, factorId, score) {
    score = Number(score);
    if (displayRankingData) {
      var temp = displayRankingData;
      var index = temp[userId].factors.findIndex(
        factor => factor.factorId === factorId,
      );
      temp[userId].factors[index].score = score;
      setDisplayRankingData(temp);

      // update ranking state var
      var _temp: Ranking[] = [];
      ranking.forEach((rank, i) => {
        if (rank.userId == userId && rank.factors.factorId == factorId) {
          _temp.push({ ...rank, score });
        } else {
          _temp.push(rank);
        }
      });

      dispatch(actions.setRanking(_temp));
    }
  }

  function handleDisplayRankingData(
    phase: number,
    selectedFactor: Factor | null,
  ) {
    var tempRankingData: DisplayDataType = {};

    if (phase === 0) {
      ranking.forEach(rank => {
        if (!tempRankingData.hasOwnProperty(rank.userId)) {
          tempRankingData[rank.userId] = {
            name: rank.users.firstName + ' ' + rank.users.lastName,
            factors: [
              {
                factorId: rank.factors.factorId,
                factorName: rank.factors.factorName,
                score: rank.score,
              },
            ],
          };
        } else {
          tempRankingData[rank.userId].factors.push({
            factorId: rank.factors.factorId,
            factorName: rank.factors.factorName,
            score: rank.score,
          });
        }
      });
    } else if (phase !== 0 && selectedFactor == null) {
      // get all ranks related to phase num
      ranking.forEach(rank => {
        if (rank.factors.phase === phase) {
          if (!tempRankingData.hasOwnProperty(rank.userId)) {
            tempRankingData[rank.userId] = {
              name: rank.users.firstName + ' ' + rank.users.lastName,
              factors: [
                {
                  factorId: rank.factors.factorId,
                  factorName: rank.factors.factorName,
                  score: rank.score,
                },
              ],
            };
          } else {
            tempRankingData[rank.userId].factors.push({
              factorId: rank.factors.factorId,
              factorName: rank.factors.factorName,
              score: rank.score,
            });
          }
        }
      });
    } else {
      // get all ranks related to selected factor
      ranking.forEach(rank => {
        var condition: boolean =
          rank.factors.factorId === selectedFactor?.factorId;
        if (!tempRankingData.hasOwnProperty(rank.userId)) {
          tempRankingData[rank.userId] = {
            name: rank.users.firstName + ' ' + rank.users.lastName,
            factors: [
              {
                factorId: rank.factors.factorId,
                factorName: rank.factors.factorName,
                score: condition ? rank.score : 0,
              },
            ],
          };
        } else {
          tempRankingData[rank.userId].factors.push({
            factorId: rank.factors.factorId,
            factorName: rank.factors.factorName,
            score: condition ? rank.score : 0,
          });
        }
      });
    }
    setDisplayRankingData(
      factors.length && ranking.length ? tempRankingData : null,
    );
  }

  function handleFactorChange(_, value: string) {
    setTextFieldValue(value);
    var _phase;

    const val = (value: string): Factor | null => {
      var _fl: Factor[] = [];
      factorsList.forEach(f => {
        if (f.factorName === value) {
          _fl.push(f);
          setPhase(f.phase);
          _phase = f.phase;
        }
      });
      if (_fl.length > 0) return _fl[0];
      return null;
    };
    var validFactor = val(value);

    if (validFactor !== null) {
      setSelectedFactor(validFactor);
      // Arrange ranking data
      handleDisplayRankingData(_phase, validFactor);
    }
  }
  function handlePhaseChange(e) {
    const phaseNum: number = e.target.value;
    setPhase(phaseNum);
    setFactorsList(
      factors.length
        ? phaseNum === 0
          ? factors
          : factors.filter(factor => factor.phase === phaseNum)
        : [],
    );

    // Arrange ranking data
    handleDisplayRankingData(phaseNum, null);

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
      dispatch(actions.setFactorsLoading(true));
      dispatch(actions.deleteFactor({ factorId: selectedFactor.factorId }));
      setTextFieldValue('');
      setSelectedFactor(null);
      handlePhaseChange({ target: { value: '0' } });
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
            <div className="d-flex justify-content-center align-items-center m-3 mt-4 w-md-100 flex-column flex-md-row">
              <div className="col-5 mb-4 mx-2">
                <FormControl className="col-12">
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
                        return (
                          <MenuItem value={p}>{p === 0 ? 'All' : p}</MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value={0}>All</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>

              <div className="col-8 col-md-6 mb-4 d-flex justify-content-end">
                <Autocomplete
                  disablePortal
                  id="factors"
                  options={factorsList}
                  value={selectedFactor}
                  sx={{ width: 300 }}
                  getOptionLabel={factor => factor.factorName}
                  onInputChange={handleFactorChange}
                  noOptionsText={
                    textFieldValue !== '' ? (
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
                <div className="col-12 col-md-6 d-flex flex-column align-items-center align-items-md-start my-2">
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
                <div className="col-12 col-md-6 d-flex flex-column flex-lg-row">
                  <div className="d-flex justify-content-center my-2">
                    <div className="mx-2 my-auto">
                      Phase: {selectedFactor?.phase}
                    </div>
                    <div className="mx-2 my-auto">
                      Max Score: {selectedFactor?.maxScore}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center my-2">
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
              </div>
            )}
            {!(loadingState.factors && loadingState.ranking) ? (
              factors.length ? (
                ranking.length ? (
                  <>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="Ranking Table"
                        stickyHeader
                      >
                        <TableHead sx={{ bgcolor: '#dee2fc' }}>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            {selectedFactor ? (
                              <TableCell align="center">
                                {selectedFactor.factorName}
                              </TableCell>
                            ) : factorsList ? (
                              factorsList?.map(factor => {
                                return (
                                  <TableCell align="center">
                                    {factor.factorName}
                                  </TableCell>
                                );
                              })
                            ) : (
                              factors?.map(factor => {
                                return (
                                  <TableCell align="center">
                                    {factor.factorName}
                                  </TableCell>
                                );
                              })
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {displayRankingData ? (
                            Object.entries(displayRankingData).map(
                              ([userId, user]) => {
                                return (
                                  <CustomTableRow>
                                    <TableCell>{user.name}</TableCell>
                                    {selectedFactor !== null
                                      ? EditableTableCell(
                                          userId,
                                          selectedFactor,
                                          user.factors,
                                        )
                                      : factorsList.map(factor =>
                                          EditableTableCell(
                                            userId,
                                            factor,
                                            user.factors,
                                          ),
                                        )}
                                  </CustomTableRow>
                                );
                              },
                            )
                          ) : (
                            <CustomTableRow> Loading Data... </CustomTableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div className="d-flex justify-content-end m-2 align-items-center">
                      <Button variant="contained" onClick={() => saveChanges()}>
                        SAVE
                      </Button>
                      <Snackbar
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        TransitionComponent={transition}
                        autoHideDuration={6000}
                        open={snackbarVisibility}
                        onClose={() => setSnackbarVisibility(false)}
                        message="Changes Saved!"
                        // eslint-disable-next-line
                        key={'bottom' + 'center'}
                        action={
                          <>
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              sx={{ p: 0.5 }}
                              onClick={() => setSnackbarVisibility(false)}
                            >
                              <AiOutlineClose />
                            </IconButton>
                          </>
                        }
                      />
                    </div>
                  </>
                ) : (
                  // If No User Data Found
                  <div className="d-flex justify-content-center">
                    No Users Found.
                  </div>
                )
              ) : (
                // If no Factors found
                <div className="d-flex justify-content-center">
                  No Factors Found. Click on the '+' Button Above.
                </div>
              )
            ) : (
              <div style={{ width: '100%' }}>
                <LinearProgress />
              </div>
            )}

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
                  setLoading={val => {}}
                  setOpenModal={setOpenPopup}
                  action={deleteFactorAction}
                />
              ) : (
                <FactorForm
                  setOpenModal={setOpenPopup}
                  addFactor={factorAction === 0}
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
