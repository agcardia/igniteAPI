import {Box, TextField, Select, Menu, MenuItem, Button, Typography, InputLabel, FormControl} from '@mui/material';
import {useState} from 'react';
import Header from '../../components/Header';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { FormikValues } from 'formik/dist/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { NullLiteral } from 'typescript';

const ExpenseForm = () => {

    const [name,setName] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [description, setDescription] = useState<string>("");
    const [method,setMethod] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const initialValues = {
        name:"",
        description:"",
        amount:"",
        payMethod:"",
        date: dayjs(),
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        setDate(newValue ?? null);
      };

    const dayjsValidation = (value: any) => {
        if (!dayjs.isDayjs(value)) {
           return false;
        }
        return true;
      };

    const handleFormSubmit = async (values:any, helpers:FormikHelpers<any>) => {
        values.date = date?.toDate();
        console.log(values);

        try {
            const response = await fetch('http://127.0.0.1:5000/expense', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(values),
          });
          if(!response.ok) {
            throw new Error("failed to add expense to Cloud Database");
          }
          console.log('Expense added successfully!');
          helpers.resetForm();
          } catch (error) {
          console.error(error);
          }
    };

    const amountRegex = /^\d+(\.\d{1,2})?$/;

    const revenueValidation = yup.object().shape({

        name: yup.string().required("required"),
        description: yup.string().required("required"),
        amount: yup
                .string()
                .matches(amountRegex,'enter a valid amount')
                .required("required"),
        payMethod: yup.string().required("required"),
        date: yup.mixed()
                .test("is-dayjs", "Invalid date", dayjsValidation)
                .nullable()
                .required("Date is required"),     
    });

    return (
    <Box m="20px" >
        <Header title="Add Expense" subtitle="Add a New Expense Entry"/>
        <Formik
            onSubmit={handleFormSubmit}
            validationSchema={revenueValidation}
            initialValues = {initialValues}
        >
            {({values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset}) => (
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
                        <Box sx={{gridColumn:"span 2", 
                                  textAlign:"center",
                                  '& .MuiFormControl-root': {
                                    width: "45%"
                                  }}}>
                        <FormControl>
                        <InputLabel id="demo-simple-select-label">Pay Method</InputLabel>
                        <Select
                            labelId="payMethod"
                            id="payMethod"
                            value={values.payMethod}
                            label="payMethod"
                            onChange={handleChange}
                            name="payMethod"
                        >
                            <MenuItem value={"venmo"}>Venmo</MenuItem>
                            <MenuItem value={"credit card"}>Credit Card</MenuItem>
                            <MenuItem value={"check"}>Check</MenuItem>
                        </Select>
                        </FormControl>
                        </Box>
                        <Box sx={{gridColumn:"span 2", textAlign:"center"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker label="Choose a Date" 
                            value={date} 
                            onChange={(event:Dayjs|null)=>setDate(event)}
                            />
                        </LocalizationProvider>
                        </Box>
                        <Box sx={{gridColumn:"span 4", textAlign:"center"}}>
                            <Button type="submit" onSubmit = {handleReset} variant="contained">
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


