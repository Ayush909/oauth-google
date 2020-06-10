const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model')
require('dotenv/config')


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
        .then((user)=>{
            done(null,user);
        });
});


passport.use(
    new GoogleStrategy({
    //options for google strategy
    callbackURL : '/auth/google/redirect',
    clientID : process.env.googleClientID,
    clientSecret : process.env.googleSecretKey
},(accessToken,refreshToken,profile,done) => {
    //check if user already exists

    User.findOne({googleId : profile.id})
        .then((currentUser)=>{
            if(currentUser){
                console.log('user is: '+ currentUser);
                done(null,currentUser)
            }else{
                new User({
                    username : profile.displayName,
                    googleId : profile.id
                }).save()
                .then((newUser)=>{
                    console.log('new user created: '+ newUser)
                    done(null,newUser)
                })
            }
        })

    
   })
)