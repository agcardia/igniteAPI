import DashboardBox from '../../components/DashboardBox';

const Row2 = () => {
  return (
    <>
      <DashboardBox gridArea="d">Clients per Month</DashboardBox>
      <DashboardBox gridArea="e">Pie chart invoices sent/paid </DashboardBox>
      <DashboardBox gridArea="f">Recent Income</DashboardBox>
    </>
  );
};

export default Row2;
