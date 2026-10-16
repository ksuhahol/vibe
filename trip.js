let path = Number(process.argv[2]);
let fuel = Number(process.argv[3]);
let price = Number(process.argv[4]);
let rashod = fuel/100;
let itog = rashod*path;
let stonks = price*itog
console.log(`Поездка ${path} км: ${itog}, ${stonks} руб.`);