const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
// 字串轉換函數
const stringTransform = require('./stringTransform')
const dateFormat = require('./stringTransform')
const checkDate = require('../../middleware/checkdate')
// 分類

router.get('/', checkDate, (req, res) => {
  const errors = res.locals.errors
  let totalAmount = 0
  const userId = req.user._id
  const filteredCategory = req.query.filter || ''
  const startDate = req.query.startDate || ''
  const endDate = req.query.endDate || ''
  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const recordList = []
      if (startDate && endDate) {
        if (filteredCategory === '') {
          recordList.push(...records.filter(record => { return record.date >= new Date(startDate) && record.date <= new Date(endDate) }))
        } else {
          recordList.push(...records.filter(record => { return record.date >= new Date(startDate) && record.date <= new Date(endDate) && record.category === filteredCategory }))
        }
      } else {
        if (filteredCategory === '') {
          recordList.push(...records)
        } else {
          recordList.push(...records.filter(record => { return record.category === filteredCategory }))
        }
        if ((startDate && !endDate) || (!startDate && endDate)) {
          errors.push({ message: '起訖時間皆須填寫。' })
        }
      }
      for (let i = 0; i < recordList.length; i++) {
        totalAmount += Number(recordList[i].amount)
        recordList[i].category = stringTransform.categoryToIcon(recordList[i].category)
      }
      res.render('index', { recordList, totalAmount, filteredCategory, startDate, endDate, errors })
    })
})






// router.get('/', (req, res) => {
//   const userId = req.user._id
//   let totalAmount = 0
//   let filteredCategory = req.query.filter
//   if (filteredCategory === '') {
//     Record.find({ userId })
//       .lean()
//       .sort({ name: 'asc' })
//       .then((records) => {
//         for (let i = 0; i < records.length; i++) {
//           totalAmount += Number(records[i].amount)
//           records[i].category = stringTransform.categoryToIcon(records[i].category)
//         }
//         res.render('index', { records, totalAmount, filteredCategory })
//       })
//       .catch(error => console.error(error))
//   } else {
//     Record.find({ userId, category: filteredCategory })
//       .lean()
//       .sort({ name: 'asc' })
//       .then((records) => {
//         for (let i = 0; i < records.length; i++) {
//           totalAmount += Number(records[i].amount)
//           records[i].category = stringTransform.categoryToIcon(records[i].category)
//         }
//         res.render('index', { records, totalAmount, filteredCategory })
//       })
//        .catch(error => console.error(error))
//    }
//  })
module.exports = router