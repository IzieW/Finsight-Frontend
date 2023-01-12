import React, { useState } from "react";
import changeAllowance from "../utils/changeAllowance"
import { BsFillPencilFill, BsCheck2 } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import makeForecast from "../utils/forecasting";


const SettingsMenu = ({ user, setUser, editAllowance, setEditAllowance, setForecasts}) => {
  const [newAllowance, setNewAllowance] = useState(user.allowance);

  const handleAllowanceChange = (event) => {
    setNewAllowance(event.target.value);
  };

  const updateAllowance = async (event) => {
    event.preventDefault();
    if (newAllowance === user.allowance) {
      setEditAllowance(false);
      return null;
    }
      changeAllowance(user, newAllowance)
      makeForecast(user.balance, newAllowance, setForecasts)
      user.allowance = newAllowance
      setEditAllowance(false)
      setUser(user)
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  const allowanceForm = () => (
    <form onSubmit={updateAllowance}>
      <input
        value={newAllowance}
        onChange={handleAllowanceChange}
        type="number"
      />{" "}
      <button type="submit">
        <BsCheck2 />
      </button>
    </form>
  );

  return (
    <div className="settings">
      <div>{user.name}</div>
      <div>
        Daily Budget: £
        {editAllowance ? (
          allowanceForm()
        ) : (
          <>
            {" "}
            {user.allowance}
            <BsFillPencilFill
              style={{ fontSize: "10px", marginLeft: "5px" }}
              onClick={() => setEditAllowance(true)}
            />
          </>
        )}
      </div>
      <div onClick={logout} style={{ cursor: "pointer" }}>
        logOut <BiLogOut />
      </div>
    </div>
  );
};

export default SettingsMenu;
