const router = require('express').Router();
let pageData = require('../models/page-data');
let booksData = require('../models/books-data');
let bookDetailsData = require('../models/book-details-data');
let searchData = require('../models/search-data');
const storage = require('node-sessionstorage');

router.get('/', function(req, res, next){
    if(storage.getItem('loggedIn') === true){
        booksData().then(function(resp){
            books = resp;
    
            res.render('partials/books', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.books_page_data.page_slug,
                booksHeading: pageData.books_page_data.heading,
                booksList: books,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
          },function(err){
            let result = [];
        
            res.render('partials/books', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.page_data.page_slug,
                booksHeading: pageData.books_page_data.heading,
                booksList: result,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
        });
    }
    else
        res.redirect('http://localhost:3000/login');
});

router.get('/:id', function(req, res, next){
    if(storage.getItem('loggedIn') === true){
        let bookId = req.params.id;

        bookDetailsData(bookId).then(function(resp){
            book = resp;

            console.log(book);

            authors = [];
            categories = [];

            for(author of book){
                if (authors.indexOf(author.name) == -1 ) 
                    authors.push(author.name);
            }

            for(category of book){
                if (categories.indexOf(category.type) == -1 ) 
                    categories.push(category.type);
            }

            if(book.length === 0){
                res.render('partials/book-error', {
                    title: pageData.books_error_data.title,
                    copyrightText: pageData.header_footer_data.copyright_text,
                    imgSource: pageData.header_footer_data.img_src,
                    pageSlug: '',
                    bodyData: pageData.books_error_data.body,
                    names: pageData.contact_data.names,
                    emails: pageData.contact_data.emails
                });
            }
            else{
                res.render('partials/book-details', {
                    title: pageData.header_footer_data.title,
                    copyrightText: pageData.header_footer_data.copyright_text,
                    imgSource: pageData.header_footer_data.img_src,
                    pageSlug: pageData.books_page_data.page_slug,
                    book,
                    authors,
                    categories,
                    names: pageData.contact_data.names,
                    emails: pageData.contact_data.emails
                });
            }
        },function(err){
            book = [];

            res.render('partials/book-details', {
                title: pageData.header_footer_data.title,
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.books_page_data.page_slug,
                book,
                authors,
                categories,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
        });
    }
    else
        res.redirect('http://localhost:3000/login');
});

router.post('/', function(req, res, next){
    let rb = req.body;

    if(rb.value === 'undefined'){
        booksData().then(function(resp){
            books = resp;
    
            res.render('partials/books', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.books_page_data.page_slug,
                booksHeading: pageData.books_page_data.heading,
                booksList: books,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
          },function(err){
            let result = [];
        
            res.render('partials/books', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.books_page_data.page_slug,
                booksHeading: pageData.books_page_data.heading,
                booksList: result,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
        });
    }
    else{
        searchData(rb.value).then(function(resp){
            books = resp;
    
            console.log(books);

            if(books.length != 0){
                res.render('partials/books', {
                    title: pageData.header_footer_data.title, 
                    copyrightText: pageData.header_footer_data.copyright_text,
                    imgSource: pageData.header_footer_data.img_src,
                    pageSlug: pageData.books_page_data.page_slug,
                    booksHeading: pageData.books_page_data.heading,
                    booksList: books,
                    names: pageData.contact_data.names,
                    emails: pageData.contact_data.emails
                });
            }
            else{
                res.render('partials/book-error', {
                    title: pageData.books_error_data.title,
                    copyrightText: pageData.header_footer_data.copyright_text,
                    imgSource: pageData.header_footer_data.img_src,
                    pageSlug: '',
                    bodyData: pageData.search_error_data.body,
                    names: pageData.contact_data.names,
                    emails: pageData.contact_data.emails
                });
            }
          },function(err){
            let result = [];
        
            res.render('partials/books', {
                title: pageData.header_footer_data.title, 
                copyrightText: pageData.header_footer_data.copyright_text,
                imgSource: pageData.header_footer_data.img_src,
                pageSlug: pageData.books_page_data.page_slug,
                booksHeading: pageData.books_page_data.heading,
                booksList: result,
                names: pageData.contact_data.names,
                emails: pageData.contact_data.emails
            });
        });
    }
});

module.exports = router;