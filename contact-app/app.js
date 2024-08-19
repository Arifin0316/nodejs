// mengambil argumet dari coment line
// const command = process.argv[2];
// if(command === 'add'){

// }else if(command === 'remove'){

// }else if(command === 'list'){

// }

// mengambil argument mengunakan yargs
const yargs = require('yargs');
const {simpanConstants, listcontacts, detaiContact, deleteContact} = require('./contacts');
const { constants } = require('buffer');
yargs.command({
  command: 'add',
  describe: 'Menambahkan data kontak',
  builder: {
    nama: {
      type: 'string',
      demandOption: true,
      description: 'Nama lengkap',
    },
    email: {
      type: 'string',
      demandOption: false,
      description: 'Email kontak',
    },
    noHP: {
      type: 'string',
      demandOption: true,
      description: 'Nomor HP kontak',
    },
  },
  handler(argv) {
    simpanConstants(argv.nama, argv.email, argv.noHP);
  },
}).demandCommand();
// menampilkan semua naman nomor hp contact

yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama dan nomer hp',
  handler() {
    listcontacts();
  }
    });
// menampikan ditail sebua contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detai sebua contact berdasarkan nama',
  builder: {
    nama: {
      type: 'string',
      demandOption: true,
      description: 'Nama lengkap',
    },
  },
  handler(argv) {
    detaiContact(argv.nama);
  }
    });
// menhapus contact berdasarkan nama 
yargs.command({
  command: 'delete',
  describe: 'menhapus contact berdasarkan nama',
  builder: {
    nama: {
      type: 'string',
      demandOption: true,
      description: 'Nama lengkap',
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  }
    });
yargs.parse();


















// const {tulisPertayan, simpanConstants} = require('./contacts');
// const main = async () => {
//   const nama = await tulisPertayan('masukan nama andah :');
//   const email = await tulisPertayan('masukan email andah :');
//   const noHP = await tulisPertayan('masukan noHP andah :');
//   simpanConstants(nama, email, noHP);
// };
// main();
