import React, {useState} from 'react'

import Collapse from "react-bootstrap/Collapse"
import {BsGear} from "react-icons/bs"

import SettingsMenu from "./SettingsMenu"

const Settings = ({user}) => {

  const [open, setOpen] = useState(false);
  const [editAllowance, setEditAllowance] = useState(false)

  return (
    <>
      <BsGear
        onClick={() => {
          setOpen(!open)
          if(editAllowance){
            setEditAllowance(false)
          }
        }
        }
      />
      <Collapse in={open}>
        <div>
        <SettingsMenu user={user} editAllowance = {editAllowance} setEditAllowance={setEditAllowance}/>
        </div>
      </Collapse>
    </>
  )
}

export default Settings