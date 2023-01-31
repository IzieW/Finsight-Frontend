import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
)

const Forecast = ({ info }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: 'black',
        anchor: 'end',
        offset: -20,
        align: 'start',
        formatter: (value) => {
          const rounded = Math.round(value * 100) / 100
          return `£${rounded}`
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        position: {
          y: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
        display: false,
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 30,
      },
    },
  }

  const newData = {
    labels: info.labels,
    datasets: [
      {
        label: '',
        data: info.values,
        backgroundColor: info.values.map((i) => {
          if (i > 0) {
            return 'rgb(138, 160, 84, 0.75)'
          }
          return 'rgb(220, 24, 93, 0.75)'
        }),
      },
    ],
  }
  return (
    <div>
      <Bar options={options} data={newData} />
    </div>
  )
}

export default Forecast
