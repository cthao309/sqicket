// require core npm modules
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')

// require the router modules
const assignmentsRouter = require('./routes/assignments')
const authRouter = require('./routes/auth')
const issuesRouter = require('./routes/issues')
const labelsRouter = require('./routes/labels')
const projectsRouter = require('./routes/projects')
const rolesRouter = require('./routes/roles')
const usersRouter = require('./routes/users')

const app = express()

// configure express
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

// load passport strategies
const localLoginStrategy = require('./passport/local-login')

passport.use('local-login', localLoginStrategy)

// allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Cache-Control')
  if (req.method === 'OPTIONS') {
    return res.end()
  }
  return next()
})

// authentication middleware
const authCheckMiddleware = require('./middleware/auth-check')

// tell express which router to use based on endpoint
app.use('/api/v1/assignments', authCheckMiddleware, assignmentsRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/issues', authCheckMiddleware, issuesRouter)
app.use('/api/v1/labels', authCheckMiddleware, labelsRouter)
app.use('/api/v1/projects', authCheckMiddleware, projectsRouter)
app.use('/api/v1/roles', authCheckMiddleware, rolesRouter)
app.use('/api/v1/users', authCheckMiddleware, usersRouter)

module.exports = app
