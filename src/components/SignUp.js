import { useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";
import Notification from "./Notification"

const Notification = (notification) => {
  return (
    <div style={{ color: "red" }}>
      {!notification ? null : `* ${notification}`}
    </div>
  );
};
const UserDetails = ({
  username,
  setUsername,
  name,
  setName,
  password,
  setPassword,
  handleNext,
  notification
}) => {

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
          <button type="submit">sign up</button>
        </form>
        <div>
          Already have an account? <Link to="/login">login</Link>
        </div>
      </div>
)};

const AllowanceSetUp = ({ allowance, setAllowance, handleSignUp }) => (
  <div>
    <div className="signupPage" style={{ float: "left" }}>
      <h2>Daily Budget</h2>
      How much do you want to spend a day?
      <form onSubmit={handleSignUp}>
        £
        <input
          value={allowance}
          onChange={({ target }) => setAllowance(target.value)}
          placeholder="10"
          type="number"
        />
        <div style={{ fontSize: "2" }}>*You can change this later</div>
        <button type="submit">save</button>
      </form>
    </div>
    <div className="allowanceSetUp" style={{ float: "left" }}>
      Each day you'll be given this amount to spend. If you spend too much, it's
      taken out of tomorrow's budget. If you don't spend it all, what is left
      rolls over!
    </div>
  </div>
);

const PostSignup = ({ username, password }) => {
  return (
    <div className="signupPage">
      <h2>Success!</h2>
      <Link to="/login">continue to login</Link>
    </div>
  );
};

const SignUp = () => {
  window.localStorage.clear();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(false)


  const [detailsComplete, setDetailsComplete] = useState(false);
  const [notification, setnotification] = useState(false);
  const [allowance, setAllowance] = useState(10);

  const [signupComplete, setSignupComplete] = useState(false);

  const handleNext = (event) => {
    event.preventDefault();

    setDetailsComplete(true);
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    const newUser = {
      username,
      name,
      password,
      allowance,
    };

    console.log(newUser);

    userService.create(newUser).then((response) => {
      console.log("sucess!");
      setSignupComplete(true);
    }).catch(error => {
      setNotification(error.response.data.error)
      setTimeout(() => setNotification(false), 5000)
      setUsername("")
      setName("")
      setPassword("")
    });
  };

  if (signupComplete) {
    return <PostSignup username={username} password={password} />;
  }

  return (
    <div>
      {!detailsComplete ? (
        <UserDetails
          username={username}
          setUsername={setUsername}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
<<<<<<< HEAD
          handleNext={handleSignUp}
          notification={notification}
=======
          handleNext={handleNext}
>>>>>>> parent of e73615f (balance set after login)
        />
      ) : (
        <AllowanceSetUp
          allowance={allowance}
          setAllowance={setAllowance}
          handleSignUp={handleSignUp}
        />
      )}
    </div>
  );
};

export  { SignUp, PostSignup }
