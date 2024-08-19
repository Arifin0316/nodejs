const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'arifin';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error) => {
    if (error) {
        return console.log('Connection gagal!', error);
    }

    console.log('Connection berhasil!');

    // pilih database
    const db = client.db(dbName);

    // Menambahkan 1 mahasiswa ke database
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'erik',
    //         email: 'erik@gmail.com'
    //     },
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Gagal memasukkan data', error);
    //         }
    //         console.log('Data berhasil dimasukkan:', result);

    //         // Tutup koneksi setelah selesai
    //         client.close();
    //     }
    // );

    // menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'erik',
    //             emai: 'erik@gmail.com'
    //         },
    //         {
    //             nama: 'udi',
    //             email: 'budi@gmail.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if(error){
    //             return console.log('data gagl ditambahkan');
    //         }
    //         console.log(result);
    //     }
    // )


    // menampilkan semua data yang ada di database mahasiswa
//     console.log(
//          db
//          .collection('mahasiswa')
//          .find().toArray((error, result) =>{
//             console.log(result);
//          })
//         );


// menampilkan data berdasrkan kriteria yang ada di colection mahasiswa
// console.log(
//     db
//     .collection('mahasiswa')
//     .find({ _id: ObjectId('66c1db35c7d95d31143da216')  })
//     .toArray((error, result) =>{
//        console.log(result);
//     })
//    );



// mengubah 1 data berdasrkan id
// const updatePromise = db.collection('mahasiswa').updateOne(
//     {
//         _id: ObjectId('66c1dd2cfde35526147965ed')
//     },
//     {
//         $set: {
//             email: 'joko@yaho.com',
//         }
//     }
// )

// updatePromise
//     .then((result) => {
//         console.log(result)
//     })

// mengubah bayak data
// const updatePromise = db.collection('mahasiswa').updateMany(
//     {
//         nama: 'erik',
//     },
//     {
//         $set: {
//             erik: 'erik doang',
//         }
//     }
// )

// updatePromise
//     .then((result) => {
//         console.log(result)
//     })

// menhapus satu data
// db.collection('mahasiswa').deleteOne(
//     {
//         _id: ObjectId('66c1dd2cfde35526147965ed')
//     },
//  ).then((result) =>{
//     console.log(result)
//  })
//  .catch((error) => {
//     console.log(error);
//  });

// menghapus lebih dari 1 data
db.collection('mahasiswa').deleteMany(
    {
        nama: 'udi'
    },
 ).then((result) =>{
    console.log(result)
 })
 .catch((error) => {
    console.log(error);
 });

});


