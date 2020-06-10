const express = require('express')
const passport = require('passport')
const router = express.Router();


//auth login
router.get('/login',(req,res)=>{
    res.render('login');
})

//logout
router.get('/logout',(req,res)=>{
    //handle with passport
    req.logout();
    res.redirect('/')

})

//auth with google
router.get('/google',passport.authenticate('google',{
    scope : ['profile']
}));

//auth redirect for google
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile')
})

module.exports = router;