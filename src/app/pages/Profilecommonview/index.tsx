/**
 *
 * RankingCrew
 *
 */
import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, TextField } from '@mui/material';
import Img from '../DashboardLayout/subiksha.jpeg';

import Modal from '@mui/material/Modal';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';

interface Props {}

export function ProfileCommonView(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const phaseList = [
  //   { label: 'Phase I', id: 1 },
  //   { label: 'Phase II', id: 2 },
  //   { label: 'Phase III', id: 3 },
  // ];
  return (
    <>
      {/* <Autocomplete
         disablePortal
         onClick={handleOpen}
         id="clear-on-escape"
         clearOnEscape
         options={phaseList}
         renderInput={params => <TextField {...params} label="Select Phase" />}
       /> */}
      <div className="container my-3">
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5, mt: 1 }} />
          <TextField
            id="input-with-sx"
            label="Search Name"
            variant="standard"
          />
        </Box>
      </div>
      <section className="vh-100">
        <div className="d-flex justify-content-end p-4">
          <Button onClick={handleOpen}>Phase I</Button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            elevation={2}
            sx={{
              display: 'flex',
              textAlign: 'center',
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              padding: 2,
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Avatar
                alt="Raksha"
                src={Img}
                sx={{
                  width: 70,
                  height: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto',
                  marginBottom: '5%',
                }}
              />
              <Typography id="modal-modal-title" component="h2" variant="h5">
                Raksha V G - Phase I
              </Typography>
              <List id="modal-modal-description">
                <ListSubheader>
                  <div className="d-flex justify-content-between">
                    <span className="text-start">EVENT</span>
                    <span>SCORE</span>
                  </div>
                </ListSubheader>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary="INTACTO" />
                  <div className="d-flex justify-content-end">
                    <ListItemText primary="2" />
                  </div>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary="FESTX" />
                  <div className="d-flex justify-content-end">
                    <ListItemText primary="5" />
                  </div>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Modal>
        <div className="container my-4">
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <Card elevation={2} sx={{ textAlign: 'center' }}>
                <CardActionArea>
                  <CardContent>
                    <Avatar
                      alt="Raksha"
                      src={Img}
                      sx={{
                        width: 70,
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                        marginBottom: '5%',
                      }}
                    />
                    <Typography component="h2" variant="h5">
                      Raksha V G
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Director Of HR
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <Card elevation={2} sx={{ textAlign: 'center' }}>
                <CardActionArea>
                  <CardContent>
                    <Avatar
                      alt="Raksha"
                      src={Img}
                      sx={{
                        width: 70,
                        height: 70,
                        margin: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '5%',
                      }}
                    />
                    <Typography component="h2" variant="h5">
                      Raksha V G
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Director Of HR
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <Card elevation={2} sx={{ textAlign: 'center' }}>
                <CardActionArea>
                  <CardContent>
                    <Avatar
                      alt="Raksha"
                      src={Img}
                      sx={{
                        width: 70,
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                        marginBottom: '5%',
                      }}
                    />
                    <Typography component="h2" variant="h5">
                      Raksha V G
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Director Of HR
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>
        </div>
        <div className="container my-4">
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <Card elevation={2} sx={{ textAlign: 'center' }}>
                <CardActionArea>
                  <CardContent>
                    <Avatar
                      alt="Raksha"
                      src={Img}
                      sx={{
                        width: 70,
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                        marginBottom: '5%',
                      }}
                    />
                    <Typography component="h2" variant="h5">
                      Raksha V G
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Director Of HR
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <Card elevation={2} sx={{ textAlign: 'center' }}>
                <CardActionArea>
                  <CardContent>
                    <Avatar
                      alt="Raksha"
                      src={Img}
                      sx={{
                        width: 70,
                        height: 70,
                        margin: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '5%',
                      }}
                    />
                    <Typography component="h2" variant="h5">
                      Raksha V G
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Director Of HR
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <Card elevation={2} sx={{ textAlign: 'center' }}>
                <CardActionArea>
                  <CardContent>
                    <Avatar
                      alt="Raksha"
                      src={Img}
                      sx={{
                        width: 70,
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                        marginBottom: '5%',
                      }}
                    />
                    <Typography component="h2" variant="h5">
                      Raksha V G
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Director Of HR
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
