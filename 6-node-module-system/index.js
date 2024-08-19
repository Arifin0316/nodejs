// const nama = 'arifin';
// const umur =20;
// const sayHalo = (nama, umur) =>{
//     console.log(`halo nama saya ${nama} dan umur saya ${umur}`);
// };
// sayHalo(nama, umur);
// const fs = require('fs'); //core modile
// const cetaknama = require('./coba'); //local module
// const moment = require('moment') //thir party module /npm module/node_module
const coba = require('./coba');
console.log(coba.cetaknama('arifin'), coba.pi, coba.mhs.cetakMhs(), new coba.orang());
