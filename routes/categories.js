const router = require('express').Router();
let pageData = require('../models/page-data');
let categoriesData = require('../models/categories-data');
let categoryBooksData = require('../models/category-books-data');
const storage = require('node-sessionstorage');

router.get('/', function(req, res, next){
    if(storage.getItem('loggedIn') === true){
        categoriesData().then(function(resp){
            categories = resp;
    
            console.log(categories)
    
            res.render('partials/categories', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.categories_data.page_slug,
                categoriesHeading: pageData.categories_data.heading,
                categoriesList: categories,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
          },function(err){
            let result = [];
        
            res.render('partials/categories', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.categories_data.page_slug,
                categoriesHeading: pageData.categories_data.heading,
                categoriesList: result,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
        });
    }
    else
        res.redirect('http://localhost:3000/login');
});

router.get('/:type', function(req, res, next){
    if(storage.getItem('loggedIn') === true){
        let categoryType = req.params.type;

        categoryBooksData(categoryType).then(function(resp){
            books = resp;

            console.log(books);
            console.log(books.length);

            if(books.length != 0){
                res.render('partials/category-books', {
                    title: pageData.header_footer_data.title, 
                    copyrightText: pageData.header_footer_data.copyright_text,
                    imgSource: pageData.header_footer_data.img_src,
                    pageSlug: pageData.categories_data.page_slug,
                    categoriesHeading: categoryType,
                    books,
                    names: pageData.contact_data.names,
                    emails: pageData.contact_data.emails
                }); 
            }
            else{
                res.render('partials/book-error', {
                    title: pageData.categories_error_data.title, 
                    copyrightText: pageData.header_footer_data.copyright_text,
                    imgSource: pageData.header_footer_data.img_src,
                    pageSlug: '',
                    bodyData: pageData.categories_error_data.body,
                    names: pageData.contact_data.names,
                    emails: pageData.contact_data.emails
                }); 
            }

        },function(err){
            books = [];

            res.render('partials/category-books', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.categories_data.page_slug,
                categoriesHeading: categoryType,
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