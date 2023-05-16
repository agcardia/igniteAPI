import DashboardBox from '../../components/DashboardBox';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { useGetExpensesQuery, useGetQuotesQuery } from '../../state/api';
import { useMemo } from 'react';
import BoxHeader from '../../components/BoxHeader';
import QuoteBox from '../../components/QuoteBox';
type Props = {};

const Row3 = (props: Props) => {
  const { data: expenseQueryData } = useGetExpensesQuery();
  const { data: quoteData } = useGetQuotesQuery();
  console.log(quoteData);
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
      <DashboardBox gridArea="j">
        {quoteData && (
          <QuoteBox title={quoteData['q']} subtitle={'- ' + quoteData['a']} />
        )}
      </DashboardBox>
    </>
  );
};

export default Row3;
