const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const passport = require('passport')

// require the router modules
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const issuesRouter = require('./routes/issues');
const projectsRouter = require('./routes/projects');
const labelsRouter = require('./routes/labels');
const rolesRouter = require('./routes/roles');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

// tell express which router to use based on endpoint
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/issues', issuesRouter);
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/labels', labelsRouter);
app.use('/api/v1/roles', rolesRouter);

// load passport strategies
const localLoginStrategy = require('./passport/local-login')
passport.use('local-login', localLoginStrategy)

module.exports = app;