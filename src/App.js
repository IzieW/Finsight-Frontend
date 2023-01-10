import {useState, useEffect} from "react"
import userService from  "./services/users"
import transactionService from "./services/transactions.js"
import loginService from "./services/login"

import "./index.css"

import {
    BrowserRouter as Router, 
    Routes, Route, Link, Navigate
} from "react-router-dom"

import TransactionTable from "./components/TransactionTable"
import Balance from "./components/Balance"
import TransactionForm from "./components/TransactionForm"
import Settings from "./components/SettingsDropDown"
import Login from "./components/Login"
import Forecast from "./components/Forecast"
import SignUp from "./components/SignUp"
import Notification from "./components/Notification"
import NavigationBar from "./components/Navbar"

const App = () => {
    const [user, setUser] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [forecasts, setForecasts] = useState(null)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const [newTransaction, setNewTransaction] = useState(false)

    const [balance, setBalance] = useState(null)
    const [amount, setAmount] = useState("")
    const [reference, setReference] = useState("")

    const [notification, setNotification] = useState(false)


    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const userDetails = await loginService.login({
                username, password
            })
            
            window.localStorage.setItem(
                "loggedUser", JSON.stringify(userDetails)
            )
            transactionService.setToken(userDetails.token)
            setUser(userDetails)
            setForecasts(getWeek())
            setUsername("")
            setPassword("")
        } catch (exception) {
            setTimeout(
                setNotification("Username or password incorrect"), 500)
                setUsername("")
                setPassword("")
        }
    }

    const sortTransactions = (arr) => {
       arr.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
 )
        return arr
       }


    useEffect( () => {
        const loggedUserJSON = window.localStorage.getItem("loggedUser")
        if (loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setForecasts(getWeek())
            transactionService.setToken(user.token)
        }
    }, [])

    useEffect(  () => {
        if (user && !user.name){
            userService.getOne(user.id)
                .then(response => {
                    setTransactions(sortTransactions(response.transactions))
                    setUser(response)
                    setBalance(response.balance)
                    fillForecast(response.balance, response.allowance)
                                })
                    setForecasts(forecasts)
        }
        
   }, [user])

   const getWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wedn", "Thurs", "Fri", "Sat"]

    const today = Number(new Date().getDay())
    const shell = []

    shell[0] ={
        "label": "today"
    }

    for(let i = 1; i<7; i++){
        let index = (today+i)%7
        shell[i]={
            "label": days[index]
        }
    }

    return shell
   }


    const getForecast = (balance, allowance) => {
        const predictions = [1,2,3,4,5,6].map(a => balance+(a*allowance))
        const starter = [balance]
        const forecast= starter.concat(predictions)
        return forecast
    }

    const fillForecast = (balance, allowance) =>{
        if(forecasts){
        const predictions = getForecast(balance, allowance)
        for(let i = 0; i<7; i++){
            forecasts[i]["value"] = predictions[i]
        }
        }
    }

    const handleAmountChange = (event) => {
        event.preventDefault()
        setAmount(event.target.value)
    }

    const addTransaction = (event) => {
        event.preventDefault()
        let newAmount = Number(amount)


        if(newTransaction === "expense"){
            console.log(true)
            newAmount = amount*-1
        }

        const newBalance = Math.round((balance+newAmount)*100)/100

        const transaction = {
            reference: reference,
            date: new Date(),
            amount: newAmount,
        }
        transactionService
            .create(transaction)
            .then(response => {
                const newTransactions = [response.data]
                
                setTransactions(sortTransactions(
                        newTransactions.concat(transactions)
                        ))
                                    
                setBalance(newBalance)
                fillForecast(newBalance, user.allowance)
                setForecasts(forecasts)
                setNewTransaction(false)
                setAmount("")
                setReference("")
            
            })        
        
    }


    const newExpenseButton = () => {
        if (newTransaction === "expense"){
            setNewTransaction(null)
        }else {
            setNewTransaction("expense")
        }
    }

    const newIncomeButton = () => {
        if (newTransaction === "income"){
            setNewTransaction(null)
        }else {
            setNewTransaction("income")
        }
    }

    const deleteTransaction = (event) => {
        event.preventDefault()

        const transactionToDelete = transactions.find(n=> n.id === event.target.value)
        
        const newBalance = Math.round(
            (balance + (transactionToDelete.amount*-1))*100
        )/100

        transactionService
            .deleteTransaction(event.target.value)
            .then(response => {
                console.log(transactionToDelete.amount)           
                setTransactions(transactions.filter(n => n.id !== event.target.value))
                setBalance(newBalance)
                fillForecast(newBalance, user.allowance)
                setForecasts(forecasts)

            })

    }
 

        return (
            <Router>
                <NavigationBar user={user}/>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={user ?
                    <div className="mainPage">
                    <Balance amount = {balance}/>
                    <div className="forecast">
                    <Forecast info={forecasts} className = "forecast"/>
                    </div>
                    <div>
                        <button onClick={newIncomeButton}>+</button>
                        <button onClick={newExpenseButton}>-</button>
                        {newTransaction
                            ?<TransactionForm 
                            transactionType = {newTransaction}
                            reference = {reference} 
                            setReference = {setReference} 
                            amount = {amount} 
                            handleAmount = {handleAmountChange}
                            addTransaction={addTransaction}/> 
                            : null}
                    </div>
                    <div>
                    <TransactionTable transactions = {transactions} handleDelete={deleteTransaction}/>
                    </div>
                    </div>
                    : <Navigate to="/login" />}
                 />
                <Route path="/login" element={user? <Navigate replace to="/"/> 
                                : <div>
                                <Notification notification={notification} />
                                <Login username = {username}
                                    setUsername = {setUsername}
                                    password = {password}
                                    setPassword= {setPassword}
                                    handleLogin={handleLogin}/>
                                </div>} />
            </Routes>
            </Router>
        )
    
}

export default App
