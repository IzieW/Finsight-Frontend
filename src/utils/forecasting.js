const getWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wedn", "Thurs", "Fri", "Sat"];

    const today = Number(new Date().getDay());
    const arr = Array(7);

    arr[0] = "today"


    for (let i = 1; i < 7; i++) {
      let index = (today + i) % 7;
      arr[i] = days[index]
    }

    return arr;
  };

const predictForecast = (balance, allowance) => {
    const predictions = [1, 2, 3, 4, 5, 6].map((a) => balance + a * allowance);
    const starter = [balance];
    const forecast = starter.concat(predictions);
    return forecast;
  };

const makeForecast = (balance, allowance, setForecasts) => {
   const forecast = {
        labels: getWeek(),
        values: predictForecast(balance, allowance)
    }

    setForecasts(forecast)
}

export default makeForecast