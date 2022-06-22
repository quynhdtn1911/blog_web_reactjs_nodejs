const postRouter = require('./post');
const userRouter = require('./user');
const authRouter = require('./auth');
const postsRouter = require('./posts');
// const uploadRouter = require('./upload');
const categoriesRouter = require('./categories');

const initRouter = (app) => {
    app.use('/post', postRouter);
    app.use('/posts', postsRouter);
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    // app.use('/upload', uploadRouter);
    app.use('/categories', categoriesRouter);
}

module.exports = initRouter;