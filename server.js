const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()

// require modules
const connectDb = require('./utils/connectDb.js');
const errorHandler = require('./middlewares/errorHandler.js')
const goalRoutes = require('./routes/goalsRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan())

app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler) // final middleWare function.

try {
    connectDb()
} catch (error) {
    console.error('there was an error connecting to the database', error);
}

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
})

app.on('error', (error) => {
    console.error(error);
})