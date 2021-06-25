require('../../config/mongoose')
// 載入資料
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const recordList = require('./record.json')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
//連線成功
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: recordList.length },
        (_, i) => Record.create({
          name: recordList[i].name,
          category: recordList[i].category,
          date: recordList[i].date,
          amount: recordList[i].amount,
          userId
        })
      ))
    })
    // for (let i = 0; i < recordList.length; i++) {
    //   Record.create({
    //     name: recordList[i].name,
    //     category: recordList[i].category,
    //     date: recordList[i].date,
    //     amount: recordList[i].amount,
    //     userId
    //   })
    // }
    .then(() => {
      console.log('done.')
      process.exit()
    })
})