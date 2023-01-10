const Notification = ({notification}) => {

    return(
        <div style={{color:"red"}}>
        {!notification?
            null :
            `* ${notification}`
        }
        </div>
    )
}

export default Notification