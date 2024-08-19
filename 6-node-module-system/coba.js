function cetaknama(nama) {
    return `halo nama saya ${nama}`
}
const pi = 3.14;

const mhs = {
    nama: 'dody',
    umur:30,
    cetakMhs(){
        return `halo nama saya ${this.nama} saya ${this.umur} tahun`
    }
}

class orang {
    constructor(){
        console.log('objek berhasil dibuat')
    }
}

// module.exports.cetaknama = cetaknama;
// module.exports.pi = pi;
// module.exports.mhs = mhs;
// module.exports.orang = orang;


// module.exports ={
//     cetaknama : cetaknama,
//     pi: pi,
//     mhs :mhs,
//     orang:orang,
// }

module.exports = {cetaknama, pi, mhs, orang};