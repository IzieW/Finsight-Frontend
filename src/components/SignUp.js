import { useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";


const UserDetails = ({
  username,
  setUsername,
  name,
  setName,
  password,
  setPassword,
  handleNext,
}) => (
  <div className="signupPage">
    <h2> Sign up</h2>
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
);


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
        />
      ) : (
        <PostSignup username={username} password={password} />
      )}
    </div>
  );
};

export default SignUp;
