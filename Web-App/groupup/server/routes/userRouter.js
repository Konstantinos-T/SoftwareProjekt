import express from 'express';
import { createUser, findUser, userLike, userDisLike , userUpdate} from '../controllers/userPost.js';

const router = express.Router();

router.post('/', createUser);
router.get('/findUser/:id', findUser);
router.patch('/update/:id', userUpdate)
router.patch('/userLike/:id', userLike); 
router.patch('/userDisLike/:id', userDisLike);
export default router;