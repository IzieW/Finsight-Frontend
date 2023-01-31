import { useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import Notification from './Notification'
import AllowanceSetUp from './AllowanceSetUp'


const SignUp = ({handleLogin}) => {
  window.localStorage.clear()

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [allowance, setAllowance] = useState('')
  const [notification, setNotification] = useState(false)
  const [detailsComplete, setDetailsComplete] = useState(false)

  const handleNext = (event) => {
    event.preventDefault()
    setDetailsComplete(true)
  }

  const handleSignUp = (event) => {
    event.preventDefault()

    const newUser = {
      username,
      name,
      password,
      allowance
    }

    const makeUser = async () => {
      try{
        await userService.create(newUser)

        await handleLogin(username, password)



      } catch (error) {
        setNotification(error.response.data.error)
        setTimeout(() => setNotification(false), 5000)
        setUsername('')
        setName('')
        setPassword('')
      }
    }

    makeUser()
  }

  if (detailsComplete){
    return <AllowanceSetUp allowance={allowance} setAllowance={setAllowance} handleSignUp = {handleSignUp}/>
  }

  return (
    <div className="signupPage">
      <h2> Sign up</h2>
      <Notification notification = {notification} />
      <form onSubmit={handleNext}>
        <div>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">next</button>
      </form>
      <div>
          Already have an account? <Link to="/login">login</Link>
      </div>
    </div>
  )
}

export  { SignUp }
