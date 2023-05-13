import FlexBetween from "../../components/FlexBetween";
import { Box } from "@mui/material";

const gridTemplate = `
    "a  b   c"
    "a  b   c"
    "a  b   c"
    "a  b   f"
    "d  e   f"
    "d  e   f"
    "d  e   i"
    "g  h   i"
    "g  h   j"
    "g  h   j"
`;

const Dashboard = () => {
  return (
    <Box 
        height="100%" 
        width="100%" 
        display="grid"
        gap="1.5rem"
        sx={{
            gridTemplateColumns: "repeat(3, minmax(170px,1fr))",
            gridTemplateRows: "repeat (10, minmax(60px, 1fr))",
            gridTemplateAreas: gridTemplate,
        }}
    >
        <Box bgcolor="white" gridArea="a">Revenue and Expense</Box>
        <Box bgcolor="white" gridArea="b">Profit and Revenue</Box>
        <Box bgcolor="white" gridArea="c">Revenue by Day/Month</Box>
        <Box bgcolor="white" gridArea="d">Clients per Month</Box>
        <Box bgcolor="white" gridArea="e">Pie chart invoices sent/paid</Box>
        <Box bgcolor="white" gridArea="f">Recent Income</Box>
        <Box bgcolor="white" gridArea="g">List of clients</Box>
        <Box bgcolor="white" gridArea="h">Recent Expenses</Box>
        <Box bgcolor="white" gridArea="i">Weather in SF</Box>
        <Box bgcolor="white" gridArea="j">Quote of the Day</Box>
    </Box>
  )
};

export default Dashboard;
