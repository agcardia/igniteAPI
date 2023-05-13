import DashboardBox from '../../components/DashboardBox';

const Row1 = () => {
  return (
    <>
      <DashboardBox gridArea="a">Revenue and Expense</DashboardBox>
      <DashboardBox gridArea="b">Profit and Revenue</DashboardBox>
      <DashboardBox gridArea="c">Revenue by Day/Month</DashboardBox>
    </>
  );
};

export default Row1;
