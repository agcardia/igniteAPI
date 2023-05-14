import DashboardBox from '../../components/DashboardBox';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useGetRevenuesQuery } from '../../state/api';
import { useMemo } from 'react';
import BoxHeader from '../../components/BoxHeader';

const Row2 = () => {
  const { data: revenueQueryData } = useGetRevenuesQuery();
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
      <DashboardBox gridArea="d">Clients per Month</DashboardBox>
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
