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
  const data = {
    from: 'Giftn <postmaster@sandboxeeb6421cbae5482caa88da7f55ffd5ee.mailgun.org>',
    to: req.body.toAddress,
    subject: `Your friend ${req.body.fromName} sent you a gift!`,
    //   html: `<div className="email-outer">
    //   <div className="top-section">
    //     <div className="logo-white">Giftn </div>
    //   </div>
    //   <div className="top-border">
    //     <div className="blue-div" />
    //     <div className="blue-div" />
    //   </div>
    //   <div className="green-div">
    //     <div className="email-title">You&apos;ve got a package coming!</div>
    //     <div className="pink-box">
    //       <div className="to-box"> To: ${req.body.toName} </div>
    //       <div className="from-box"> From: ${req.body.fromName} </div>
    //       <div className="message-box">Happy Holidays! Hope you enjoy your gift.</div>
    //     </div>
    //     <div className="tracking-number-box">${req.body.trackingNumber}</div>
    //   </div>
    //   <div className="bottom-border">
    //     <div className="blue-div" />
    //     <div className="blue-div" />
    //   </div>
    //   <div className="yellow-box">
    //     <div className="thanks-button">Say Thanks</div>
    //     <div className="sign-up-button">Sign up for giftn</div>
    //   </div>
    //   <div className="logo-black">giftn</div>
    //   <div className="border-bottom">
    //     <div className="yellow-div" />
    //     <div className="yellow-div" />
    //   </div>
    // </div>`,
    html: `<div
      className="email-outer"
      style="display: flex;
flex-direction: column;
width: 100%;
height: 100%;
align-items: center;
justify-content: space-around;"
    >
      <div
        className="top-section"
        style="    display: flex;
background: #002863;
width: 837px;
height: 119px;
justify-content: center;
align-items: center;"
      >
        <div
          className="logo-white-email"
          style="font-family: SirinStencil;
font-style: normal;
font-weight: normal;
font-size: 36px;
line-height: 52px;
display: flex;
align-items: center;
text-align: center;
color: white;"
        >
          Giftn
        </div>
      </div>
      <div className="top-border">
        <div className="blue-div" />
        <div className="blue-div" />
      </div>
      <div
        className="green-div"
        style="    width: 837px;
height: 643px;
background: #023535;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;"
      >
        <div
          className="email-title"
          style="font-style: normal;
font-weight: normal;
font-size: 48px;
line-height: 65px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

/* rosy cheeks */

color: #FF77E1;"
        >
          You&apos;ve got a package coming!
        </div>
        <div
          className="pink-box"
          style="width: 398px;
height: 262px;
left: 101px;
top: 307px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

background: #FF77E1;"
        >
          <div
            className="to-box"
            style="width: 107px;
height: 28px;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
margin-bottom: 10px;
line-height: 12px;
justify-content: center;

display: inline-flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

color: #FFF5F5;

background: #F35849;"
          >
            To: ${req.body.toName}
          </div>
          <div
            className="from-box"
            style="    width: 97px;
height: 28px;
left: 150px;
top: 52px;
margin-bottom: 10px;

background: #81D7AD;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: inline-flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

color: #0E0B0B;"
          >
          ${req.body.fromName} 
          </div>
          <div
            className="message-box"
            style="display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
width: 320px;
height: 124px;
left: 39px;
top: 104px;

background: #002863;"
          />
        </div>
        <div
          className="tracking-number-box"
          style="    width: 398px;
height: 48px;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: flex;
align-items: center;
letter-spacing: 0.03em;

color: #000000;

background: #FFF5F5;"
        > ${req.body.trackingNumber} </div>
      </div>
      <div className="bottom-border">
        <div className="blue-div" />
        <div className="blue-div" />
      </div>
      <div
        className="yellow-box"
        style="    width: 837px;
height: 329px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
/* five golden rings */

background: #F5DA77;"
      >
        <div
          className="thanks-button"
          style="    width: 82px;
height: 28px;

background: #F35849;
font-family: $josefin;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

color: #FFF5F5;
justify-content: center;
color: #FFF5F5;"
        >
          Say Thanks
        </div>
        <div
          className="sign-up-button"
          style="   display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
width: 112px;
height: 28px;
margin-top: 20px;

justify-content: center;
font-family: Josefin Sans;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.03em;

color: #FFF5F5;
background: #002863;"
        >
          Sign up for giftn
        </div>
      </div>
      <div className="logo-black">giftn</div>
      <div className="border-bottom">
        <div className="yellow-div" />
        <div className="yellow-div" />
      </div>
    </div>`,
  };
  mg.messages().send(data, (error, body) => {
    console.log(body);
    res.send({ message: body });
  });
};
