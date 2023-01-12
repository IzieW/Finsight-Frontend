import userService from "../services/users";

const changeAllowance = (user, newAllowance) => {
    console.log("changing allowance");

    const newValue = {
      allowance: Number(newAllowance),
    };

    userService.update(user.id, newValue).then((response) => {
      console.log("new allowance saved")
      return response
    });
  }

export default changeAllowance