import {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../../components/Header';

const Revenue = () => {

    const [data,setData] = useState<Array<any>>([])

    useEffect(() => {
        fetch('http://localhost:5000/revenue')
        .then(res => res.json())
        .then(data => setData(data.Results))
    })

    const columns = [
        {field:"_id", headerName:"ID", flex:1},
        {field:"name",headerName:"Name",flex:1},
        {field:"amount",headerName:"Amount", flex:1},
        {field:"date", headerName:"Date",flex:1},
        {field:"invoiced",headerName:"Invoiced",flex:1},
        {field:"paid", headerName:"Paid",flex:1},
        {field:"payMethod", headerName:"Pay Method",flex:1},
    ]

    return (
        <Box m="20px">
            <Header title="Revenue" subtitle="List of revenue"/>
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

export default Revenue;
