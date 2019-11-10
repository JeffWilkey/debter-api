const express = require('express')
const Debt = require('../models/debt')
const Payment = require('../models/payment')
const router = express.Router()

// get debts
router.get('/debts', (req, res) => {
  Debt.find({}).populate('payments').then(debts => {
    res.status(200).json(debts)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// create debt
router.post('/debts', (req, res) => {
  Debt.create(req.body).then(debt => {
    res.status(201).json(debt)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// delete debt
router.delete('/debts/:id', (req, res) => {
  Debt.deleteOne({ _id: req.params.id }).then(err => {
    if (err) res.status(500).json(err)
    else res.sendStatus(204)
  })
})

// create payment
router.post('/payments', (req, res) => {
  Payment.create(req.body).then(payment => {
    res.status(201).json(payment)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// update payment
router.put('/payments/:id', (req, res) => {
  Payment.updateOne({ _id: req.params.id }, req.body).then(payment => {
    res.status(200).json(payment)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// delete payment
router.delete('/payments/:id', (req, res) => {
  Payment.deleteOne({ _id: req.params.id }).then(err => {
    if (err) res.status(500).json(err)
    else res.sendStatus(204)
  })
})

module.exports = router
