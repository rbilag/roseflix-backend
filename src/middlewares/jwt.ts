import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { ERROR_MESSAGES } from '../constants';

export const encode = async (req: any, res: any, next: any) => {
	try {
		const user = await User.findByLogin(req.body.email);
		if (user) {
			const matches = await bcrypt.compare(req.body.password, user.password);
			if (matches) {
				const authToken = jwt.sign(
					{
						userId: user._id
					},
					process.env.SECRET_KEY!
				);
				console.log('Auth', authToken);
				req.authToken = authToken;
				req.userId = user._id;
				next();
			} else {
				return res.status(401).json({ success: false, message: ERROR_MESSAGES.UNAUTHORIZED });
			}
		} else {
			throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({ success: false, message: error.message });
	}
};

export const decode = (req: any, res: any, next: any) => {
	if (!req.headers['authorization']) {
		return res.status(401).json({ success: false, message: ERROR_MESSAGES.NO_TOKEN });
	}
	try {
		const accessToken = req.headers.authorization.split(' ')[1];
		const decoded: any = jwt.verify(accessToken, process.env.SECRET_KEY!);
		req.userId = decoded.userId;
		return next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ success: false, message: error.message });
	}
};
