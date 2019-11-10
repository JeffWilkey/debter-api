const mongoose = require('mongoose')
const Schema = mongoose.Schema

const debtSchema = new Schema({
  amount: Number,
  to: String,
  payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
})

const Debt = mongoose.model('Debt', debtSchema)
module.exports = Debt
