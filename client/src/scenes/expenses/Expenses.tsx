import {useState, useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Expenses = () => {

    const [data,setData] = useState<Array<any>>([]);

    useEffect(() => {
        fetch('http://localhost:5000/expense')
            .then(res => res.json())
            .then(data => setData(data.Results))
    },[]);

    console.log(data);

    const columns = [
        {field:"_id", headerName:"ID", flex:1},
        {field:"amount",headerName:"Amount", flex:1},
        {field:"date", headerName:"Date",flex:1},
        {field:"description", headerName:"Description",flex:1},
        {field:"name",headerName:"Name",flex:1},
        {field:"payMethod", headerName:"Pay Method",flex:1},
    ]

    return (
        <Box height="75vh" m="40px 0 0 0">
            <DataGrid getRowId={(row)=>row._id} checkboxSelection rows={data} columns={columns}/>
        </Box>
    )
}

export default Expenses
