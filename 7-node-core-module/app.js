// core module
// file system

const fs = require('fs');

// menuliskan string ke file secara (singkronus)
// try{
//     fs.writeFileSync('data/tes.txt','halo word secara sinkronus');

// }catch(e){
//     console.log(e);
// }

// menuliskan sting ke file secara asingkronus

// fs.writeFile('data/tes.txt', 'halo worrd mengunakan aysingkronus', (e) =>{
//     console.log(e);
// });

// membacah isi file secara sinkronus

// const data = fs.readFileSync('data/tes.txt' ,'utf-8');

// console.log(data)

// membacah isi file secara asingkronus
// fs.readFile('data/tes.txt', 'utf-8', (err, data) =>{
//     if(err) throw err;
//     console.log(data);
// });


//readline 

const readline = require('readline');
const { json } = require('stream/consumers');
const { createInflate } = require('zlib');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question('masukan nama anda: ', (nama) => {
    rl.question('masukan nomer hp anda: ', (noHP) => {
        const contact = {nama, noHP};
        const file = fs.readFileSync('data/contacs.json', 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(contact);
        fs.writeFileSync('data/contacs.json', JSON.stringify(contacts));
        console.log('terima kasi suadah memasukan data');
        rl.close();
    })
})

