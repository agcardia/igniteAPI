import FlexCenter from './FlexCenter';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material';

type Props = {
  title: string;
};

const BoxHeader = ({ title }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexCenter>
      <Typography variant="h6" fontWeight="bold" color={palette.primary.main}>{title}</Typography>
    </FlexCenter>
  );
};

export default BoxHeader;
