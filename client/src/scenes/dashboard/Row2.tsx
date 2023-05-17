import DashboardBox from '../../components/DashboardBox';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useGetRevenuesQuery, useGetClientsQuery } from '../../state/api';
import { useMemo } from 'react';
import BoxHeader from '../../components/BoxHeader';
import { useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
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
  const { palette } = useTheme();

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

  console.log(clientData && clientData.length);

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
      <DashboardBox gridArea="e">Pie chart invoices sent/paid </DashboardBox>
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
