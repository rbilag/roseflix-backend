import express, { Application } from 'express';
import { createServer, Server as HttpServer } from 'http';
import cors, { CorsOptions } from 'cors';
import logger from 'morgan';
import { connectDb } from './config/index';
import indexRouter from './routes/index';
import { ERROR_MESSAGES } from './constants';

const PORT: string | number = process.env.PORT || 8080;
const corsOptions: CorsOptions = { credentials: false };
const app: Application = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
const server: HttpServer = createServer(app);

connectDb().then(async () => {
	const URL_PREFIX = '/api/v1';
	app.use(`${URL_PREFIX}`, indexRouter);
	app.use('*', (req, res) => {
		return res.status(404).json({
			success: false,
			message: ERROR_MESSAGES.ENDPOINT_NOT_FOUND
		});
	});

	server.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
