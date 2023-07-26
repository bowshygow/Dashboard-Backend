// backend/controllers/transporterController.js

const Transporter = require('../models/Transporter');
const Message = require('../models/Message');

// Controller function to register a new Transporter
const registerTransporter = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the transporter with the same username already exists
    const existingTransporter = await Transporter.findOne({ username });
    if (existingTransporter) {
      return res.status(400).json({ message: 'Transporter with this username already exists.' });
    }

    // Create a new Transporter instance
    const transporter = new Transporter({
      username,
      password,
    });

    // Save the transporter to the database
    await transporter.save();

    res.status(201).json({ message: 'Transporter registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while registering Transporter.', error: error.message });
  }
};

// Controller function for the Transporter to reply to a message from a Manufacturer
const replyToMessage = async (req, res) => {
  try {
    const { orderId, price } = req.body;
    // Find the message in the database based on orderId
    const message = await Message.findOne({ order_id: orderId });
    if (!message) {
      return res.status(404).json({ message: 'Message with this Order ID not found.' });
    }

    // Update the message with the transporter's reply
    message.price = price;
    await message.save();

    res.status(200).json({ message: 'Reply sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while sending the reply.', error: error.message });
  }
};

// Controller function to get all messages received by the Transporter
const getTransporterMessages = async (req, res) => {
  try {
    // Find all messages where the "to" field matches the Transporter's username
    const transporterUsername = req.params.username;
    const messages = await Message.find({ to: transporterUsername });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching messages.', error: error.message });
  }
};

module.exports = {
  registerTransporter,
  replyToMessage,
  getTransporterMessages,
};
