import DashboardBox from '../../components/DashboardBox';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import {
  useGetRevenuesQuery,
  useGetClientsQuery,
  useGetInvoicesQuery
} from '../../state/api';
import { useMemo } from 'react';
import BoxHeader from '../../components/BoxHeader';
import { useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import {
  BarChart,
  Bar,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Row2 = () => {
  const { data: revenueQueryData } = useGetRevenuesQuery();
  const { data: clientQueryData } = useGetClientsQuery();
  const { data: invoiceQueryData } = useGetInvoicesQuery();
  const { palette } = useTheme();
  const pieColors = [palette.primary.main, palette.primary.second];

  const clientData = useMemo(() => {
    return (
      clientQueryData &&
      clientQueryData.Results.map(({ name, dateAdded }) => {
        return {
          name: name,
          date: dateAdded.substring(0, 10)
        };
      })
    );
  }, [clientQueryData]);

  const invoiceData = useMemo(() => {
    return (
      invoiceQueryData &&
      invoiceQueryData.Results.map(({ name, date, paid, _id, client }) => {
        return {
          name: name,
          paid: paid ? 1 : 0,
          id: _id,
          client: client,
          date: date.substring(0, 10)
        };
      })
    );
  }, [invoiceQueryData]);

  const revenueData = useMemo(() => {
    return (
      revenueQueryData &&
      revenueQueryData.Results.map(({ amount, date, name }) => {
        return {
          amount: amount,
          name: name,
          date: date.substring(0, 10)
        };
      })
    );
  }, [revenueQueryData]);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 }
  ];

  const pieData = [
    {
      name: 'Paid',
      value: invoiceData && invoiceData.filter((item) => item.paid).length
    },
    {
      name: 'Not Paid',
      value: invoiceData && invoiceData.filter((item) => !item.paid).length
    }
  ];

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader title="Number of Clients" />
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={clientData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="date" fill={palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Invoices" />
        <FlexBetween ml="40px" mr="40px">
          <PieChart width={180} height={140}>
            <Legend layout="vertical" verticalAlign="center" align="right" />
            <Pie
              data={pieData}
              dataKey="value"
              stroke="none"
              innerRadius={18}
              outerRadius={35}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="5px" justifyContent="center">
            <Typography fontWeight="bold" color={palette.primary.main}>
              Paid: {pieData[0].value}
            </Typography>
            <Typography color={palette.primary.second}>
              Unpaid: {pieData[1].value}
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Recent Income" />
        <Box
          height="75%"
          mt="0.5rem"
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#FAFAFA',
              border: 'none'
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: '#11434B'
            }
          }}
        >
          <DataGrid
            getRowId={(row) => row.date}
            rows={revenueData || []}
            columns={columns}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row2;
