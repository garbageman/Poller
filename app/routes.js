// routes.js
module.exports = function(app, passport) {

  /* GET home page. */
  app.get('/', function(req, res) {
    res.render('index', {});
  });

  /* GET Login page. */
  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  /* GET Signup page. */
  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') } );
  });

  /* POST Login page. */
  app.post('/login', passport.authenticate('local-login', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
  );

  /* POST Signup page. */
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  /* GET Profile page. */
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', { user : req.user /* get the user out of session and pass to template */ });
  });

  /* GET Logout page. */
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
