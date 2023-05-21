import { Box, Typography } from '@mui/material';
import FlexBetween from './FlexBetween';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';

interface Props {
  title: string;
  temperature: number;
  day: boolean;
  forecast: string;
}

const WeatherDisplay = (props: Props) => {
  return (
    <>
      <Typography>{props.title}</Typography>
      <FlexBetween>
        <Box>{props.day ? <WbSunnyIcon /> : <NightlightIcon />}</Box>
        <Typography>
          <ThermostatIcon /> {props.temperature}
        </Typography>
        <Typography>{props.forecast}</Typography>
      </FlexBetween>
    </>
  );
};

export default WeatherDisplay;
