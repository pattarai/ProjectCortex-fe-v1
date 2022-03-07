import { Backdrop } from '@mui/material';
import Img from './network.png';

export default function Problem({ isError }) {
  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundColor: '#000000b3',
        }}
        open={isError}
      >
        <div className="d-flex flex-column align-justify-center">
          <img src={Img} height="30%" width="30%" alt="" />
          <h1 className="mt-5" style={{ textAlign: 'center' }}>
            We are facing technical issues on our side. <br /> Try again
            sometime later
          </h1>
        </div>
      </Backdrop>
    </>
  );
}
