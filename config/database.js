const mongoose = require("mongoose")


let connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("Connected to Database"))
    .catch(()=> console.log('Failed to connect'))
}

module.exports = connectDB