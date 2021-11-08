// const totalAmount = (arr) => {
//   let sum = 0
//   for (let i = 0; i < arr.length; i += 1) {
//     sum += arr[i].amount
//   }
//   return sum
// }

const totalAmount = (arr) => {
  return arr.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.amount
  }, 0)
}

module.exports = totalAmount
