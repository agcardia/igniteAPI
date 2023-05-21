import FlexCenter from './FlexCenter';
import { Typography } from '@mui/material';

type Props = {
  title: string;
};

const BoxHeader = ({ title }: Props) => {
  return (
    <FlexCenter>
      <Typography variant="h6">{title}</Typography>
    </FlexCenter>
  );
};

export default BoxHeader;
