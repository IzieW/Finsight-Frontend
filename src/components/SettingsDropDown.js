import React, { useState } from "react";

import Collapse from "react-bootstrap/Collapse";
import { BsGear } from "react-icons/bs";

import SettingsMenu from "./SettingsMenu";

const Settings = ({ user, setUser, setForecasts}) => {
  const [open, setOpen] = useState(false);
  const [editAllowance, setEditAllowance] = useState(false);

  return (
    <>
      <BsGear
        onClick={() => {
          setOpen(!open);
          if (editAllowance) {
            setEditAllowance(false);
          }
        }}
      />
      <Collapse in={open}>
        <div>
          <SettingsMenu
            user={user}
            setUser={setUser}
            editAllowance={editAllowance}
            setEditAllowance={setEditAllowance}
            setForecasts={setForecasts}
          />
        </div>
      </Collapse>
    </>
  );
};

export default Settings;
