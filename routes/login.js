var express = require('express');
var router = express.Router();
let pageData = require('../models/page-data');
let loginData = require('../models/login-data');
const storage = require('node-sessionstorage');

/* GET contact us page. */
router.get('/', function(req, res, next) {
  storage.setItem('loggedIn', false); 

  res.render('partials/login', {
    title: pageData.header_footer_data.title,
    imgSource: pageData.header_footer_data.img_src,
    copyrightText: pageData.header_footer_data.copyright_text,
    names: pageData.contact_data.names,
    emails: pageData.contact_data.emails
  });
});

router.post('/', function(req, res, next){
  storage.setItem('loggedIn', false); 

  let rb = req.body;

  let errorData = {
    status: 0,
    field: 0,
    msg: ''   
  };
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if(typeof rb.user_email === 'undefined' || rb.user_email == null || rb.user_email == '' || !regex.test(rb.user_email)){
    errorData = {
      status: 1,
      field: 1,
      msg: 'Please enter a valid email!'   
    }

    res.render('partials/login', {
      title: pageData.header_footer_data.title,
      imgSource: pageData.header_footer_data.img_src,
      copyrightText: pageData.header_footer_data.copyright_text,
      logo: pageData.header_footer_data.img_src,
      formSubmissionStatus: errorData,
      formSubmissionData: {
        user_email: errorData.status == 1 ? rb.user_email : '',
        user_pass: errorData.status == 1 ? rb.user_pass : '',
      },
      names: pageData.contact_data.names,
      emails: pageData.contact_data.emails
    });
  }
  else if(typeof rb.user_pass === 'undefined' || rb.user_pass == null || rb.user_pass == '' || rb.user_pass.length > 20){
    errorData = {
      status: 1,
      field: 2,
      msg: 'Please enter a correct password!'   
    }

    res.render('partials/login', {
      title: pageData.header_footer_data.title,
      imgSource: pageData.header_footer_data.img_src,
      copyrightText: pageData.header_footer_data.copyright_text,
      logo: pageData.header_footer_data.img_src,
      formSubmissionStatus: errorData,
      formSubmissionData: {
        user_email: errorData.status == 1 ? rb.user_email : '',
        user_pass: errorData.status == 1 ? rb.user_pass : '',
      },
      names: pageData.contact_data.names,
      emails: pageData.contact_data.emails
    });
  }
  else{
    loginData(rb.user_email, rb.user_pass).then(function(result){
      if(result[0].count != 0){
        storage.setItem('loggedIn', true);
        console.log('loginpage:', storage.getItem('loggedIn'));
        res.redirect('http://localhost:3000');
      }
      else{
        let newUserMsg = 'User not found!!!';

        res.render('partials/login', {
          title: pageData.header_footer_data.title,
          imgSource: pageData.header_footer_data.img_src,
          copyrightText: pageData.header_footer_data.copyright_text,
          logo: pageData.header_footer_data.img_src,
          formSubmissionStatus: errorData,
          formSubmissionData: {
            user_email: errorData.status == 1 ? rb.user_email : '',
            user_pass: errorData.status == 1 ? rb.user_pass : '',
          },
          names: pageData.contact_data.names,
          emails: pageData.contact_data.emails,
          newUserMsg
        });
      }
        
    }, function(err){
      res.redirect('http://localhost:3000/login');
    });
  }
});

module.exports = router;
