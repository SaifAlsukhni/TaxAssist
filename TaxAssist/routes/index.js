const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let options = { projectName: 'TaxAssist', layout: 'layout', styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css'] }
  res.render('index', options);
});

module.exports = router;
