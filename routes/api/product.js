const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys');
// Load product model
const Product = require('../../models/Product');
// Load user model
const User = require('../../models/User');
//Load input validation function
const validateProductInput = require('../../Validator/product');
const validateBidInput = require('../../Validator/bid');

// @route   POST api/product
// @desc    Create product
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProductInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
      // Get fields
      const productFields = {};

      if (req.body.title) productFields.itemName = req.body.title;
      if (req.body.description) productFields.description = req.body.description;
      if (req.body.price) productFields.startingBid = req.body.price;
      if (req.body.to) productFields.bidEnd = req.body.to;
      productFields.seller = req.user.id;

      new Product(productFields).save().then(product => res.json(product));
  }
);

// @route     /api/product/all
// @desc      show all products
// @access    public
router.get('/all', (req, res) => {
  Product.find(
      { bidEnd: { $lte: new Date() } },
    )
    .then(products => {
      // console.log(products);

      products.forEach(product => {
        var tmp;
        var bidder;
        if (product.bids.length) {
          tmp = product.bids[0].bid;
          bidder = product.bids[0].bidder;
        }
        product.bids.forEach(bid => {
          if (tmp > bid.bid) {
            tmp = bid.bid;
            bidder = bid.bidder;
          }
        });
        product.buyer = bidder;
        product.save();
      });
      
    });
    
  Product.find()
    .populate('seller', '_id name avatar email')
    .populate('buyer', '_id name avatar email')
    .populate('bids.bidder', '_id name avatar email')
    .then(products => {
      if (!products) {
        errors.noproduct = 'There are no products';
        res.status(400).json({ msg: 'There are no products' });
      }
      res.json(products);
    });
});

// @route     /api/product/:id
// @desc      get profile by handle (GET)
// @access    public
router.get('/:id', (req, res) => {
  const errors = {};

  Product.findOne(
      { _id: req.params.id }  
    )
    .populate('seller', '_id name avatar email')
    .populate('buyer', '_id name avatar email')
    .populate('bids.bidder', '_id name avatar email')
    .then(product => {
      if (!product) {
        errors.noproduct = 'There is no product';
        res.status(404).json(errors);
      }

      res.json(product);
    })
    .catch(err => res.status(404).json(err));
});

// @route     /api/product/bidProduct
// @desc      update product buyer (POST)
// @access    private
router.post('/bidProduct', (req, res) => {
  const { errors, isValid } = validateBidInput(req.body);
  
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Product.findOne(
      { _id: req.body.id }
    )
    .then(product => {
      const newBid = {
        bidder: req.body.bidder,
        bid: req.body.bid
      }

      product.bids.unshift(newBid);
      product.save().then(product => res.json(product));
    })
    .catch(err =>
        res.status(400).json(err)
      );
});

module.exports = router;