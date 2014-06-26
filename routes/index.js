var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../config/passport')(passport); // pass passport for configuration

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Login page. */
router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') });
});

/* GET Signup page. */
router.get('/signup', function(req, res) {
  res.render('signup', { message: req.flash('signupMessage') });
});

/* POST Login page. */
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

/* POST Signup page. */
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

/* GET Profile page. */
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', { user : req.user /* get the user out of session and pass to template */ });
});

/* GET Logout page. */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
