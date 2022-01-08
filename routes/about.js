var express = require('express');
var router = express.Router();
let pageData = require('../models/page-data');
const storage = require('node-sessionstorage');

/* GET about page. */
router.get('/', function(req, res, next) {
  if(storage.getItem('loggedIn') === true){
    res.render('partials/about', { 
      title: pageData.header_footer_data.title, 
      copyrightText: pageData.header_footer_data.copyright_text,
      imgSource: pageData.header_footer_data.img_src,
      pageSlug: pageData.about_data.page_slug,
      names: pageData.contact_data.names,
      emails: pageData.contact_data.emails,
    });
  }
  else
    res.redirect('http://localhost:3000/login');
});

module.exports = router;

