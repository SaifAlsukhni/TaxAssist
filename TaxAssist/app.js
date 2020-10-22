const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const http = require('http')
const hbs = require('express-handlebars')

const InMemoryTaxesStore = require('./models/taxes-memory').InMemoryTaxesStore
let taxesStore = new InMemoryTaxesStore()
exports.taxesStore = taxesStore

const appsupport = require('./appsupport')
const indexRouter = require('./routes/index')
const taxesRouter = require('./routes/taxes')

const app = express()
exports.app = app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs( {
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/assets/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')))
app.use('/assets/vendor/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')))
app.use('/assets/vendor/popper.js', express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')))
app.use('/assets/vendor/feather-icons', express.static(path.join(__dirname, 'node_modules', 'feather-icons', 'dist')))

//Router function lists
app.use('/', indexRouter)
app.use('/taxes', taxesRouter)

//Error handlers
app.use(appsupport.basicErrorHandler)
app.use(appsupport.handle484)

const port = appsupport.normalizePort(process.env.PORT || '3000')
exports.port = port
app.set('port', port)

const server = http.createServer(app);
exports.server = server
server.listen(port);
server.on('error', appsupport.onError);
server.on('listening', appsupport.onListening);


