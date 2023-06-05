import {
  Box,
  TextField,
  Select,
  Menu,
  MenuItem,
  Button,
  RadioGroup,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormLabel
} from '@mui/material';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import Header from '../../components/Header';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { FormikValues } from 'formik/dist/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';

const ClientForm = () => {
  const [name, setName] = useState<string>('');
  const [dateAdded, setDate] = useState<Dayjs | null>(null);

  const initialValues = {
    name: '',
    dateAdded: dayjs()
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

  const handleFormSubmit = async (values: any, helpers: FormikHelpers<any>) => {
    values.dateAdded = dateAdded?.toDate();
    console.log(values);

    try {
      const response = await fetch('http://127.0.0.1:5000/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error('failed to add expense to Cloud Database');
      }
      console.log('Client added successfully!');
      helpers.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const revenueValidation = yup.object().shape({
    name: yup.string().required('required'),
    dateAdded: yup
      .mixed()
      .test('is-dayjs', 'Invalid date', dayjsValidation)
      .nullable()
      .required('Date is required')
  });

  return (
    <Box m="20px">
      <Header title="Add Client" subtitle="Add a New Client" />
      <Formik
        onSubmit={handleFormSubmit}
        validationSchema={revenueValidation}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset
        }) => (
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
                sx={{ gridColumn: 'span 2' }}
              />
              <Box sx={{ gridColumn: 'span 2', textAlign: 'left' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Choose a Date"
                    value={dateAdded}
                    onChange={(event: Dayjs | null) => setDate(event)}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ gridColumn: 'span 4', textAlign: 'center' }}>
                <Button
                  type="submit"
                  onSubmit={handleReset}
                  variant="contained"
                >
                  Add Client
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ClientForm;
