var express = require('express');
var router = express.Router();
let pageData = require('../models/page-data');
let registerData = require('../models/register-data');

/* GET contact us page. */
router.get('/', function(req, res, next) {
  res.render('partials/register', {
    title: pageData.header_footer_data.title,
    copyrightText: pageData.header_footer_data.copyright_text,
    imgSource: pageData.header_footer_data.img_src,
    names: pageData.contact_data.names,
    emails: pageData.contact_data.emails
  });
});

router.post('/', function(req, res, next){
  let rb = req.body;
  let errorData = {
    status: 0,
    field: 0,
    msg: ''   
  };
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if(typeof rb.user_name === 'undefined' || rb.user_name == null || rb.user_name == '' || !/^[a-zA-Z ]+$/.test(rb.user_name)){
    errorData = {
      status: 1,
      field: 1,
      msg: 'Please enter a valid name!'   
    }

    res.render('partials/register', {
      title: pageData.header_footer_data.title,
      imgSource: pageData.header_footer_data.img_src,
      copyrightText: pageData.header_footer_data.copyright_text,
      logo: pageData.header_footer_data.img_src,
      formSubmissionStatus: errorData,
      formSubmissionData: {
        user_name: errorData.status == 1 ? rb.user_name : '',
        user_email: errorData.status == 1 ? rb.user_email : ''
      },
      names: pageData.contact_data.names,
      emails: pageData.contact_data.emails
    });
  }
  else if(typeof rb.user_email === 'undefined' || rb.user_email == null || rb.user_email == '' || !regex.test(rb.user_email)){
    errorData = {
      status: 1,
      field: 2,
      msg: 'Please enter a valid email!'   
    }

    res.render('partials/register', {
      title: pageData.header_footer_data.title,
      imgSource: pageData.header_footer_data.img_src,
      copyrightText: pageData.header_footer_data.copyright_text,
      logo: pageData.header_footer_data.img_src,
      formSubmissionStatus: errorData,
      formSubmissionData: {
        user_name: errorData.status == 1 ? rb.user_name : '',
        user_email: errorData.status == 1 ? rb.user_email : ''
      },
      names: pageData.contact_data.names,
      emails: pageData.contact_data.emails
    });
  }
  else if(typeof rb.user_pass === 'undefined' || rb.user_pass == null || rb.user_pass == ''|| rb.user_pass.length > 20){
    errorData = {
      status: 1,
      field: 3,
      msg: 'Please enter a password!'   
    }

    res.render('partials/register', {
      title: pageData.header_footer_data.title,
      imgSource: pageData.header_footer_data.img_src,
      copyrightText: pageData.header_footer_data.copyright_text,
      logo: pageData.header_footer_data.img_src,
      formSubmissionStatus: errorData,
      formSubmissionData: {
        user_name: errorData.status == 1 ? rb.user_name : '',
        user_email: errorData.status == 1 ? rb.user_email : ''
      },
      names: pageData.contact_data.names,
      emails: pageData.contact_data.emails
    });
  }
  else{
    registerData(rb.user_name, rb.user_email, rb.user_pass).then(function(result){
      res.redirect('http://localhost:3000/login');
    }, function(err){
      console.log(err);
      console.log(err.code);

      let error = err.code;

      res.render('partials/register', {
        title: pageData.header_footer_data.title,
        imgSource: pageData.header_footer_data.img_src,
        copyrightText: pageData.header_footer_data.copyright_text,
        logo: pageData.header_footer_data.img_src,
        formSubmissionStatus: errorData,
        formSubmissionData: {
          user_name: errorData.status == 1 ? rb.user_name : '',
          user_email: errorData.status == 1 ? rb.user_email : ''
        },
        names: pageData.contact_data.names,
        emails: pageData.contact_data.emails,
        error
      });
    });
  }
});

module.exports = router;
