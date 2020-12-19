import * as fs from './firestore';

export const addUser = (req, res) => {
  fs.addUser(req.params.username, req.body.name)
    .then(() => { return console.log('added successfully'); })
    .catch((e) => {
      console.log(e);
    });
};

// returns id of new gift
export const addGiftToPerson = (req, res) => {
  fs.addGiftToPerson(req.params.personID, req.body.gift)
    .then(() => {
      console.log('wrote gift');
    })
    .catch((e) => {
      console.log(e);
    });
};

// takes personID in params, giftID in body
export const removeGiftFromPerson = (req, res) => {
  fs.removeGiftFromPerson(req.params.personID, req.body.giftID)
    .then(res.send({ message: 'this worked' }))
    .catch((e) => {
      console.log(e);
    });
};

// returns id of new person
export const addPersonToUser = (req, res) => {
  console.log(req.params.username, req.body);
  fs.addPersonToUser(req.params.username, req.body.person)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const removePersonFromUser = (req, res) => {
  fs.removePersonFromUser(req.params.username, req.body.personID)
    .then(res.send({ message: 'this worked' }))
    .catch((e) => {
      console.log(e);
    });
};

// add flag to gift in gift info if bought
export const buyGift = (req, res) => {
  fs.buyGift(req.body.personID, req.params.giftID)
    .then(console.log('gift marked as bought'))
    .catch((e) => {
      console.log(e);
    });
};

// remove flag from gift if bought
export const wishlistGift = (req, res) => {
  fs.wishlistGift(req.body.personID, req.params.giftID)
    .then(console.log('gift marked as not bought'))
    .catch((e) => {
      console.log(e);
    });
};

// add/update budget in user
export const updateBudget = (req, res) => {
  fs.updateBudget(req.params.username, req.body.budget)
    .then(console.log('budget set'))
    .catch((e) => {
      console.log(e);
    });
};

// returns user
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
