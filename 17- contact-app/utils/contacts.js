const fs = require('fs');
// Membuat direktori data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// ambil semua data cotacts.json
  const loadContacts =() => {
    const file = fs.readFileSync(dataPath, 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
  };

//   cari contact berdasarkan nama
const fineContact = (nama) =>{
    const contacts = loadContacts(nama);
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

// menimpah file kontak json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

// menambahkan data contak baru
const addContacts = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts)
}

// cek nama yang duplikat 
const cekDuplikat = (nama) =>{
  const contacs = loadContacts();
  return contacs.find((contac) => contac.nama === nama);
}

  module.exports = { loadContacts, fineContact, addContacts, cekDuplikat };