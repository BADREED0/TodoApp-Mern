const mongoose = require('mongoose')

const connectionToDB = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then( () => console.log( 'Connect to DB' ) )
        .catch( (err) => console.log(err) )
}

module.exports = connectionToDB

