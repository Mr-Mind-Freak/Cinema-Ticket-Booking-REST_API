const mongoose = require('mongoose');

const databaseCon = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
    } catch (err) {
        console.log(err.stack);
    }
}

module.exports = databaseCon;