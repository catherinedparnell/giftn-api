import dotenv from 'dotenv';

const admin = require('firebase-admin');

dotenv.config({ silent: true });

// initializing firestore database
admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    project_id: 'giftn-a1b43',
  }),
  databaseURL: 'https://giftn.firebaseio.com',
});
const db = admin.firestore();

// ** exclamations indicate function has been tested

// add user: takes username and name!
export async function addUser(username, name) {
  const user = {
    name,
    people: [],
    trackingNumbers: [],
    budget: 0,
  };
  await db.collection('users').doc(username).set(user);
}

// checks if user with username exists!
export async function checkUser(username) {
  const usersRef = db.collection('users').doc(username);
  const userRes = await usersRef.get()
    .then((doc) => {
      return doc.exists;
    })
    .catch((e) => {
      console.log(e);
    });
  return userRes;
}

// add person to user: takes username and person object!
// person looks like this:
// const person = {
//     giftInfo: {},
//     name: 'name',
//     id: id,
// }
export async function addPersonToUser(username, person) {
  console.log(person);
  await db.collection('people').doc(person.id).set(person)
    .catch((e) => {
      console.log(e);
    });
  const peopleRef = db.collection('people').doc(person.id);
  const userRef = db.collection('users').doc(username);
  console.log('id:');
  console.log(peopleRef);
  const unionRes = await userRef.update({
    people: admin.firestore.FieldValue.arrayUnion(peopleRef),
  })
    .catch((e) => {
      console.log(e);
    });
  return unionRes;
}

// deletes person from user: takes username and person id!
export async function removePersonFromUser(username, personID) {
  const userRef = db.collection('users').doc(username);
  const personRef = db.collection('people').doc(personID);
  await userRef.update({
    people: admin.firestore.FieldValue.arrayRemove(personRef),
  });
  await db.collection('people').doc(personID).delete();
}

// add/update budget in user!
export async function updateBudget(username, budget) {
  const usersRef = db.collection('users').doc(username);
  await usersRef.update({ budget });
}

// get user!
export async function getUser(username) {
  const usersRef = db.collection('users').doc(username);
  const userRes = await usersRef.get()
    .then(async (doc) => {
      if (!doc.exists) {
        return { message: 'No such document!' };
      } else {
        const user = doc.data();
        const p = [];
        await Promise.all(user.people.map(async (person) => {
          await person.get()
            .then((res) => {
              p.push(res.data());
              return res.data();
            });
        }));
        user.people = p;
        return user;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return userRes;
}

// add gift to person: takes person id and gift!
// gift looks like this:
// const gift = {
//     giftName: 'name',
//     price: 'price',
//     link: 'link',
//     id: unique identifier,
// }
export async function addGiftToPerson(personID, gift) {
  const personRef = db.collection('people').doc(personID);
  const res = await personRef.update({
    [`giftInfo.${gift.id}`]: {
      giftName: gift.giftName,
      price: gift.price,
      bought: false,
      link: gift.link,
    },
  });
  return res;
}

// remove gift from person: takes person id and gift id!
export async function removeGiftFromPerson(personID, giftID) {
  const personRef = db.collection('people').doc(personID);
  await personRef.update({
    [`giftInfo.${giftID}`]: admin.firestore.FieldValue.delete(),
  });
}

// add flag to gift in gift info if bought!
export async function buyGift(personID, giftID) {
  const personRef = db.collection('people').doc(personID);
  await personRef.update({
    [`giftInfo.${giftID}.bought`]: true,
  });
}

// remove flag from gift if bought!
export async function wishlistGift(personID, giftID) {
  const personRef = db.collection('people').doc(personID);
  await personRef.update({
    [`giftInfo.${giftID}.bought`]: false,
  });
}

// add tracking number to user!
// const trackingNumberObject = {
//      trackingNumber: a valid tracking number,
//      note: a note about what gifts it is,
//      person: person's name
// }
export async function addTrackingNumberToUser(username, trackingNumberObject) {
  const userRef = db.collection('users').doc(username);
  await userRef.update({
    [`trackingNumbers.${trackingNumberObject.trackingNumber}`]: {
      note: trackingNumberObject.note,
      person: trackingNumberObject.person,
    },
  });
}

// delete tracking number from user!
// trackingNumber = a valid tracking number
export async function removeTrackingNumberFromUser(username, trackingNumberID) {
  const userRef = db.collection('users').doc(username);
  await userRef.update({
    [`trackingNumbers.${trackingNumberID}`]: admin.firestore.FieldValue.delete(),
  });
}
