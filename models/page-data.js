let page_data = {
    'header_footer_data': {
        title: 'Book Attic',
        img_src: 'http://localhost:3000/images/Logo.png',
        copyright_text: `&copy; Copyrights | All Rights Reserved | ${new Date().getFullYear()}`
    },
    'home_page_data': {
        page_slug: 'home',
    },
    'books_page_data': {
        page_slug: 'books',
        heading: 'Books List',
    },
    'books_error_data':{
        title: 'Book Not Available',
        body: '<p>Book does not exist!!!</p><p>Redirecting to home page in 5 seconds...</p>',
    },
    'categories_data':{
        page_slug: 'categories',
        heading: 'Categories List',
    },
    'categories_error_data':{
        title: 'Books Not Available',
        body: '<p>There are no books present under this category!!!</p><p>Redirecting to home page in 5 seconds...</p>',
    },
    'contact_data':{
        heading: 'Contact Us',
        names: ['Arideep Nandi', 'Bikram Sarkar', 'Fatema Shakir', 'Kislay Kumar', 'Malovika Sinha'],
        emails: ['nandiarideep@gmail.com', 'bikramsarkar514@gmail.com', 'ftmskr0803@gmail.com', 'kislay47.kk@gmail.com', 'malovikasinha521@gmail.com']
    },
    'about_data':{
        page_slug: 'about',
    },
    'authors_data':{
        page_slug: 'authors',
        heading: 'Authors List',
    },
    'authors_error_data':{
        title: 'Books Not Available',
        body: '<p>There are no books present written by this author!!!</p><p>Redirecting to home page in 5 seconds...</p>',
    },
    'search_error_data':{
        title: 'Books Not Available',
        body: '<p>There are no books containing these keywords!!!</p><p>Redirecting to home page in 5 seconds...</p>',
    }
} 

module.exports = page_data;