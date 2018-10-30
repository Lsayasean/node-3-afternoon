const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const midWare = require('./middlewares/checkForSession');
const controller = require('../server/controllers/swag_controller');
const auth = require('../server/controllers/auth_controllers');
const cart = require('../server/controllers/cart_controller');
const search = require('../server/controllers/search_controller');

const {SESSION_SECRET, SERVER_PORT} = process.env;

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// app.use(checkSession);
app.use(express.static(`${__dirname}/build`))


app.use(midWare.checkSession)


//swag
app.get('/api/swag', controller.read)


//auth
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)


//cart
app.post('/api/cart', cart.add)
app.post('/api/cart/checkout', cart.checkout)
app.delete('/api/cart', cart.delete)


//search
app.get('/api/search', search.search)



app.listen(SERVER_PORT, () => {
    console.log('Welcome Amon', SERVER_PORT)
})