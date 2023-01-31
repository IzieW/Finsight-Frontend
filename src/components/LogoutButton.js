import {BiLogOut} from 'react-icons/bi'

const LogoutButton = () => {
  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  return (
    <div onClick={logout} style={{cursor: 'pointer'}}>
            logout <BiLogOut />
    </div>
  )
}

export default LogoutButton
