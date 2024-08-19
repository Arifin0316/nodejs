const express = require('express');
const expressLayout = require('express-ejs-layouts');
const { loadContacts, fineContact, addContacts ,cekDuplikat } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;
// gunakan app js
app.set('view engine', 'ejs');
// third-parti-midlewhere
app.use(expressLayout);
// build in midle where
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    title: 'halaman about',
  });
});
app.get('/contact', (req, res) => {
  const contacs = loadContacts();
  res.render('contact', {
    layout: 'layout/main-layout',
    title: 'halaman contact',
    contacts: contacs,
    msg: req.flash('msg'),
  });
});
// hlaman form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'form tambah contact',
    layout: 'layout/main-layout',
  });
});
// proses data tambah contact
app.post(
  '/contact',
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error('nama contact sudah di gunakan!');
      }
      return true;
    }),
    check('email', 'Email tidak valit').isEmail(),
    check('noHP', 'no HP tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('add-contact',{
        title: 'form tambah data contact',
        layout: 'layout/main-layout',
        errors: errors.array(),
      });
    }else{
      addContacts(req.body);
      // kirimkan flash maasage
      req.flash('msg', 'data contact berhasil di tambahkan')
      res.redirect('/contact')
    }
  }
);

// halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = fineContact(req.params.nama);
  res.render('ditail', {
    layout: 'layout/main-layout',
    title: 'ditail contact',
    contact,
  });
});
app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
