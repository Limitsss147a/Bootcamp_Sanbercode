//Soal nomor 1
for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  

//Soal nomor 2
for (let i = 1; i < 10; i++) {
    if (i % 2 !== 0) {
      console.log(i);
    }
  }
  

//Soal nomor 3
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
  

//Soal nomor 4
let array1 = [1, 2, 3, 4, 5, 6];
console.log(array1[5]); 


//Soal nomor 5
let array2 = [5, 2, 4, 1, 3, 5];
array2.sort();
console.log(array2);


//Soal nomor 6
let array3 = ["selamat", "anda", "melakukan", "perulangan", "array", "dengan", "for"];
for (let i = 0; i < array3.length; i++) {
  console.log(array3[i]);
}


//Soal nomor 7
let array4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = 0; i < array4.length; i++) {
  if (array4[i] % 2 === 0) {
    console.log(array4[i]);
  }
}


//Soal nomor 8
let kalimat = ["saya", "sangat", "senang", "belajar", "javascript"];
let hasil = kalimat.join(" ");
console.log(hasil); 


//Soal nomor 9
var sayuran = [];

sayuran.push("Kangkung");
sayuran.push("Bayam");
sayuran.push("Buncis");
sayuran.push("Kubis");
sayuran.push("Timun");
sayuran.push("Seledri");
sayuran.push("Tauge");

console.log(sayuran);


//Soal nomor 10
let numbers = [1, 2, 3, 4, 5];
let hasilKali = [];

for (let i = 0; i < numbers.length; i++) {
  hasilKali.push(numbers[i] * 3);
}
console.log(hasilKali);