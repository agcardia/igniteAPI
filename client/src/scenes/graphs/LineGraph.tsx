import {useState,useEffect} from 'react';
import {ResponsiveLine} from '@nivo/line';

interface plotData {
    id: String;
    data: Array<any>;
}

const LineGraph = () => {

    const [expenseData,setExpenseData] = useState<Array<any>>([])

    useEffect(() => {
    fetch('http://localhost:5000/expense')
    .then(res => res.json())
    .then(data => {
        const graphData: plotData[] = data.Results.map((item:any) => ({
            id: "expenses",
            data: [{"x":item.date,"y":item.amount}],
        }));
    setExpenseData(graphData);
    })},[]);

    console.log(expenseData);

    console.log(expenseData);

  return (
    <div>
      
    </div>
  )
}

export default LineGraph;

