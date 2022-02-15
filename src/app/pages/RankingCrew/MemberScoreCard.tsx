import * as React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';
import axios from 'axios';

type Factors = {
  phase: number;
  factorName: string;
  maxScore: number;
};
interface ScoreData {
  factors: Factors;
  score: number;
}

export default function MemberScoreCard() {
  const [userData, setUserData] = useState<ScoreData[] | null>(null);
  const [currentPhase, setCurrentPhase] = useState<null | ScoreData[]>(null);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const phases = userData ? userData.map(row => row.factors.phase) : null;
  const unique = phases ? phases.filter(onlyUnique) : null;

  const handleChange = (event: SelectChangeEvent) => {
    const newUserData = userData?.filter(
      row => row.factors.phase.toString() === event.target.value.toString(),
    );
    newUserData && setCurrentPhase([...newUserData]);
  };

  useEffect(() => {
    axios
      .post('http://127.0.0.1:5000/api/users/ranks', {
        userId: 4,
      })
      .then(res => {
        const user = res.data.data;
        setUserData(user);
        const newUserData = user?.filter(
          row =>
            row.factors.phase.toString() === user[0].factors.phase.toString(),
        );
        newUserData && setCurrentPhase([...newUserData]);
      });
  }, []);

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-12 col-md-5"></div>
          <div className="col-12 col-md-7">
            <Card
              elevation={2}
              sx={{
                textAlign: 'center',
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <div className="d-flex justify-content-end">
                  <FormControl sx={{ minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label">
                      Select Phase
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={
                        currentPhase
                          ? currentPhase[0].factors.phase.toString()
                          : ''
                      }
                      label="Phase"
                      onChange={handleChange}
                    >
                      {unique?.map((data, keyy) => (
                        <MenuItem key={keyy} value={data}>
                          {`Phase  ${data}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <List>
                  <ListSubheader>
                    <div className="d-flex justify-content-between">
                      <span>SNO</span>
                      <span>CONTRIBUTION NAME</span>
                      <span>MAX SCORE</span>
                      <span>SCORE</span>
                    </div>
                  </ListSubheader>
                  {currentPhase &&
                    currentPhase.map((list, index) => (
                      <ListItem
                        key={index}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <ListItemText
                          primary={`#${index + 1}`}
                          className="d-flex justify-content-start"
                        />
                        <ListItemText
                          primary={list.factors.factorName}
                          className="d-flex justify-content-start"
                        />
                        <ListItemText
                          primary={list.factors.maxScore}
                          className="d-flex justify-content-end"
                        />
                        <ListItemText
                          primary={list.score}
                          className="d-flex justify-content-end"
                        />
                      </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemText />
                    <ListItemText
                      primary="TOTAL"
                      className="d-flex justify-content-start"
                    />
                    <ListItemText
                      primary="42"
                      className="d-flex justify-content-end"
                    />
                    <ListItemText
                      primary="9"
                      className="d-flex justify-content-end"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
