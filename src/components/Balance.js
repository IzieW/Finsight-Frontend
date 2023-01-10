const Balance = ({amount}) => {
    let styling = {
        color: "green"
    }
    if (amount < 0){
        styling.color = "#DD2C5C"
    }
    return (
    <div style={styling}>
        <h2 >Balance:</h2>
    <div className="balance">
    £ {amount}
    </div>
    </div>
)}

export default Balance