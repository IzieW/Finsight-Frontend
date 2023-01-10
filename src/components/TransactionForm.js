const TransactionForm = ({transactionType, reference, setReference, amount, handleAmount, addTransaction}) => {
    return (
        <form onSubmit={addTransaction}>
            <p style={{color: transactionType==="income"?"green":"red"}}>
            New {transactionType==="income"?"Income":"Expense"}
            </p>
            <input 
                    value={reference} 
                    onChange={({target})=>setReference(target.value)}
                    placeholder= "reference"
                    />
                     <input 
                                                    value = {amount} 
                                                    onChange={handleAmount} 
                                                    type="number" 
                                                    placeholder={transactionType==="income"?"amount": "cost"}
                                                    required />
            <button type="submit">add</button>
        </form>
    )

}

export default TransactionForm