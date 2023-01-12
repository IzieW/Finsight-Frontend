import { useState, useEffect } from "react";

import userService from "./services/users";
import transactionService from "./services/transactions.js";
import loginService from "./services/login";

import "./index.css";

import makeForecast from "./utils/forecasting";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import TransactionTable from "./components/TransactionTable";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import Login from "./components/Login";
import Forecast from "./components/Forecast";
import SignUp from "./components/SignUp";
import Notification from "./components/Notification";
import NavigationBar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [forecasts, setForecasts] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newTransaction, setNewTransaction] = useState(false);

  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");

  const [notification, setNotification] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userDetails = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(userDetails));
      transactionService.setToken(userDetails.token);
      setUser(userDetails);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setTimeout(setNotification("Username or password incorrect"), 500);
      setUsername("");
      setPassword("");
    }
  };

  const sortTransactions = (arr) => {
    arr.sort((a, b) => new Date(b.date) - new Date(a.date));
    return arr;
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      transactionService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user && !user.name) {
      userService.getOne(user.id).then((response) => {
        setTransactions(sortTransactions(response.transactions));
        setUser(response);
        setBalance(response.balance);
        makeForecast(response.balance, response.allowance, setForecasts);
      });;
    }
  }, [user]);

  const handleAmountChange = (event) => {
    event.preventDefault();
    setAmount(event.target.value);
  };

  const addTransaction = (event) => {
    event.preventDefault();
    let newAmount = Number(amount);

    if (newTransaction === "expense") {
      newAmount = amount * -1;
    }

    const newBalance = Math.round((balance + newAmount) * 100) / 100;

    const transaction = {
      reference: reference,
      date: new Date(),
      amount: newAmount,
    };
    transactionService.create(transaction).then((response) => {
      const newTransactions = [response.data];

      setTransactions(sortTransactions(newTransactions.concat(transactions)));

      setBalance(newBalance);
      makeForecast(newBalance, user.allowance, setForecasts);
      setNewTransaction(false);
      setAmount("");
      setReference("");
    });
  };

  const newExpenseButton = () => {
    if (newTransaction === "expense") {
      setNewTransaction(null);
    } else {
      setNewTransaction("expense");
    }
  };

  const newIncomeButton = () => {
    if (newTransaction === "income") {
      setNewTransaction(null);
    } else {
      setNewTransaction("income");
    }
  };

  const deleteTransaction = (event) => {
    event.preventDefault();

    const transactionToDelete = transactions.find(
      (n) => n.id === event.target.value
    );

    const newBalance =
      Math.round((balance + transactionToDelete.amount * -1) * 100) / 100;

    transactionService
      .deleteTransaction(event.target.value)
      .then((response) => {
        setTransactions(
          transactions.filter((n) => n.id !== event.target.value)
        );
        setBalance(newBalance);
        makeForecast(newBalance, user.allowance, setForecasts);
      });
  };

  return (
    <Router>
      <NavigationBar user={user} setForecasts={setForecasts}/>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            user ? (
              <div className="mainPage">
                <Balance amount={balance} />
                <div className="forecast">
                 {forecasts ?<Forecast info={forecasts} className="forecast" />: null}
                </div>
                <div>
                  <button onClick={newIncomeButton}>+</button>
                  <button onClick={newExpenseButton}>-</button>
                  {newTransaction ? (
                    <TransactionForm
                      transactionType={newTransaction}
                      reference={reference}
                      setReference={setReference}
                      amount={amount}
                      handleAmount={handleAmountChange}
                      addTransaction={addTransaction}
                    />
                  ) : null}
                </div>
                <div>
                  <TransactionTable
                    transactions={transactions}
                    handleDelete={deleteTransaction}
                  />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <div>
                <Notification notification={notification} />
                <Login
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                />
              </div>
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
