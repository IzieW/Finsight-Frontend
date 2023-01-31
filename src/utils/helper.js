const sortTransactions = (arr) => {
  arr.sort((a, b) => new Date(b.date) - new Date(a.date))
  return arr
}

export default {
  sortTransactions
}
