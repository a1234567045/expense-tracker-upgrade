const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
// 字串轉換函數
const stringTransform = require('./stringTransform')
// 分類
router.get('/', (req, res) => {
  let totalAmount = 0
  let filteredCategory = req.query.filter
  if (filteredCategory === '') {
    Record.find()
      .lean()
      .sort({ name: 'asc' })
      .then((records) => {
        for (let i = 0; i < records.length; i++) {
          totalAmount += Number(records[i].amount)
          records[i].category = stringTransform.categoryToIcon(records[i].category)
        }
        res.render('index', { records, totalAmount, filteredCategory })
      })
      .catch(error => console.error(error))
  } else {
    Record.find({ category: filteredCategory })
      .lean()
      .sort({ name: 'asc' })
      .then((records) => {
        for (let i = 0; i < records.length; i++) {
          totalAmount += Number(records[i].amount)
          records[i].category = stringTransform.categoryToIcon(records[i].category)
        }
        res.render('index', { records, totalAmount, filteredCategory })
      })
      .catch(error => console.error(error))
  }
})
module.exports = router