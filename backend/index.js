const express = require('express')
const cors = require('cors');
require('dotenv').config()
const todoPath = require('./routes/todo')
const connectionToDB = require('./config/connectToDb')

// Init app
const app = express();

//Connect to DB
connectionToDB()


app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}));

app.use(todoPath)


const port = process.env.PORT || 3000;
app.listen( port , () => { console.log(`Server is runing on port ${port}`)})