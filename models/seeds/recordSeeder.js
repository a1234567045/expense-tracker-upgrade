require('../../config/mongoose')
const Record = require('../record') // 載入 record model
const recordList = require('./record.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < recordList.length; i++) {
    Record.create({
      name: recordList[i].name,
      category: recordList[i].category,
      date: recordList[i].date,
      amount: recordList[i].amount
    })
  }
  console.log('done')
})