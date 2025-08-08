//Soal nomor 1
console.log("Jawaban Soal 1");
function cetak() {
    return "Hallo Nama saya Angga";
}
console.log(cetak());

console.log("------------------------\n");


//Soal nomor 2
console.log("Jawaban Soal 2");
function tambah(a, b) {
    return a + b;
}
let angka1 = 20;
let angka2 = 7;
let output = tambah(angka1, angka2);
console.log(output);

console.log("------------------------\n");


//Soal nomor 3
console.log("Jawaban Soal 3");
const Hello = () => "Hello";
console.log(Hello());

console.log("------------------------\n");


//Soal nomor 4
console.log("Jawaban Soal 4");
let obj = {
    nama : "john",
    umur : 22,    
    bahasa : "indonesia"
}
console.log(obj.bahasa);

console.log("------------------------\n");


//Soal nomor 5
console.log("Jawaban Soal 5");
let arrayDaftarPeserta = ["John Doe", "laki-laki", "baca buku" , 1992]
let objDaftarPeserta = {
    nama: arrayDaftarPeserta[0],
    jenisKelamin: arrayDaftarPeserta[1],
    hobi: arrayDaftarPeserta[2],
    tahunLahir: arrayDaftarPeserta[3]
}
console.log(objDaftarPeserta);

console.log("------------------------\n");


//Soal nomor 6
console.log("Jawaban Soal 6");
let dataBuah = [{
    nama: "Nanas",
    warna: "Kuning",
    adaBijinya: false,
    harga: 9000
  },
  {
    nama: "Jeruk",
    warna: "Oranye",
    adaBijinya: true,
    harga: 8000
  },
  {
    nama: "Semangka",
    warna: "Hijau & Merah",
    adaBijinya: true,
    harga: 10000
  },
  {
    nama: "Pisang",
    warna: "Kuning",
    adaBijinya: false,
    harga: 5000
  }
];
let buahTanpaBiji = dataBuah.filter(buah => buah.adaBijinya === false);
console.log(buahTanpaBiji);

console.log("------------------------\n");


//Soal nomor 7
console.log("Jawaban Soal 7");
let phone = {
    name: "Galaxy Fold 5",
    brand: "Samsung",
    year: 2023
}
const {name, brand, year} = phone;
console.log(name, brand, year); 

console.log("------------------------\n");


//Soal nomor 8
console.log("Jawaban Soal 8");
let dataBukuTambahan= {
    penulis: "john doe",
    tahunTerbit: 2020 
}

let buku = {
    nama: "pemograman dasar",
    jumlahHalaman: 172
}
  
let objOutput = {
    ...dataBukuTambahan,...buku
}

console.log(objOutput) 

console.log("------------------------\n");


//Soal nomor 9
console.log("Jawaban Soal 9");
let mobil = {
    merk : "bmw",
    color: "red",
    year : 2002
}
             
const functionObject = (param) => {    
    return param    
}
console.log(functionObject(mobil))

console.log("------------------------\n");