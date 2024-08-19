const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override')


const Contact = require('./model/contact');
const contact = require('./model/contact');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { resolve } = require('path');

require('./utils/db');

const app = express();
const port = 3000;

// set up mthod overide
app.use(methodOverride('_method'));

// set up ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// halaman home
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

app.listen(port, () => {
  console.log(`mongo contact app | listening at http://localhost:${port}`);
});

// halaman about
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layout/main-layout',
    title: 'halaman about',
  });
});

//   halaman contact
app.get('/contact', async (req, res) => {
  const contacs = await contact.find();
  res.render('contact', {
    layout: 'layout/main-layout',
    title: 'halaman contact',
    contacts: contacs,
    msg: req.flash('msg'),
  });
});

//   halaman tambah data
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
    body('nama').custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      res.render('add-contact', {
        title: 'form tambah data contact',
        layout: 'layout/main-layout',
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        // kirimkan flash maasage
        req.flash('msg', 'data contact berhasil di tambahkan');
        res.redirect('/contact');
      });
    }
  }
);

// halaman hapus data
app.delete('/contact', (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash('msg', 'data contact berhasil di hapus');
    res.redirect('/contact');
  });
});

// halaman edit data
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    if (!contact) {
      req.flash('msg', 'Contact tidak ditemukan');
      return res.redirect('/contact');
    }
    res.render('edit-contact', {
      title: 'Form Ubah Contact',
      layout: 'layout/main-layout',
      contact,
    });
});


  // proses ubah data 

  app.put(
    '/contact',
    [
      body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value});
        if (value !== req.body.oldNama && duplikat) {
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
        res.render('edit-contact',{
          title: 'form ubah data contact',
          layout: 'layout/main-layout',
          errors: errors.array(),
          contact: req.body,
        });
      }else{
       Contact.updateOne({ _id: req.body.id},
        {
            $set: {
                nama: req.body.nama,
                email: req.body.email,
                noHP: req.body.noHP,
            },
        }
       ).then((result) => {
           // kirimkan flash maasage
           req.flash('msg', 'data contact berhasil di ubah')
           res.redirect('/contact')
       })
      }
    }
  );
  
//   halaman detail
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render('ditail', {
    layout: 'layout/main-layout',
    title: 'ditail contact',
    contact,
  });
});
