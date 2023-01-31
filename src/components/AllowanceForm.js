import { useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import userService from '../services/users'
import makeForecast from '../utils/forecasting'

const AllowanceForm = ({user, setEditAllowance, setForecasts}) => {
  const [newAllowance, setNewAllowance] = useState(user.allowance)

  const changeAllowance = (event) => {
    event.preventDefault()
    if (newAllowance === user.allowance) {
      setEditAllowance(false)
      return null
    }

    const newValue = {
      allowance: Number(newAllowance),
    }

    userService.update(user.id, newValue).then(() => {
      setEditAllowance(false)
      user.allowance = newAllowance
      makeForecast(user.balance, newAllowance, setForecasts)
    })
  }


  return (
    <form onSubmit={changeAllowance}>
      <input
        value={newAllowance}
        onChange={({target}) => setNewAllowance(target.value)}
        type="number"
        min="0"
      />{' '}
      <button type="submit">
        <BsCheck2 />
      </button>
    </form>
  )
}

export default AllowanceForm
