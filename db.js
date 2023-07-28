const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://bowshygowtham:PCO3FO1mJ0H79543@cluster0.ifuynje.mongodb.net/?retryWrites=true&w=majority'; // Change this URI to your MongoDB database URL
mongoose.connect(MONGODB_URI).then(console.log("DB connected")).catch(console.error);


module.export =  mongoose;