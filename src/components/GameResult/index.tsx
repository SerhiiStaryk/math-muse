import type { GameType, ResultsRecord } from '@/types';
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

type GameResultProps = {
  type: GameType;
  items: ResultsRecord;
};

export const GameResult = ({ type, items }: GameResultProps) => {
  const itemsArray = Object.values(items);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant='h6'
        gutterBottom
      >
        Game Results ({type})
      </Typography>
      {itemsArray.length === 0 ? (
        <Typography>No results yet. Play a game!</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ margin: 'auto', maxHeight: 300, overflowY: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Correct</TableCell>
                <TableCell>Attemps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsArray.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.task}</TableCell>
                  <TableCell>{entry.correct}</TableCell>
                  <TableCell>{entry.attempts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
