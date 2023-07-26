// backend/models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  quantity: { type: String, enum: ['1', '2', '3'], required: true }, // Using enum for fixed values
  pickupAddress: { type: String, required: true },
  transporter: { type: mongoose.Schema.Types.ObjectId, ref: 'Transporter' }, // Reference to the Transporter model
  sender: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to either Manufacturer or Transporter model
  price: { type: Number }, // Optional field for price if Transporter accepts the order
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
