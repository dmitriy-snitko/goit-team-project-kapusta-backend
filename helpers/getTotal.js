const getTotal = (alltransactions) => {
  let incomings = 0
  let expenses = 0

  alltransactions.forEach(trans => {
    if (trans.typeOftransactions) {
      incomings += trans.amount
    }

    if (!trans.typeOftransactions) {
      expenses += trans.amount
    }
  })

  const total = [
    { name: 'incomings', sum: incomings },
    { name: 'expenses', sum: expenses }
  ]

  return total
}

module.exports = getTotal
