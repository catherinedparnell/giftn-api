import * as fs from '../database/firestore';

// adds user to firestore
// req.body = { name: the name of user }
export const addUser = (req, res) => {
  fs.addUser(req.params.username, req.body.name)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};

// returns id of new gift
// req.body = { gift: { name: the name, price: the price, link: the link, id: unique id } }
export const addGiftToPerson = (req, res) => {
  fs.addGiftToPerson(req.params.personID, req.body.gift)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};

// takes personID in params, giftID in body
// req.body = { giftID: this gift ID}
export const removeGiftFromPerson = (req, res) => {
  fs.removeGiftFromPerson(req.params.personID, req.body.giftID)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};

// returns id of new person
// req.body = { person: { giftInfo: {}, name: their name, id: id } }
export const addPersonToUser = (req, res) => {
  console.log(req.body);
  fs.addPersonToUser(req.params.username, req.body.person)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

// remove person from user
// req.body = { personID: the person ID }
export const removePersonFromUser = (req, res) => {
  console.log('body');
  console.log(req.body);
  fs.removePersonFromUser(req.params.username, req.body.personID)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};

// add flag to gift in gift info if bought
// req.body = { personID: the person ID }
export const buyGift = (req, res) => {
  fs.buyGift(req.body.personID, req.params.giftID)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};

// remove flag from gift if bought
// req.body = { personID: the person ID }
export const wishlistGift = (req, res) => {
  console.log(req);
  fs.wishlistGift(req.body.personID, req.params.giftID)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};

// add/update budget in user
// req.body = { budget: 100 }
export const updateBudget = (req, res) => {
  fs.updateBudget(req.params.username, req.body.budget)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};

// returns user
// no req.body
export const getUser = (req, res) => {
  fs.getUser(req.params.username)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

// checks if user exists
// no req.body
export const checkUser = (req, res) => {
  fs.checkUser(req.params.username)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

// adds tracking number to user
// req.body = { trackingNumberObject: { trackingNumber, note, person } }
export const addTrackingNumberToUser = (req, res) => {
  fs.addTrackingNumberToUser(req.params.username, req.body.trackingNumberObject)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};

// removes tracking number from user
// req.body = { trackingNumber: tracking number }
export const removeTrackingNumberFromUser = (req, res) => {
  fs.removeTrackingNumberFromUser(req.params.username, req.body.trackingNumber)
    .then(() => { res.send({ message: 'this worked' }); })
    .catch((e) => {
      console.log(e);
    });
};
