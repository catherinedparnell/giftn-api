import axios from 'axios';
import dotenv from 'dotenv';

const mailgun = require('mailgun-js');

dotenv.config({ silent: true });

const UPS_API = 'https://onlinetools.ups.com/track/v1/details/';
const DOMAIN = 'sandboxeeb6421cbae5482caa88da7f55ffd5ee.mailgun.org';
// const trackingNumberTest = 572254454;
const trackingNumberTest2 = '1Z5338FF0107231059';

// gets UPS status information (cannot demo because we don't actually have tracking numbers)
// no req.body
export const getUPS = (req, res) => {
  axios.get(`${UPS_API}${trackingNumberTest2}`, {
    headers: {
      Username: 'jordantsanz',
      Password: 'Jord@nTs19',
      AccessLicenseNumber: process.env.UPS_ACCESS_KEY,
    },
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

// sends automated email from mailgun
// req.body = { toAddress: recipient email, toName: name of who it's to, fromName: name of who it's from, trackingNumber: valid tracking number }
export const sendEmail = (req, res) => {
  const mg = mailgun({ apiKey: process.env.MAILGUN_API, domain: DOMAIN });
  console.log(req.body.toAddress);
  const data = {
    from: 'Giftn <postmaster@sandboxeeb6421cbae5482caa88da7f55ffd5ee.mailgun.org>',
    to: req.body.toAddress,
    subject: `Your friend ${req.body.fromName} sent you a gift!`,
    text:
  `  You've got a package coming!
    
  ${req.body.fromName} sent you a gift. Hope you enjoy!

  Here is the tracking number: ${req.body.trackingNumber}

  With love, 
  from giftn`,
  };
  mg.messages().send(data, (error, body) => {
    console.log(body);
    res.send({ message: body });
  });
};
