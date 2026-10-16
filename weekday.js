const dayNumber = Number(process.argv[2])

switch (dayNumber) {
  case 1:
    console.log('понедельник')
    break
  case 2:
    console.log('вторник')
    break
  case 3:
    console.log('среда')
    break
  default:
    console.log('нет такого дня')
}