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
  console.log(revenueQueryData);

  const expenseData = useMemo(() => {
    return (
      expenseQueryData &&
      expenseQueryData.Results.map(({amount, date}) => {
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
      revenueQueryData.Results.map(({amount, date}) => {
        return {
          amount: amount,
          date: date.substring(0, 10)
        };
      })
    );
  }, [revenueQueryData]);

  const countRevenue =
    revenueData &&
    revenueData.reduce((revenue, entry) => {
      const month = new Date(entry.date).toLocaleDateString('en-US', {
        month: 'short'
      });
      revenue[month] = (revenue[month] || 0) + entry.amount;
      return revenue;
    }, {});

  const countExpense =
    expenseData?.reduce((expense, entry) => {
      const month = new Date(entry.date).toLocaleDateString('en-US', {
        month: 'short'
      });
      expense[month] = (expense[month] || 0) + entry.amount;
      return expense;
    }, {}) || {};

  const resultObj = { ...countRevenue };

  for (const [key, value] of Object.entries(countExpense)) {
    if (resultObj[key]) {
      resultObj[key] -= value;
    } else {
      resultObj[key] = value;
    }
  }

  // Create an array of objects with "Month" and "Amount" keys
  const netIncome = Object.entries(resultObj).map(([Month, Amount]) => ({
    Month,
    Amount
  }));

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
              right: 10
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              style={{ fontSize: '14px' }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: '1' }}
              style={{ fontSize: '14px' }}
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
      <DashboardBox gridArea="b">
        <BoxHeader title="Net Income" />
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            width={500}
            height={400}
            data={netIncome}
            margin={{
              top: 15,
              right: 10
            }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary.second}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary.second}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="Month"
              tickLine={false}
              style={{ fontSize: '14px' }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: '1' }}
              style={{ fontSize: '14px' }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Amount"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill={palette.primary.second}
              fill="url(#colorIncome)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader title="Revenue" />
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={revenueData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill={palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
