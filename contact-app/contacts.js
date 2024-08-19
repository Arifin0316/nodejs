const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
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

  const loadContacts =() => {
    const file = fs.readFileSync(dataPath, 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
  }

const simpanConstants = (nama, email, noHP) => {
    const contact = { nama, email, noHP };
    const contacts = loadContacts();
    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Data sudah ada, silahkan masukkan data yang berbeda'));
        return false;
    }

    // cek email mengunakan module validator
    if(email){
      if(!validator.isEmail(email)){
        console.log(chalk.red.inverse.bold('Format email salah, silahkan masukkan email yang valid'));
        return false;
      }
    }

    // cek noHP menggunakan 
    if(!validator.isMobilePhone(noHP, 'id-ID')){
      console.log(chalk.red.inverse.bold('Format no HP salah, silahkan masukkan no HP yang valid'));
      return false;
    }

    contacts.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Terima kasih sudah memasukkan data'));
}
const listcontacts =() => {
  const contacts = loadContacts();
  console.log(chalk.blue.inverse.bold('daftar contact'));
  contacts.forEach((contacts, i) => {
    console.log(`${i+1}. ${contacts.nama} - ${contacts.noHP}`);
  })
};
// ditail contact
const detaiContact = (nama) => {
  const contacts = loadContacts(nama);

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  if(!contact){
    
  }
  if(contact){
    console.log(chalk.green.inverse.bold(`Detail Contact: ${nama}`));
    console.log(`Nama: ${contact.nama}`);
    console.log(`No HP: ${contact.noHP}`);
    if(contact.email){
      console.log(`Email: ${contact.email}`);
    }
  }else{
    console.log(chalk.red.inverse.bold(`Contact ${nama} tidak ditemukan`));
  }
}

const deleteContact =(nama) => {
  const contacts = loadContacts();
  const newContact = contacts.filter(
  (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
);

if(contacts.length === newContact.length) {
  console.log(chalk.red.inverse.bold(`Contact ${nama} tidak ditemukan`));
  return false;
};
fs.writeFileSync(dataPath, JSON.stringify(newContact));
console.log(chalk.green.inverse.bold(`data contact${nama} berhasil di hapus`));
}
module.exports = {simpanConstants, listcontacts, detaiContact, deleteContact};