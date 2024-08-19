const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
})
app.get('/about', (req, res) => {
    res.sendFile('./about.html', { root: __dirname });
})
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', { root: __dirname });
})

app.get('/produks/:id/category/:idCat', (req, res) => {
    res.sendFile(`produks ID : ${req.params.id} <br> category ID : ${req.params.idCat}`)
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})