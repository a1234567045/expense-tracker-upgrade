const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

const stringTransform = require('./stringTransform')


router.get('/', (req, res) => {
  let filteredCategory = ''
  let totalAmount = 0
  Record.find()
    .lean()
    .sort({ _id: 'asc' }) // 根據 _id 升冪排序
    .then((records) => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += Number(records[i].amount)
        records[i].category = stringTransform.categoryToIcon(records[i].category)
      }
      res.render('index', { records, totalAmount, filteredCategory })
    })
    .catch(error => console.error(error))
})
module.exports = router
