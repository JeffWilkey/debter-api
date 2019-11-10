const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
  debt: { type: mongoose.Types.ObjectId, ref: 'Debt' },
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
