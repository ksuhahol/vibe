const readline = require('node:readline/promises')

//Билетная касса

function ticketPrice(category) {
  switch (category) {
    case 1:{
      const price = 300
      return price
    }
    case 2:{
      const price = 500
      return price
    }
    case 3:{
      const price = 900
      return price
    }
    default:
      const price = 0
      return price
  }
}

function maxTickets(budget, price) {
  let counts = 0
  while (budget - price >=0) {
    budget = budget - price
    counts +=1
  }
  return counts
}

function printTicketResult(category, budget) {
  const ticket_price =  ticketPrice(category)
  const counts_of_tickets = maxTickets(budget, ticket_price)
  if (ticket_price > 0) {
    console.log('Ваш выбор: 1')
    console.log(`Категория билета: ${category}`)
    console.log(`Бюджет: ${budget}`)
    console.log(`Категория: ${category}, билет ${ticket_price} руб., бюджет ${budget} руб., можно купить ${counts_of_tickets} шт.`)
  }
  if (ticket_price == 0) {
    console.log('неизвестная категория')
  }

}

//Доставка заказа

function deliveryPrice(distance, total){
  let deliv_price = 0
  if (total >= 3000) {
    deliv_price = 0
  }
  if (total < 3000) {
    if (distance <= 3) {
      deliv_price = 0
    }
    if (distance >= 4 && distance <= 10) {
      deliv_price = 200
    }
    if (distance > 10) {
      deliv_price += 200
      for(let path = 11; path < distance + 1; path = path +1){
        deliv_price += 25
      }
    }
  }
  return deliv_price
}

function printDelivery(distance, total) {
  const delivery_price = deliveryPrice(distance, total)
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${delivery_price} руб.`)
}


//Лестница

function printSteps(height) {
  let count = 0

  for (let step = 1; step <= height; step += 1) {
    if (step == 4) {
      continue}
    console.log(`Ступень ${step}`)
    count +=1

    if (step == 10) {
      console.log('Дальше лестница не построена')
      break
    }
  }
console.log(`Всего построено: ${count}`)
}


async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  
  console.log('Выберите задачу:')
  console.log('1 – билетная касса')
  console.log('2 – доставка заказа')
  console.log('3 – лестница')

  const action = Number(await rl.question('Выберите задачу: '))

  switch (action) {
    case 1: {
      const category = Number(await rl.question('Введите категорию: '))
      const budget = Number(await rl.question('Введите бюджет (в рублях): '))
      ticketPrice(category)
      printTicketResult(category, budget)
      break
    }
    case 2: {
      const distance = Number(await rl.question('Введите расстояние до клиента (в км.): '))
      const total = Number(await rl.question('Введите сумму заказа (в руб.): '))
      printDelivery(distance, total)
      break
    }
    case 3: {
      const height = Number(await rl.question('Введите высоту лестницы: '))
      printSteps(height)
      break
    }

    default:
      console.log('такой задачи нет')
  }

  rl.close()
}

main()