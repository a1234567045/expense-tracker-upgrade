// 載入 express
const express = require('express')
// express-handlebars
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    eq: function (a, b) {
      return a === b
    }
  }
})

//Port
const PORT = process.env.PORT || 3000
//mongoose
require('./config/mongoose')
// body-parser
const bodyParser = require('body-parser')
// method-override
const methodOverride = require('method-override')

// routes
const routes = require('./routes')
const app = express()

// setting static files
app.use(express.static('public'))

// setting engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// method-override
app.use(methodOverride('_method'))
// routes
app.use(routes)




app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})

