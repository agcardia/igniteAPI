import DashboardBox from '../../components/DashboardBox';
import BoxHeader from '../../components/BoxHeader';
import { useGetExpensesQuery, useGetRevenuesQuery } from '../../state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Row1 = () => {
  const { palette } = useTheme();
  const { data: expenseQueryData } = useGetExpensesQuery();
  const { data: revenueQueryData } = useGetRevenuesQuery();

  const expenseData = useMemo(() => {
    return (
      expenseQueryData &&
      expenseQueryData.Results.map(({ amount, date }) => {
        return {
          amount: amount,
          date: date.substring(0, 10)
        };
      })
    );
  }, [expenseQueryData]);

  const revenueData = useMemo(() => {
    return (
      revenueQueryData &&
      revenueQueryData.Results.map(({ amount, date }) => {
        return {
          amount: amount,
          date: date.substring(0, 10)
        };
      })
    );
  }, [revenueQueryData]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader title="Expenses" />
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={expenseData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis dataKey="date" tickLine={false} />
            <YAxis tickLine={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke={palette.primary.main}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">Profit and Revenue</DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader title="Revenue" />
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill={palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
