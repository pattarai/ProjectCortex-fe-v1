import { useState } from 'react';
import { Button, TextField, FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';

type Props = {
  addFactor: boolean;
  setOpenModal: any;
  setLoading: any;
  preFillFactor: Factor;
  actions: any;
};

type Factor = {
  factorId: number | null;
  factorName: string;
  maxScore: number | null;
  phase: number | null;
};

/**
 * Form for Adding/Updating Factors
 *
 * @param addFactor boolean variable for add/update
 * @param setOpenModal Functon
 * @param setLoading Functon
 * @param preFillFactor Factor { factorId: number | null, factorName: string, maxScore: number | null, phase: number | null }
 * @param actions 
 * 
 * @example    <FactorForm
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
                  action={
                    factorAction === 0
                      ? actions.addFactor
                      : actions.updateFactor
                  }
                />
 */

export default function FactorForm(props: Props) {
  const dispatch = useDispatch();
  const [factorName, setFactorName] = useState<string>(
    props.preFillFactor.factorName,
  );
  const [maxScore, setMaxScore] = useState<number | string>(
    props.preFillFactor.maxScore !== null ? props.preFillFactor.maxScore : 1,
  );
  const [phase, setPhase] = useState<number | string>(
    props.preFillFactor.phase !== null ? props.preFillFactor.phase : 1,
  );

  const [error, setError] = useState<any>({
    factorName: { error: false, errorMsg: '' },
    maxScore: { error: false, errorMsg: '' },
    phase: { error: false, errorMsg: '' },
  });

  const factorId: number | null = props.preFillFactor.factorId;

  // Submit handler
  const handleSubmit = () => {
    const resetErrorMsg = {
      factorName: { error: false, errorMsg: '' },
      maxScore: { error: false, errorMsg: '' },
      phase: { error: false, errorMsg: '' },
    };
    setError(resetErrorMsg);

    if (factorName === '')
      setError({
        ...error,
        factorName: { error: true, errorMsg: 'Please enter a Factor name.' },
      });
    if (maxScore === '')
      setError({
        ...error,
        maxScore: { error: true, errorMsg: 'Please provide a maximum score.' },
      });
    if (phase === '')
      setError({
        ...error,
        phase: { error: true, errorMsg: 'Please enter a phase.' },
      });

    const isError: boolean =
      error.factorName.error && error.maxScore.error && error.phase.error;
    if (!isError) {
      const params = {
        factorId: factorId !== null ? Number(factorId) : factorId,
        factorName: factorName,
        maxScore: Number(maxScore),
        phase: Number(phase),
      };
      if (props.addFactor) dispatch(props.actions.addFactor(params));
      else dispatch(props.actions.updateFactor(params));
      props.setOpenModal(false);
      props.setLoading(true);
    }
  };

  return (
    <>
      <FormControl className="d-flex p-2">
        <TextField
          label="Factor Name"
          variant="outlined"
          className="my-2"
          value={factorName}
          onChange={e => {
            setFactorName(e.target.value);
          }}
          error={error.factorName.error}
          helperText={error.factorName.errorMsg}
        />
        <div className="my-2">
          <TextField
            label="Phase"
            variant="outlined"
            type="number"
            className="me-1"
            value={phase}
            error={error.phase.error}
            helperText={error.phase.errorMsg}
            onChange={e => {
              setPhase(e.target.value);
            }}
          />
          <TextField
            label="Max Score"
            variant="outlined"
            className="ms-1"
            type="number"
            value={maxScore}
            error={error.maxScore.error}
            helperText={error.maxScore.errorMsg}
            onChange={e => {
              setMaxScore(e.target.value);
            }}
          />
        </div>
        <Button
          variant="contained"
          className="my-2 mt-3"
          onClick={handleSubmit}
        >
          {props.addFactor ? 'Add' : 'Save'}
        </Button>
      </FormControl>
    </>
  );
}
