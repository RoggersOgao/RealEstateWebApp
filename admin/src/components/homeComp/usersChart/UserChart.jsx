import React,{ useRef, useEffect, useState } from 'react'
import "./userChart.scss"
import axios from 'axios'
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
  } from 'chart.js';
  import { Chart } from 'react-chartjs-2';
 
function UserChart() {
// getting all the users

const [users, setUsers] = useState(null)
const [dates, setDates] = useState([])
useEffect(()=>{
    const fetchUsers = async()=>{
        const response = await axios.get("http://localhost:5003/api/users")
        setDates(response.data)
    }
    fetchUsers()
},[])

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let crAt = []
    dates.map((item,index)=> {
        const dt = new Date(item.createdAt)  
        return crAt.push(monthNames[dt.getMonth()])
    })
  
    
// looping the set using the forEach method
const count = {};
for (const el of crAt) {
  if (count[el]) {
    count[el] += 1;
  } else {
    count[el] = 1;
  }
}

console.log(count);



    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        PointElement,
        LineElement,
        Legend,
        Tooltip
      );
      const labels = Object.keys(count);

      const data = {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Users',
            borderColor: 'rgb(255, 28, 100)',
            borderWidth: 2,
            fill: false,
            data: Object.values(count)
          },
          {
            type: 'bar',
            label: 'Users',
            backgroundColor: 'rgb(53, 162, 235)',
            data: Object.values(count)
          },
        ],
        
      };
      
      function triggerTooltip() {
        const tooltip = Chart?.tooltip;
      
        if (!tooltip) {
          return;
        }
      
        if (tooltip.getActiveElements().length > 0) {
          tooltip.setActiveElements([], { x: 0, y: 0 });
        } else {
          const { chartArea } = Chart;
      
          tooltip.setActiveElements(
            [
              {
                datasetIndex: 0,
                index: 2,
              },
              {
                datasetIndex: 1,
                index: 2,
              },
            ],
            {
              x: (chartArea.left + chartArea.right) / 2,
              y: (chartArea.top + chartArea.bottom) / 2,
            }
          );
        }
      
        Chart.update();
      }
      const chartRef = useRef();

      useEffect(() => {
        const chart = chartRef.current;
    
        triggerTooltip(chart);
      }, []);

  return (
    <div className="userChart">
        <Chart ref={chartRef} type='bar' data={data} />
    </div>
  )
}

export default UserChart