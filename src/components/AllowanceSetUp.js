import changeAllowance from "../utils/changeAllowance"
import transactionService from "../services/transactions"
import {useState} from "react"

const AllowanceSetUp = ({user, setUser}) => {
    const [allowance, setAllowance] = useState("")

    const updateAllowance = async (event) => {
        event.preventDefault()

        await changeAllowance(user, allowance)

        user.allowance = allowance

        transactionService.create({
            reference: "Daily allowance",
            date: new Date(),
            amount: Number(allowance)
        })
            .then(response => {
                user.balance = allowance
                setUser(user)
                window.location.reload();

            })
    }

    return (<div className="allowanceSetUp">
      <div style={{ float: "left" }}>
        <h2>Set your daily budget</h2>
        How much do you want to spend a day?
        <form onSubmit={updateAllowance}>
          £
          <input
            value={allowance}
            onChange={({ target }) => setAllowance(target.value)}
            placeholder="10"
            type="number"
            min="0"
          />
          <div style={{ fontSize: "2" }}>*You can change this later</div>
          <button type="submit">save</button>
        </form>
      </div>
      <div className = "guide" style={{ float: "left" }}>
        Each day you'll be given this amount to spend. If you spend too much, it's
        taken out of tomorrow's budget. If you don't spend it all, what is left
        rolls over!
      </div>
    </div>)
};

  export default AllowanceSetUp