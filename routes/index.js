var express = require('express');
var router = express.Router();

var github = require('octonode');
var arraySort = require('array-sort');

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {

  var client = github.client(req.user.accessToken);

  client.get('/user/following', {}, function (err, status, body, headers) {
    res.render('index', { user: req.user, body: arraySort(body, 'last_event') });
  });
});

router.get('/unfollow/:name', ensureAuthenticated, function (req, res, next) {

  var client = github.client(req.user.accessToken);
  var ghme = client.me();
  ghme.unfollow(req.params.name, function (response) {
    res.redirect('/');
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
