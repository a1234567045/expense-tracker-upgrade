const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
// 字串轉換函數
const stringTransform = require('./stringTransform')

//新增支出
router.get('/new', (req, res) => {
  return res.render('new')
})


router.post('/', (req, res) => {
  const reqbody = req.body
  return Record.create(reqbody)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//編輯支出
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})


router.put('/:id', (req, res) => {
  const id = req.params.id
  const reqbody = req.body
  return Record.findById(id)
    .then(record => {
      Object.assign(record, reqbody)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除支出
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router