const mongoose = require('mongoose')
const Record = require('../record') // 載入 record model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(
    {
      "name": "早餐",
      "category": "consumption",
      "date": "2021/4/6",
      "amount": "50",
    }, {
    "name": "捷運",
    "category": "transportation",
    "date": "2021/4/6",
    "amount": "50",
  }, {
    "name": "晚餐",
    "category": "consumption",
    "date": "2021/4/6",
    "amount": "380",
  }, {
    "name": "電影",
    "category": "entertainment",
    "date": "2021/4/8",
    "amount": "520",
  }, {
    "name": "湯姆熊",
    "category": "entertainment",
    "date": "2021/4/8",
    "amount": "300",
  }, {
    "name": "租金",
    "category": "housewares",
    "date": "2021/4/9",
    "amount": "12000",
  }, {
    "name": "水電費",
    "category": "housewares",
    "date": "2021/4/9",
    "amount": "2100",
  }, {
    "name": "貓飼料",
    "category": "others",
    "date": "2021/4/11",
    "amount": "880",
  }, {
    "name": "買口罩",
    "category": "others",
    "date": "2021/4/12",
    "amount": "90",
  })
  console.log('done')
})