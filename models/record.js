const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  merchant: { type: String },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)