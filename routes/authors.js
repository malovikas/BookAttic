const router = require('express').Router();
let pageData = require('../models/page-data');
let authorsData = require('../models/authors-data');
let authorBooksData = require('../models/author-books-data');
const storage = require('node-sessionstorage');

router.get('/', function(req, res, next){
    if(storage.getItem('loggedIn') === true){
        authorsData().then(function(resp){
            authors = resp;
    
            console.log(authors)
    
            res.render('partials/authors', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.authors_data.page_slug,
                authorsHeading: pageData.authors_data.heading,
                authorsList: authors,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
          },function(err){
            let result = [];
        
            res.render('partials/authors', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.authors_data.page_slug,
                authorsHeading: pageData.authors_data.heading,
                authorsList: result,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
        });
    }
    else
        res.redirect('http://localhost:3000/login');
});

router.get('/:name', function(req, res, next){
    if(storage.getItem('loggedIn') === true){
        let authorName = req.params.name;

        authorBooksData(authorName).then(function(resp){
            books = resp;
    
            console.log(books);
            console.log(books.length);
    
            if(books.length != 0){
                res.render('partials/author-books', {
                    title: pageData.header_footer_data.title, 
                    copyrightText: pageData.header_footer_data.copyright_text,
                    imgSource: pageData.header_footer_data.img_src,
                    pageSlug: pageData.authors_data.page_slug,
                    authorsHeading: authorName,
                    books,
                    names: pageData.contact_data.names,
                    emails: pageData.contact_data.emails
                }); 
            }
            else{
                res.render('partials/book-error', {
                    title: pageData.authors_error_data.title, 
                    copyrightText: pageData.header_footer_data.copyright_text,
                    imgSource: pageData.header_footer_data.img_src,
                    pageSlug: '',
                    bodyData: pageData.authors_error_data.body,
                    names: pageData.contact_data.names,
                    emails: pageData.contact_data.emails
                }); 
            }
    
        },function(err){
            books = [];
    
            res.render('partials/author-books', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.authors_data.page_slug,
                authorsHeading: authorName,
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