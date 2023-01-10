import React, {useState} from 'react'
import userService from  "../services/users"
import {BsFillPencilFill, BsCheck2} from "react-icons/bs"
import { BiLogOut } from "react-icons/bi"

const SettingsMenu = ({user, editAllowance, setEditAllowance}) => {

    const [newAllowance, setNewAllowance] = useState(user.allowance)
  
    const handleAllowanceChange = (event) => {
      setNewAllowance(event.target.value)
    }
  
    const changeAllowance = (event) => {
      event.preventDefault()
      if (newAllowance === user.allowance){
          setEditAllowance(false)
          return null
      }


      console.log("changing allowance")
      const newValue = {
        "allowance": Number(newAllowance)
      }
      userService.update(user.id, newValue)
        .then(response => {
          setEditAllowance(false)
          user.allowance = newAllowance
        }
        )
  
    }

    const logout = () => {
      window.localStorage.removeItem("loggedUser")
      window.location.reload()
    }
  
    const allowanceForm = () => (
      <form onSubmit={changeAllowance}>
        <input 
          value={newAllowance}
          onChange={handleAllowanceChange}
          type="number"
        /> <button type="submit">
      <BsCheck2 />
          </button>
      </form>
    )
  
  
    return (
    <div className="settings">
      <div>
        {user.name}
      </div>
      <div>
        Daily Budget: £ 
        {editAllowance
        ? allowanceForm()
        : <> {user.allowance}
        <BsFillPencilFill 
          style={{fontSize: "10px", marginLeft: "5px"}} 
          onClick={()=> setEditAllowance(true)}/>
          </>}
        </div>
          <div onClick={logout} style={{cursor:"pointer"}}>
          logOut <BiLogOut />
          </div>
    </div>
  )
  }

export default SettingsMenu