import {Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Typography} from '@mui/material';
import {useState} from 'react';
import Header from '../../components/Header';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FormikValues } from 'formik/dist/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { NullLiteral } from 'typescript';

const ExpenseForm = () => {

    const [name,setName] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [description, setDescription] = useState<string>("");
    const [method,setMethod] = useState<string>("");
    const [amount, setAmount] = useState<string>("") 

    const handleFormSubmit = (data:FormikValues) => {
        console.log("submit");
    }

    const initialValues = {
        name:"",
        date: null as Dayjs|null,
        description:"",
        amount:"",
        payMethod:""
    }

    const handleDateChange = (newValue: Dayjs | null) => {
        setDate(newValue);
      };

    const amountRegex = /^\d+$/;

    const revenueValidation = yup.object().shape({

        name: yup.string().required("required"),
        date: yup.string().required("required"),
        description: yup.string().required("required"),
        amount: yup
                .string()
                .matches(amountRegex,'enter a valid amount')
                .required("required"),
        payMethod: yup.string().required("required"),
    })

    return (
    <Box m="20px" >
        <Header title="Add Expense" subtitle="Add a New Expense Entry"/>
        <Formik
            onSubmit={handleFormSubmit}
            validationSchema={revenueValidation}
            initialValues = {initialValues}
        >
            {({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4,minmax(0,1fr))"
                    >
                        <TextField 
                            fullWidth 
                            variant="filled" 
                            type="text"             
                            label="Name" 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            sx ={{gridColumn:"span 2"}}
                        />
                        <TextField 
                            fullWidth 
                            variant="filled" 
                            type="text"             
                            label="Amount" 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.amount}
                            name="amount"
                            error={!!touched.amount && !!errors.amount}
                            sx ={{gridColumn:"span 2"}}
                        />
                        <TextField 
                            fullWidth 
                            variant="filled" 
                            type="text"             
                            label="Description" 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            error={!!touched.description && !!errors.description}
                            sx ={{gridColumn:"span 4"}}
                        />
                        <Box sx={{gridColumn: "span 2", textAlign:"center"}}>
                      
                                <Typography>Pay Method</Typography>
                                <RadioGroup
                                    defaultValue="venmo"
                                    name="payMethod"
                                    value={values.payMethod}
                                    onChange = {(e:React.ChangeEvent<HTMLInputElement>)=>setMethod(e.target.value)}
                                >
                                    <FormControlLabel value="venmo" control={<Radio />} label="Venmo" />
                                    <FormControlLabel value="credit card" control={<Radio />} label="Credit Card" />
                                    <FormControlLabel value="check" control={<Radio />} label="Check" />
                                </RadioGroup>
                        </Box>
                        <Box sx={{gridColumn: "span 2", textAlign:"center"}}>  
                            <Typography>Select a Day</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={values.date}
                                    onChange={handleDateChange}
                          
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{gridColumn:"span 4", textAlign:"center"}}>
                            <Button type="submit" variant="contained">
                                Create New Expense
                            </Button>
                        </Box>
                    </Box>
            </form>
            )}
        </Formik>
    </Box>);
}

export default ExpenseForm;


