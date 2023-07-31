// backend/controllers/manufacturerController.js

const Manufacturer = require('../models/Manufacturer');
const Message = require('../models/Message');

// Create an order for the Manufacturer
async function createManufacturerOrder(req, res) {
  const { order_id, from, to, quantity, pickupAddress, transporter } = req.body;

  try {

    
    // Get the Manufacturer ID from the JWT token (assuming the token is already verified in middleware)
    const manufacturerName = req.body.username;
    console.log(req.body);

    // Create a new message to be sent to the Transporter
    const message = new Message({
      order_id,
      from,
      to,
      quantity,
      pickupAddress,
      transporter,
      sender: manufacturerName,
    });

    await message.save();

    res.status(201).json({ message: 'Order created successfully', data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the order' });
  }
}

// Get all orders for the Manufacturer
async function getManufacturerOrders(req, res) {
  try {
    // Get the Manufacturer ID from the JWT token (assuming the token is already verified in middleware)
    console.log(req.body);
    const manufacturerName = req.body.username;

    // Fetch all messages for the Manufacturer
    const messages = await Message.find({ sender: manufacturerName });

    res.status(200).json({ data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching orders' });
  }
}

module.exports = {
  createManufacturerOrder,
  getManufacturerOrders,
};
