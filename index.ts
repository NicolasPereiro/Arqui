import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

interface Book {
  title: string,
  author: string,
  date: string
}

app.get('/', (req, res) => {
  res.send('Servidor de libros');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

let books: Book[] = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const newBook: Book = req.body;
  console.log(req.body);
  books.push(newBook);
  res.statusCode = 201;
  res.json(req.body);
});

app.delete('/books', (req, res) => {
  let bookDeleted = false;
  for(let i=0; i<books.length; i++){
    if(books[i].title === req.body.title){
      bookDeleted = true;
      books.splice(i, 1);
      res.statusCode = 200;
      res.json("Book deleted");
    }
  }
  if (!bookDeleted){
    res.statusCode = 404;
    res.json("Book not found");
  }
});

app.put('/books', (req, res) => {
  let bookUpdated = false;
  for(let i=0; i<books.length; i++){
    if(books[i].title === req.body.title){
      bookUpdated = true;
      books[i] = req.body;
      res.statusCode = 200;
      res.json("Book updated");
    }
  }
  if (!bookUpdated){
    res.statusCode = 404;
    res.json("Book not found");
  }
});