import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const UPS_API = 'https://onlinetools.ups.com/track/v1/details/';
// const trackingNumberTest = 572254454;
const trackingNumberTest2 = '1Z5338FF0107231059';

// eslint-disable-next-line import/prefer-default-export
export const getUPS = (req, res) => {
  axios.get(`${UPS_API}${trackingNumberTest2}`, {
    headers: { AccessLicenseNumber: process.env.UPS_ACCESS_KEY },
  })
    .then((response) => {
      if (response.data.trackResponse.shipment.warnings) {
        res.send({ message: response.data.trackResponse.shipment.warnings[0].message });
      } else {
        res.send({ message: response.data.trackResponse.shipment });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
