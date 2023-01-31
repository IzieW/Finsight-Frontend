
const AllowanceSetUp = ({allowance, setAllowance, handleSignUp}) => {

  return (<div>
    <div className="signupPage" style={{ float: 'left' }}>
      <h2>Daily Budget</h2>
        How much do you want to spend a day?
      <form onSubmit={handleSignUp}>
          £
        <input
          value={allowance}
          onChange={({ target }) => setAllowance(target.value)}
          placeholder="10"
          type="number"
          min = "0"
          required
        />
        <div style={{ fontSize: '2' }}>*You can change this later</div>
        <button type="submit">save</button>
      </form>
    </div>
    <div className="allowanceSetUp" style={{ float: 'left' }}>
        Each day you&apos;ll be given this amount to spend. If you spend too much, it&apos;s
        taken out of tomorrow&apos;s budget. If you don&apos;t spend it all, what is left
        rolls over!
    </div>
  </div>
  )
}

export default AllowanceSetUp
