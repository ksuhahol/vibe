const age = Number(process.argv[2])
const access = age >= 18 ? 'открыто' : 'закрыто'
console.log(access)