const express = require('express')
const app = express()
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const route = require('./routes')
const authJwt = require('./helpers/authHelper')
const path = require('path')

require('dotenv/config')
const port = process.env.PORT || 3001

app.use(cors())
app.options('*', cors())

// midderwares
app.use(logger('tiny'))
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// app.use(authJwt())
app.use('/public/uploads',express.static(__dirname + '/public/uploads'))

route(app)


// catch 404 error
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// err handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // res to clients
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

mongoose.connect(process.env.CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('👍 connect success')
})
.catch(() => {
    console.error('❌ connect fail')
})

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`)
})