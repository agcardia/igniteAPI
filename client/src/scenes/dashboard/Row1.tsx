import DashboardBox from '../../components/DashboardBox';
import { useGetExpensesQuery } from '../../state/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Row1 = () => {
  const { data } = useGetExpensesQuery();
  console.log(data && data);
  return (
    <>
      <DashboardBox gridArea="a">
        Revenue and Expense
        <LineChart
          width={500}
          height={300}
          data={data && data.Results}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </DashboardBox>
      <DashboardBox gridArea="b">Profit and Revenue</DashboardBox>
      <DashboardBox gridArea="c">Revenue by Day/Month</DashboardBox>
    </>
  );
};

export default Row1;
