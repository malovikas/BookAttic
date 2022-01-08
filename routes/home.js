var express = require('express');
var router = express.Router();
let pageData = require('../models/page-data');
let booksData = require('../models/books-data');
const storage = require('node-sessionstorage');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(storage.getItem('loggedIn') === true){
    booksData().then(function(resp){
      books = resp;
      
      res.render('partials/home', { 
        title: pageData.header_footer_data.title, 
        copyrightText: pageData.header_footer_data.copyright_text,
        imgSource: pageData.header_footer_data.img_src,
        pageSlug: pageData.home_page_data.page_slug,
        books,
        names: pageData.contact_data.names,
        emails: pageData.contact_data.emails
      });
    }, function(err){
    
      res.render('partials/home', { 
        title: pageData.header_footer_data.title, 
        copyrightText: pageData.header_footer_data.copyright_text,
        imgSource: pageData.header_footer_data.img_src,
        pageSlug: pageData.home_page_data.page_slug,
        books,
        names: pageData.contact_data.names,
        emails: pageData.contact_data.emails
      });
    });
  }
  else
    res.redirect('http://localhost:3000/login');
});

module.exports = router;

