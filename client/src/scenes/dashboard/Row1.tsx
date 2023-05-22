import DashboardBox from '../../components/DashboardBox';
import BoxHeader from '../../components/BoxHeader';
import { useGetExpensesQuery, useGetRevenuesQuery } from '../../state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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
        <AreaChart
            width={500}
            height={400}
            data={expenseData}
            margin={{
              top: 15,
              right: 10,
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              style={{ fontSize: "14px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "1" }}
              style={{ fontSize: "14px" }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill={palette.primary.main}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">Profit and Revenue</DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader title="Revenue" />
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={revenueData}> 
            <XAxis dataKey="date" />
            <YAxis/>
            <Tooltip />
            <Bar dataKey="amount" fill={palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
