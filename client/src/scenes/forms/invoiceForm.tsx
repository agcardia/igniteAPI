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
        totalAmount:"",
        date: dayjs(),
        project:"",
        client:"",
        description:"",
        price:"",
        paid:false,
        sent:false,
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
        totalAmount: yup
                .string()
                .matches(amountRegex,'enter a valid amount')
                .required("required"),
        date: yup.mixed()
                .test("is-dayjs", "Invalid date", dayjsValidation)
                .nullable()
                .required("Date is required"),
        project: yup.string().required("required"),
        client: yup.string().required("required"),
        invoiced: yup.boolean().required("required"),
        description: yup.string().required("required"),
        price: yup.string().required("required"),
        paid: yup.boolean().required("required"),
        sent: yup.boolean().required("required"),
    });

    return (
    <Box m="20px" >
        <Header title="Make Invoice" subtitle="Make a New Invoice"/>
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
                            value={values.totalAmount}
                            name="totalAmount"
                            error={!!touched.totalAmount && !!errors.totalAmount}
                            sx ={{gridColumn:"span 2"}}
                        />
                         <TextField 
                            fullWidth 
                            variant="filled" 
                            type="text"             
                            label="Price" 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.price}
                            name="price"
                            error={!!touched.price && !!errors.price}
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
                            sx ={{gridColumn:"span 2"}}
                        />
                        <TextField 
                            fullWidth 
                            variant="filled" 
                            type="text"             
                            label="Client" 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.client}
                            name="client"
                            error={!!touched.client && !!errors.client}
                            sx ={{gridColumn:"span 1"}}
                        />
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
                                value={values.paid}
                                onChange={handleChange}
                                id="paid"
                            >
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            </RadioGroup>
                        </Box>
        
                        <Box sx={{gridColumn:" span 1", textAlign:"left"}}>
                            <FormLabel>Sent</FormLabel>
                            <RadioGroup
                                name="sent"
                                id="sent"
                                value={values.sent}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            </RadioGroup>
                        </Box>
                        <Box sx={{gridColumn:"span 4", textAlign:"center"}}>
                            <Button type="submit" onSubmit = {handleReset} variant="contained">
                                Create New Invoice
                            </Button>
                        </Box>
                    </Box>
            </form>
            )}
        </Formik>
    </Box>);
}

export default InvoiceForm;
