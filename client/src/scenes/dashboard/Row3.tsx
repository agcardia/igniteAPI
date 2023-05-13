import DashboardBox from '../../components/DashboardBox';

type Props = {};

const Row3 = (props: Props) => {
  return (
    <>
      <DashboardBox gridArea="g">List of clients</DashboardBox>
      <DashboardBox gridArea="h">Recent Expenses</DashboardBox>
      <DashboardBox gridArea="i">Weather in SF</DashboardBox>
      <DashboardBox gridArea="j">Quote of the Day</DashboardBox>
    </>
  );
};

export default Row3;
