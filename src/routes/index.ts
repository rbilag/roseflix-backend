import express from 'express';
import User from '../models/user';
import user from '../controllers/user';
import { encode, decode } from '../middlewares/jwt';

const router = express.Router();
router.get('/', async (req: any, res: any) => {
	return res.status(200).json({
		success: true,
		data: 'Welcome to Roseflix backend!'
	});
});
router.post('/signup', user.onCreateUser);
router.post('/signin', encode, async (req: any, res: any, next: any) => {
	const userDetails = await User.getUserById(req.userId);
	return res.status(200).json({
		success: true,
		authorization: req.authToken,
		data: { userDetails }
	});
});
router.post('/users/checkAvailability', user.onCheckAvailability);
router.post('/users/upsertProfile', decode, user.onUpsertProfile);
router.post('/users/deleteProfile', decode, user.onDeleteProfile);

export default router;
