const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

//Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const postRoutes = require('./routes/post')
const websiteRoutes = require('./routes/website')

//Create Serverr
const app = express()
const http = require('http').createServer(app)
// Db connection
mongoose
	.connect(process.env.DB_URL)
	.then(() => console.log('DB connected'))
	.catch((err) => console.log('Error econnecting to database ', err))

// middlewares
app.use(express.json({ limit: '4mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

// route middlewares
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/post', postRoutes)
app.use('/', websiteRoutes)

const port = process.env.PORT || 8000

http.listen(port, () => console.log('Server running on port ::', port))
