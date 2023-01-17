import { useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";
import Notification from "./Notification"


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


const PostSignup = () => {
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


  const [signupComplete, setSignupComplete] = useState(false);


  const handleSignUp = (event) => {
    event.preventDefault();

    const newUser = {
      username,
      name,
      password,
      allowance: null
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
      {!signupComplete ? (
        <UserDetails
          username={username}
          setUsername={setUsername}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          handleNext={handleSignUp}
          notification={notification}
        />
      ) : (
        <PostSignup username={username} password={password} />
      )}
    </div>
  );
};

export  { SignUp, PostSignup }
