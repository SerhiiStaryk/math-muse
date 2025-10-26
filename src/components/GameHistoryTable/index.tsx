import type { HistoryEntry } from '@/types';
import {
  Box,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

type GameHistoryTableProps = {
  history: HistoryEntry[];
};

export const GameHistoryTable = ({ history }: GameHistoryTableProps) => (
  <Box mt={4}>
    <Typography variant='h6'>Game History</Typography>
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400, margin: 'auto', maxHeight: 300, overflowY: 'auto' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number 1</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Number 2</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.num1}</TableCell>
              <TableCell>{entry.symbol}</TableCell>
              <TableCell>{entry.num2}</TableCell>
              <TableCell>{entry.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);
