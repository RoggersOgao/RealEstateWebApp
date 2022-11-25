import React, { useState, useContext, useEffect } from 'react';
import { fetchPropertyByUser } from '../../../context/listing/ListingActions';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import "./charts.scss"
import ListingContext from '../../../context/listing/ListingContext';

function Chart({id}) {
  const {state, dispatch} = useContext(ListingContext)
    const [isLoading, setIsLoading] = useState(false)
  const listing = state.userProperties
  let Arr = []
  listing.map((item,index)=>(
    <div key={index}>
      {Arr.push(item.propertyType)}
    </div>
  ))
  
  const data = [
    { name: 'Villas', value: Arr.filter(x => x === "villa").length},
    { name: 'Homes', value: Arr.filter(x => x === "home").length },
    { name: 'Offices', value: Arr.filter(x => x === "office").length },
    { name: 'Condominiums', value: Arr.filter(x => x === "condominium").length },
    { name: 'Apartments', value: Arr.filter(x => x === "apartment").length},
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} text-anchor="middle" fill={fill} className="text">
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Total:  ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }


  useEffect(()=>{

    const myProperty = async() => {
        setIsLoading(true)
        const response = await fetchPropertyByUser(id)

        dispatch({
            type:"USER_PROPERTIES", 
            payload:response.data
        })
        setIsLoading(false)
    }
myProperty()
},[])

  return (
    <ResponsiveContainer width="100%" height="100%" aspect={2.5} className="rscontainer">
        <PieChart width={600} height={600}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={140}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
  )
}

export default Chart

