const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const followRouter = require('./routes/followRoutes');
const postTagRouter = require('./routes/postTagRoutes');
const commentRouter = require('./routes/commentRoutes');
const likesRouter = require('./routes/likeRoutes');
const postLikesRouter = require('./routes/postLikeRoutes');
const storyRouter = require('./routes/storyRoutes');
const reelRouter = require('./routes/reelRoutes');
const searchRouter = require('./routes/searchRoutes');

const app = express();

app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

app.set('view engine', 'ejs');

app.use(express.json());

app.use(helmet());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());
app.use(xss());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/follow', followRouter);
app.use('/api/v1/postTag', postTagRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/likes', likesRouter);
app.use('/api/v1/postLikes', postLikesRouter);
app.use('/api/v1/story', storyRouter);
app.use('/api/v1/reel', reelRouter);
app.use('/api/v1/search', searchRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
