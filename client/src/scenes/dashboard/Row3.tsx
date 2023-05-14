import DashboardBox from '../../components/DashboardBox';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useGetExpensesQuery } from '../../state/api';
import { useMemo } from 'react';
import BoxHeader from '../../components/BoxHeader';
type Props = {};

const Row3 = (props: Props) => {
  const { data: expenseQueryData } = useGetExpensesQuery();
  const expenseData = useMemo(() => {
    return (
      expenseQueryData &&
      expenseQueryData.Results.map(({ amount, date, name }) => {
        return {
          amount: amount,
          name: name,
          date: date.substring(0, 10)
        };
      })
    );
  }, [expenseQueryData]);
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 }
  ];

  return (
    <>
      <DashboardBox gridArea="g">List of clients</DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader title="Recent Expenses" />
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
            rows={expenseData || []}
            columns={columns}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">Weather in SF</DashboardBox>
      <DashboardBox gridArea="j">Quote of the Day</DashboardBox>
    </>
  );
};

export default Row3;
