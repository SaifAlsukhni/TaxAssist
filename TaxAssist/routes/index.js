const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let options = { projectName: 'TaxAssist', layout: 'layout', styles: ['/stylesheets/stylesheet.css', '/stylesheets/style.css'] }
  res.render('index', options);
});

module.exports = router;
