import { Router } from 'express';
import * as f from './controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

router.route('/personGift/:personID')
  .post(f.addGiftToPerson)
  .delete(f.removeGiftFromPerson);

router.route('/person/:username')
  .post(f.addPersonToUser)
  .delete(f.removePersonFromUser);

router.route('/gift/:giftID')
  .put(f.buyGift)
  .delete(f.wishlistGift);

router.route('/budget/:username')
  .put(f.updateBudget);

router.route('/user/:username')
  .post(f.addUser)
  .get(f.getUser);

export default router;
