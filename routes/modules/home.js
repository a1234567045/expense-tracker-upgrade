const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
// 字串轉換函數
const stringTransform = require('./stringTransform')

// 設定首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  let filteredCategory = ''
  let totalAmount = 0
  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' }) // 根據 _id 升冪排序
    .then((recordList) => {
      for (let i = 0; i < recordList.length; i++) {
        totalAmount += Number(recordList[i].amount)
        recordList[i].category = stringTransform.categoryToIcon(recordList[i].category)
      }
      res.render('index', { recordList, totalAmount, filteredCategory })
    })
    .catch(error => console.error(error))
})
module.exports = router
