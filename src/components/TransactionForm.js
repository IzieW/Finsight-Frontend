import {useState} from 'react'

const TransactionForm = ({
  transactionType,
  addTransaction
}) => {
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')

  const saveTransaction = (event) => {
    event.preventDefault()
    addTransaction(amount, reference)
  }

  return (
    <form onSubmit={saveTransaction}>
      <p style={{ color: transactionType === 'income' ? 'green' : 'red' }}>
        New {transactionType === 'income' ? 'Income' : 'Expense'}
      </p>
      <input
        value={reference}
        onChange={({ target }) => setReference(target.value)}
        placeholder="reference"
      />
      <input
        value={amount}
        onChange={({target}) => setAmount(target.value)}
        type="number"
        placeholder={transactionType === 'income' ? 'amount' : 'cost'}
        required
      />
      <button type="submit">add</button>
    </form>
  )
}

export default TransactionForm
