const mongoose = require('mongoose')
const Category = require('../category') // 載入 record model
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(
    {
      "name": "housewares",
      "name_cn": "家居物業",
      "iconClass": "fas fa-home"
    }, {
    "name": "transportation",
    "name_cn": "交通出行",
    "iconClass": "fas fa-shuttle-van"
  }, {
    "name": "entertainment",
    "name_cn": "休閒娛樂",
    "iconClass": "fas fa-grin-beam"
  }, {
    "name": "consumption",
    "name_cn": "餐飲食品",
    "iconClass": "fas fa-utensils"
  }, {
    "name": "others",
    "name_cn": "其他",
    "iconClass": "fas fa-pen"
  })
  console.log('done')
})

