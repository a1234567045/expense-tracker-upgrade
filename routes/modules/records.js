const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
// 字串轉換函數
const stringTransform = require('./stringTransform')

//新增支出
router.get('/new', (req, res) => {
  return res.render('new')
})


router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, amount, merchant } = req.body
  return Record.create({ name, category, date, amount, merchant, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//編輯支出
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})


router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      Object.assign(record, { name, category, date, amount, merchant })
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除支出
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router