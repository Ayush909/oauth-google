const express = require('express');
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-router')
const app = express();
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
require('dotenv/config')

//set up view engine
app.set('view engine', 'ejs');

//cookie-session
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys : [process.env.COOKIE_KEY]
}))


//passport intialize
app.use(passport.initialize());
app.use(passport.session());


//mongodb connection
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log('DB connected')
})

//setup routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

//set home route
app.get('/',(req,res)=>{
    res.render('home')
})


app.listen(3000,()=>{
    console.log('server running on port 3000')
})

