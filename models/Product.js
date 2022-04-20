const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startingBid: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bidStart: {
    type: Date,
    default: Date.now
  },
  bidEnd: {
    type: Date,
    required: true
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  },
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  },
  bids: [
    {
        bidder: { type: mongoose.Schema.ObjectId, ref: 'users' },
        bid: { type: Number, required: true },
        time: { type: Date, default: Date.now }
    }
  ]
})

module.exports = mongoose.model('Product', ProductSchema);