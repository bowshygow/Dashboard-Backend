// backend/controllers/transporterController.js

const Message = require('../models/Message');

// Controller function for the Transporter to accept an order
const acceptOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    // Find the message in the database based on orderId
    const message = await Message.findOne({ order_id: orderId });
    if (!message) {
      return res.status(404).json({ message: 'Message with this Order ID not found.' });
    }

    // Check if the order has already been accepted
    if (message.accepted) {
      return res.status(400).json({ message: 'Order has already been accepted.' });
    }

    // Mark the order as accepted
    message.accepted = true;
    await message.save();

    res.status(200).json({ message: 'Order accepted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while accepting the order.', error: error.message });
  }
};

// Controller function to get all orders assigned to the Transporter
const getTransporterOrders = async (req, res) => {
  try {
    // Get the Transporter's username from the JWT token (assuming the token is already verified in middleware)
    const transporterUsername = req.user.username;

    // Fetch all messages where the "transporter" field matches the Transporter's username
    const messages = await Message.find({ transporter: transporterUsername });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching transporter orders.', error: error.message });
  }
};

module.exports = {
  acceptOrder,
  getTransporterOrders,
};
