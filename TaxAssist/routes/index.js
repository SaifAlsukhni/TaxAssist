const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  let projectName = 'TaxAssist'
  let options = { title: projectName, layout: 'layout', styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css'] }
  res.render('index', options);
});

module.exports = router;
