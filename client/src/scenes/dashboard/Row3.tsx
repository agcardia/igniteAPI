import DashboardBox from '../../components/DashboardBox';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import {
  useGetExpensesQuery,
  useGetQuotesQuery,
  useGetClientsQuery,
  useGetWeatherQuery
} from '../../state/api';
import { useMemo } from 'react';
import BoxHeader from '../../components/BoxHeader';
import QuoteBox from '../../components/QuoteBox';
import WeatherDisplay from '../../components/WeatherDisplay';
type Props = {};

const Row3 = (props: Props) => {
  const { data: expenseQueryData } = useGetExpensesQuery();
  const { data: quoteData } = useGetQuotesQuery();
  const { data: clientQueryData } = useGetClientsQuery();
  const { data: weatherData } = useGetWeatherQuery();

  const clientData = useMemo(() => {
    return (
      clientQueryData &&
      clientQueryData.Results.map(({ name, dateAdded, _id }) => {
        return {
          name: name,
          date: dateAdded.substring(0, 10),
          id: _id
        };
      })
    );
  }, [clientQueryData]);

  const expenseData = useMemo(() => {
    return (
      expenseQueryData &&
      expenseQueryData.Results.map(({ amount, date, name, _id }) => {
        return {
          amount: amount,
          name: name,
          date: date.substring(0, 10),
          id: _id
        };
      })
    );
  }, [expenseQueryData]);

  const expenseColumns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 }
  ];
  const clientColumns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 }
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="Clients" />
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
            getRowId={(row) => row.id}
            rows={clientData || []}
            columns={clientColumns}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
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
            getRowId={(row) => row.id}
            rows={expenseData || []}
            columns={expenseColumns}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="San Francisco" />
        {weatherData ? (
          <WeatherDisplay
            temperature={weatherData.temperature}
            day={weatherData.isDaytime}
            forecast={weatherData.shortForecast}
          />
        ) : (
          <Box />
        )}
      </DashboardBox>
      <DashboardBox gridArea="j">
        {quoteData && (
          <QuoteBox title={quoteData['q']} subtitle={'- ' + quoteData['a']} />
        )}
      </DashboardBox>
    </>
  );
};

export default Row3;
