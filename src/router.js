import { Router } from 'express';
import * as f from './controllers/data-controller';
import * as mail from './controllers/mail-controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

router.route('/personGift/:personID')
  .post(f.addGiftToPerson)
  .put(f.removeGiftFromPerson);

router.route('/person/:username')
  .post(f.addPersonToUser)
  .put(f.removePersonFromUser);

router.route('/gift/:giftID')
  .put(f.buyGift)
  .delete(f.wishlistGift);

router.route('/budget/:username')
  .put(f.updateBudget);

router.route('/user/:username')
  .post(f.addUser)
  .get(f.getUser);

router.route('/check/:username')
  .get(f.checkUser);

router.route('/tracking/:username')
  .post(f.addTrackingNumberToUser)
  .delete(f.removeTrackingNumberFromUser);

router.route('/getTracking/')
  .get(mail.getUPS);

export default router;
