
const Transaction = ({transaction, handleDelete}) => {
    let styling = {
        color: "red"
    }
    if (transaction.amount > 0){
       styling.color = "green"
    } 
    const date = new Date(transaction.date).toDateString()

    return (
        <tr>
            <td>
            <button onClick={handleDelete} value={transaction.id}>x</button>
            </td>
            <td>
                {date}
            </td>
            <td style = {styling}>
                {transaction.reference}
            </td>
            <td style = {styling}>
            £{transaction.amount}
            </td>
            <td>
            £{transaction.balanceRemaining}
            </td>
        </tr>
    )
}

const TransactionTable = ({transactions, handleDelete}) => {
    if (transactions.length === 0){
        return(
            <p>Click buttons above to add income or expenses</p>
        )
    }
    return (
        <table class="table table-striped">
            <thead>
            <tr>
                <th></th>
                <th>Date</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Balance</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map(transaction => (
                <Transaction transaction = {transaction} handleDelete={handleDelete} key = {transaction.id}/>
            ))}
            </tbody>
        </table>
    )
        }

export default TransactionTable