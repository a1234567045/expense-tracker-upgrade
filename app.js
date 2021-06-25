const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
require('./config/mongoose')

const usePassport = require('./config/passport')
const routes = require('./routes')
const PORT = process.env.PORT
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    eq: function (a, b) {
      return a === b
    }, toString(date) {
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    }
  }
})

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})

