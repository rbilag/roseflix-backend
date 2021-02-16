import express from 'express';

const router = express.Router();
router.get('/', async (req: any, res: any) => {
	return res.status(200).json({
		success: true,
		data: 'Welcome to Roseflix backend!'
	});
});

export default router;
