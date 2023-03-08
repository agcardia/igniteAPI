import {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../../components/Header';

const Invoice = () => {
    const [data,setData] = useState<Array<any>>([]);

    useEffect(() => {
        fetch('http://localhost:5000/invoice')
            .then(res => res.json())
            .then(data => setData(data.Results))
    },[]);

    const columns = [
        {field:"_id", headerName:"ID", flex:1},
        {field:"name",headerName:"Name",flex:1},
        {field:"date", headerName:"Date",flex:1},
        {field:"totalAmount",headerName:"Amount", flex:1},
        {field:"client", headerName:"Client",flex:1},
        {field:"sent", headerName:"Sent",flex:1},
        {field:"paid", headerName:"Paid",flex:1},
    ]

    return (
        <Box m="20px">
            <Header title="Invoices" subtitle="All invoices" />
            <Box height="75vh" m="40px 0 0 0" sx={{
                '& .MuiDataGrid-columnHeader': {
                    backgroundColor: "#FAFAFA",
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: "#11434B"
                }
            }}>
                <DataGrid getRowId={(row)=>row._id} 
                        checkboxSelection 
                        rows={data} 
                        columns={columns} 
                        components={{ Toolbar:GridToolbar }}
                />
            </Box>
        </Box>
    )
}


export default Invoice
