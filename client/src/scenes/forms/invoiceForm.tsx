import {Box, TextField, Select, Menu, MenuItem, Button, RadioGroup, InputLabel, FormControl, FormControlLabel, FormLabel} from '@mui/material';
import Radio from '@mui/material/Radio';
import {useState} from 'react';
import Header from '../../components/Header';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { FormikValues } from 'formik/dist/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';


const InvoiceForm = () => {

    const [name,setName] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [method,setMethod] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const initialValues = {
        name:"",
        amount:"",
        payMethod:"",
        invoiced:false,
        date: dayjs(),
        paid:false,
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
            const response = await fetch('http://127.0.0.1:5000/revenue', {
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
        amount: yup
                .string()
                .matches(amountRegex,'enter a valid amount')
                .required("required"),
        payMethod: yup.string().required("required"),
        date: yup.mixed()
                .test("is-dayjs", "Invalid date", dayjsValidation)
                .nullable()
                .required("Date is required"),
        invoiced: yup.boolean().required("required"),
        paid: yup.boolean().required("required"),
    });

    return (
    <Box m="20px" >
        <Header title="Add Revenue" subtitle="Add a New Revenue Entry"/>
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
                        <Box sx={{gridColumn:"span 1", 
                                  textAlign:"left",
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
                        <Box sx={{gridColumn:" span 1", textAlign:"left"}}>
                            <FormLabel>Invoiced</FormLabel>
                            <RadioGroup
                                name="invoiced"
                                value={values.invoiced}
                                onChange={handleChange}
                                id="invoiced"
                            >
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            </RadioGroup>
                        </Box>
                        <Box sx={{gridColumn:"span 1", textAlign:"left"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker label="Choose a Date" 
                            value={date} 
                            onChange={(event:Dayjs|null)=>setDate(event)}
                            />
                        </LocalizationProvider>
                        </Box>
                        <Box sx={{gridColumn:" span 1", textAlign:"left"}}>
                            <FormLabel>Paid</FormLabel>
                            <RadioGroup
                                name="paid"
                                id="paid"
                                value={values.paid}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            </RadioGroup>
                        </Box>
                        <Box sx={{gridColumn:"span 4", textAlign:"center"}}>
                            <Button type="submit" onSubmit = {handleReset} variant="contained">
                                Create New Revenue
                            </Button>
                        </Box>
                    </Box>
            </form>
            )}
        </Formik>
    </Box>);
}

export default InvoiceForm;
