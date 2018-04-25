'use strict';

const cors = require ('cors');
const pg = require('pg');
const express = require('express');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
// const conString = 'postgres://localhost:5432/books_app';
// console.log(process.env.DATABASE_URL);
// console.log(process.env.CLIENT_URL);

// const client = new pg.Client(conString);
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));


// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.static('./book-list-client'));
app.use(cors());




// app.get('/test', (req,res) => res.send('hello world'));
app.get('/api/v1/books', (req,res) => {
  client.query('SELECT * FROM books')
  .then(results => res.send(results.rows))
  .catch(console.error);
})

app.get('*', (req,res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// function loadBooks() {
//   client.query('SELECT COUNT(*) FROM books')
//     .then(result => {
//       if(!parseInt(result.rows[0].count)) {
//         fs.readFile('./book-list-client/data/books.json', 'utf8', (err, fd) => {
//           JSON.parse(fd).forEach(ele => {
//             client.query(`
//             INSERT INTO
//             books(title, author, isbn, image_url, description)
//            VALUES
//           `,
//             [ele.title, ele.author, ele.isbn, ele.image_url, ele.description]
//             )
//               .catch(console.error);
//           })
//         })
//       }
//     })
// } 
// loadBooks();