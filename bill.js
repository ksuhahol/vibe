const tipRate = 0.1;
let pizza = Number(process.argv[2]);
let people = Number(process.argv[3]);
let myDish = Number(process.argv[4]);
let base = pizza / people + myDish;
let myShare = base + base * tipRate;
console.log(`Пицца ${pizza} делится на ${people},то есть каждый скинулся по ${(pizza / people)/pizza*100} % от общей цены плюс ваше блюдо ${myDish}: с вас ${myShare}`);




