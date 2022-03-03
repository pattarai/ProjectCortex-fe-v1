import * as React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { axiosPost } from '../../requests';
import Skeleton from '@mui/material/Skeleton';

type userDetails = {
  factors: {
    factorName: string;
    maxScore: number;
    phase: number;
  };
  score: number;
};

interface ScoreData {
  userDetails: userDetails[];
  totalScoreByPhase: number[];
}

export default function MemberScoreCard() {
  const [userData, setUserData] = useState<ScoreData | null>(null);
  const [currentPhase, setCurrentPhase] = useState<null | userDetails[]>(null);
  const [loading, setLoading] = useState(true);

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  const phases = userData
    ? userData.userDetails.map(row => row.factors.phase)
    : null;
  const unique = phases ? phases.filter(onlyUnique) : null;

  const handleChange = (event: SelectChangeEvent) => {
    const newUserData = userData?.userDetails.filter(
      row => row.factors.phase.toString() === event.target.value.toString(),
    );
    newUserData && setCurrentPhase([...newUserData]);
  };

  useEffect(() => {
    axiosPost('/users/ranks', {}).then(res => {
      const user = res.data.data;
      const currentPhaseData = user.userDetails.filter(
        row => row.factors.phase === user.userDetails[0].factors.phase,
      );
      setUserData(user);
      setCurrentPhase(currentPhaseData);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="container my-4">
        {loading ? (
          <>
            <Skeleton variant="text" sx={{ height: 100 }} />
            <Skeleton
              sx={{ height: 400 }}
              animation="wave"
              variant="rectangular"
            />
          </>
        ) : (
          <div className="row">
            <div className="col-12">
              <Card elevation={2}>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel>Select Phase</InputLabel>
                    <Select
                      value={
                        currentPhase
                          ? currentPhase[0].factors.phase.toString()
                          : ''
                      }
                      label="Select Phase"
                      onChange={handleChange}
                    >
                      {unique?.map((data, keyy) => (
                        <MenuItem key={keyy} value={data}>
                          {`Phase  ${data}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Table className="mt-2">
                    <TableHead>
                      <TableRow>
                        <TableCell>SNO</TableCell>
                        <TableCell align="left">CONTRIBUTION</TableCell>
                        <TableCell align="right">MAXSCORE</TableCell>
                        <TableCell align="right">SCORE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentPhase &&
                        currentPhase.map((list, index) => (
                          <TableRow
                            key={`${list}-${index}`}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {`#${index + 1}`}
                            </TableCell>
                            <TableCell align="left">
                              {list.factors.factorName}
                            </TableCell>
                            <TableCell align="right">
                              {list.factors.maxScore}
                            </TableCell>
                            <TableCell align="right">{list.score}</TableCell>
                          </TableRow>
                        ))}
                      {userData &&
                        userData.totalScoreByPhase.map((list, index) => (
                          <TableRow
                            key={`${list}-${index}`}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell />
                            <TableCell />
                            <TableCell />
                            <TableCell align="right">{list}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
