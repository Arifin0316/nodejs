const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const port = 3000;
// gunakan app js
app.set('view engine', 'ejs');
app.use(expressLayout);

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'arifin',
      email: 'arifin@gmail.com',
    },
    {
      nama: 'dody',
      email: 'dody@gmail.com',
    },
    {
      nama: 'boby',
      email: 'boby@gmail.com',
    },
  ];
  res.render('index', {
     nama: 'arifin',
     title: 'halaman home',
     mahasiswa,
     layout: 'layout/main-layout',
    });
});
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layout/main-layout',
     title:'halaman about'});
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layout/main-layout',
     title:'halaman contact'});
});
app.get('/produks/:id/category/:idCat', (req, res) => {
  res.sendFile(`produks ID : ${req.params.id} <br> category ID : ${req.params.idCat}`);
});
app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
