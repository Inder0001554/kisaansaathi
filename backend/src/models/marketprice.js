import mongoose from 'mongoose';

const MarketPriceSchema = new mongoose.Schema({
  cropName: String,
  marketName: String,
  price: Number,
  unit: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);
