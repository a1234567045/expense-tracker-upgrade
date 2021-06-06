require('../../config/mongoose')
// 載入資料
const Record = require('../record')
const recordList = require('./record.json')
const db = require('../../config/mongoose')
//連線成功
db.once('open', () => {
  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      category: recordList[i].category,
      date: recordList[i].date,
      amount: recordList[i].amount
    })
  }
  console.log('Seeder create')
})