import FlexBetween from './FlexBetween';
import { Typography } from '@mui/material';

type Props = {
  title: string;
};

const BoxHeader = ({ title }: Props) => {
  return (
    <FlexBetween ml="40px">
      <Typography variant="h6">{title}</Typography>
    </FlexBetween>
  );
};

export default BoxHeader;
