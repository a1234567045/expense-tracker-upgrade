function categoryToIcon(category) {
  switch (category) {
    case 'meals':
      category = 'utensils'
      break
    case 'traffics':
      category = 'shuttle-van'
      break
    case 'entertainments':
      category = 'grin-beam'
      break
    case 'living':
      category = 'home'
      break
    case 'others':
      category = 'pen'
      break
  }
  return category
}
function categoryToCh(category) {
  switch (category) {
    case 'meals':
      category = '餐飲食品'
      break
    case 'traffics':
      category = '交通出行'
      break
    case 'entertainments':
      category = '休閒娛樂'
      break
    case 'living':
      category = '家居物業'
      break
    case 'others':
      category = '其他'
      break
  }
  return category
}
function dateFormat(date) {
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1)
  let monthFormat = ''
  if (month.length < 2) monthFormat = '0' + month
  if (month.length === 2) monthFormat = month
  const dateFormat = year + '-' + monthFormat
  return dateFormat
}

module.exports = { categoryToIcon, categoryToCh, dateFormat }