import { Box, Typography } from '@mui/material';
import FlexBetween from './FlexBetween';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { useTheme } from '@mui/material';

interface Props {
  temperature: number;
  day: boolean;
  forecast: string;
}

const WeatherDisplay = (props: Props) => {
  const { palette } = useTheme();
  const temperatureString = `${props.temperature}\u00B0F`
  return (
    <>
      <FlexBetween mt="20px" mr="10px" ml="10px" >
        <Box>{props.day ? <WbSunnyIcon sx={{fontSize: 60}}/> : <NightlightIcon sx={{fontSize: 60}} />}</Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ThermostatIcon sx={{fontSize: 60}} /> 
        <Typography variant="h6" color= {palette.primary.second} fontWeight="bold">{temperatureString}</Typography>
        </Box>
        <Typography variant="h6" color={palette.primary.second} fontWeight="bold">Forecast: {props.forecast}</Typography>
      </FlexBetween>
    </>
  );
};

export default WeatherDisplay;
