import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { AppBar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import AlertDialog from './AlertDialog';
import CheckIcon from '@mui/icons-material/Check';
import MuiToggleButton from '@mui/material/ToggleButton';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

let turn: boolean = true;
let winnerstatus = false;
let i: number = 0;
let bot: boolean = false;
let voll: boolean[] = [false, false, false, false, false, false, false];

export let reset: boolean = false;


function changeBotStatus(){
  if(bot === true){
    bot = false;
  }
  else{
    bot = true;
  }
}

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "#ad264a",
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const schriftArt = 'Roboto, sans-serif';

const defaultTheme = createTheme({
  typography: {
    fontFamily: schriftArt,
  },
});
function allTrue(): boolean{
  let temp = 0;
  voll.forEach((element, index) => {
    if(element === true){
      //console.log("element "+ element);
      temp++;
      //console.log("temp "+ temp);
    }
  });

  if(temp == 7){
    return true;
  }
  else {
    return false;
  }
}

function isColumnFull(currentGamefield: any[], columnIndex: number): boolean {

  // Überprüfe, ob die oberste Zelle in der Spalte bereits belegt ist
  let istvoll = currentGamefield[0][columnIndex] !== ' ';

  if(istvoll){
    voll[columnIndex] = true;
    //console.log("Spalte" + columnIndex + "ist voll!");
  }
  return istvoll;
}

function App() {
  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    document.title = "4 Gewinnt"

    function handleResize() {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [gamefield, setGamefield] = useState([
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ]);

  const buttonStyle = {
    width: windowDimensions.width > 480 ? '8vw' : '1vw', // if the screen width is greater than 480px, width is first, otherwise it's second
    height: windowDimensions.width > 480 ? '9vh' : '5vh', // same for the height
    backgroundColor: 'white',
  };

  const buttonStyle1 = {
    width: windowDimensions.width > 480 ? '10vw' : '1vw', // if the screen width is greater than 480px, width is first, otherwise it's second
    height: windowDimensions.width > 480 ? '7vh' : '5vh', // same for the height
  };

  const buttonStyleW = {
    width: windowDimensions.width > 480 ? '8vw' : '1vw', // if the screen width is greater than 480px, width is first, otherwise it's second
    height: windowDimensions.width > 480 ? '9vh' : '5vh', // same for the height
    backgroundColor: 'Green',
    color: 'Black',
    fontWeight: 'bold',
  };

  const buttonStyleR = {
    width: windowDimensions.width > 480 ? '8vw' : '1vw', // if the screen width is greater than 480px, width is first, otherwise it's second
    height: windowDimensions.width > 480 ? '9vh' : '5vh', // same for the height
    backgroundColor: 'Red',
    color: 'Black',
    fontWeight: 'bold',
  };

  const buttonStyleY = {
    width: windowDimensions.width > 480 ? '8vw' : '1vw', // if the screen width is greater than 480px, width is first, otherwise it's second
    height: windowDimensions.width > 480 ? '9vh' : '5vh', // same for the height
    backgroundColor: 'Yellow',
    color: 'Black',
    fontWeight: 'bold',
  };

  function setGamefieldAndWinnerStatus() {
    setGamefield([
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ]);
    winnerstatus = false;
    turn = true;
    i = 0;
    reset = true;
  }

  function clearDraw(){
    setDialogTitle("Unentschieden!");
    setOpen(true);
    //alert("Unentschieden, Spielfeld wird zurückgesetzt");
    i = 0;
    voll = [false, false, false, false, false, false, false];

  }

  const [isOpen, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');

  const onClose = () => {
    setOpen(false);
    reset = true;
  }

  const onReset = () => {
    setOpen(false);
    setGamefieldAndWinnerStatus();
  }

  function addCoinCol(colIndex: number) {
    reset = false;
    const newGamefield = [...gamefield];

    for (let i = gamefield.length - 1; i >= 0; i--) {

      if (newGamefield[i][colIndex] === ' ') {

        if (bot === false){

          if (turn === true){
            newGamefield[i][colIndex] = 'X'; // 'X' für Spieler 1
            turn = false;
            break;
          }

          else {
            newGamefield[i][colIndex] = 'O'; // 'O' für Spieler 2
            turn = true;
            break;
          }
        }
        else{
          if (turn === true) {
            newGamefield[i][colIndex] = 'X'; // 'X' für Spieler 1
            turn = false;
            checkWinner(newGamefield);

            if(winnerstatus === false){
            botMove();
            break;
          }
          }
        }
      }
    }

    setGamefield(newGamefield);
    checkWinner(newGamefield);

    if(!isColumnFull(newGamefield, colIndex)) {
      //console.log("Spalte nicht voll.");
    }
    else{
      //console.log("Spalte voll!");
    }

    function checkWinner(gamefield: any): void {
      if (turn === false) {
        checkRowsX(gamefield);
        checkColumnsX(gamefield);
        checkDiagonalsX(gamefield);
      } else {
        checkRowsO(gamefield);
        checkColumnsO(gamefield);
        checkDiagonalsO(gamefield);
      }
      if (winnerstatus === true) {
        if (turn === true) {
          setDialogTitle("O hat gewonnen");
        } else {
          setDialogTitle("X hat gewonnen");
        }
        setOpen(true);
      }
    }
    
    function checkRowsX(gamefield: any): void {
      for (let row = 0; row < gamefield.length; row++) {
        for (let col = 0; col <= gamefield[row].length - 4; col++) {
          const symbol = gamefield[row][col];
          if (symbol === 'X' && gamefield[row][col + 1] === symbol && gamefield[row][col + 2] === symbol && gamefield[row][col + 3] === symbol) {
            winnerstatus = true; // Gewinner in der Reihe gefunden
            gamefield[row][col] = 'W';
            gamefield[row][col + 1] = 'W';
            gamefield[row][col + 2] = 'W';
            gamefield[row][col + 3] = 'W';
            return;
          }
        }
      }
    }
    
    function checkRowsO(gamefield: any): void {
      for (let row = 0; row < gamefield.length; row++) {
        for (let col = 0; col <= gamefield[row].length - 4; col++) {
          const symbol = gamefield[row][col];
          if (symbol === 'O' && gamefield[row][col + 1] === symbol && gamefield[row][col + 2] === symbol && gamefield[row][col + 3] === symbol) {
            winnerstatus = true; // Gewinner in der Reihe gefunden
            gamefield[row][col] = 'W';
            gamefield[row][col + 1] = 'W';
            gamefield[row][col + 2] = 'W';
            gamefield[row][col + 3] = 'W';
            return;
          }
        }
      }
    }
    
    function checkColumnsX(gamefield: any): void {
      for (let col = 0; col < gamefield[0].length; col++) {
        for (let row = 0; row <= gamefield.length - 4; row++) {
          const symbol = gamefield[row][col];
          if (symbol === 'X' && gamefield[row + 1][col] === symbol && gamefield[row + 2][col] === symbol && gamefield[row + 3][col] === symbol) {
            winnerstatus = true; // Gewinner in der Spalte gefunden
            gamefield[row][col] = 'W';
            gamefield[row + 1][col] = 'W';
            gamefield[row + 2][col] = 'W';
            gamefield[row + 3][col] = 'W';
            return;
    
          }
        }
      }
    }
    
    function checkColumnsO(gamefield: any): void {
      for (let col = 0; col < gamefield[0].length; col++) {
        for (let row = 0; row <= gamefield.length - 4; row++) {
          const symbol = gamefield[row][col];
          if (symbol === 'O' && gamefield[row + 1][col] === symbol && gamefield[row + 2][col] === symbol && gamefield[row + 3][col] === symbol) {
            winnerstatus = true; // Gewinner in der Spalte gefunden
            gamefield[row][col] = 'W';
            gamefield[row + 1][col] = 'W';
            gamefield[row + 2][col] = 'W';
            gamefield[row + 3][col] = 'W';
            return;
          }
        }
      }
    }
    
    function checkDiagonalsX(gamefield: any): void {
      const rows = gamefield.length;
      const cols = gamefield[0].length;
    
      for (let row = 3; row < rows; row++) {
        for (let col = 0; col <= cols - 4; col++) {
          const symbol = gamefield[row][col];
    
          // Diagonale von links oben nach rechts unten \
          if (symbol === 'X' && gamefield[row - 1][col + 1] === 'X' && gamefield[row - 2][col + 2] === 'X' && gamefield[row - 3][col + 3] === 'X') {
            winnerstatus = true; // Gewinner in der Diagonale gefunden
            gamefield[row][col] = 'W';
            gamefield[row - 1][col + 1] = 'W';
            gamefield[row - 2][col + 2] = 'W';
            gamefield[row - 3][col + 3] = 'W';
            return;
          }
    
          // Diagonale von rechts oben nach links unten /
          if (col < cols - 3 && symbol === 'X' && gamefield[row - 1][col + 1] === 'X' && gamefield[row - 2][col + 2] === 'X' && gamefield[row - 3][col + 3] === 'X') {
            winnerstatus = true; // Gewinner in der Diagonale gefunden
            gamefield[row][col] = 'W';
            gamefield[row - 1][col + 1] = 'W';
            gamefield[row - 2][col + 2] = 'W';
            gamefield[row - 3][col + 3] = 'W';
            return;
          }
        }
    
        for (let col = 3; col < cols; col++) {
          const symbol = gamefield[row][col];
    
          // Diagonale von rechts unten nach links oben /
          if (symbol === 'X' && gamefield[row - 1][col - 1] === 'X' && gamefield[row - 2][col - 2] === 'X' && gamefield[row - 3][col - 3] === 'X') {
            winnerstatus = true; // Gewinner in der Diagonale gefunden
            gamefield[row][col] = 'W';
            gamefield[row - 1][col - 1] = 'W';
            gamefield[row - 2][col - 2] = 'W';
            gamefield[row - 3][col - 3] = 'W';
            return;
          }
    
          // Diagonale von links unten nach rechts oben \
          if (symbol === 'X' && gamefield[row - 1][col + 1] === 'X' && gamefield[row - 2][col + 2] === 'X' && gamefield[row - 3][col + 3] === 'X') {
            winnerstatus = true; // Gewinner in der Diagonale gefunden
            gamefield[row][col] = 'W';
            gamefield[row - 1][col + 1] = 'W';
            gamefield[row - 2][col + 2] = 'W';
            gamefield[row - 3][col + 3] = 'W';
            return;
          }
        }
      }
    }
    
    function checkDiagonalsO(gamefield: any): void {
      const rows = gamefield.length;
      const cols = gamefield[0].length;
    
      for (let row = 3; row < rows; row++) {
        for (let col = 0; col <= cols - 4; col++) {
          const symbol = gamefield[row][col];
    
          // Diagonale von links oben nach rechts unten \
          if (symbol === 'O' && gamefield[row - 1][col + 1] === 'O' && gamefield[row - 2][col + 2] === 'O' && gamefield[row - 3][col + 3] === 'O') {
            winnerstatus = true; // Gewinner in der Diagonale gefunden
            gamefield[row][col] = 'W';
            gamefield[row - 1][col + 1] = 'W';
            gamefield[row - 2][col + 2] = 'W';
            gamefield[row - 3][col + 3] = 'W';
            return;
          }
    
          // Diagonale von rechts oben nach links unten /
          if (col < cols - 3 && symbol === 'O' && gamefield[row - 1][col + 1] === 'O' && gamefield[row - 2][col + 2] === 'O' && gamefield[row - 3][col + 3] === 'O') {
            winnerstatus = true; // Gewinner in der Diagonale gefunden
            gamefield[row][col] = 'W';
            gamefield[row - 1][col + 1] = 'W';
            gamefield[row - 2][col + 2] = 'W';
            gamefield[row - 3][col + 3] = 'W';
            return;
          }
        }
    
        for (let col = 3; col < cols; col++) {
          const symbol = gamefield[row][col];
    
          // Diagonale von rechts unten nach links oben /
          if (symbol === 'O' && gamefield[row - 1][col - 1] === 'O' && gamefield[row - 2][col - 2] === 'O' && gamefield[row - 3][col - 3] === 'O') {
            winnerstatus = true; // Gewinner in der Diagonale gefunden
            gamefield[row][col] = 'W';
            gamefield[row - 1][col - 1] = 'W';
            gamefield[row - 2][col - 2] = 'W';
            gamefield[row - 3][col - 3] = 'W';
            return;
          }
    
          // Diagonale von links unten nach rechts oben \
          if (symbol === 'O' && gamefield[row - 1][col + 1] === 'O' && gamefield[row - 2][col + 2] === 'O' && gamefield[row - 3][col + 3] === 'O') {
            winnerstatus = true; // Gewinner in der Diagonale gefunden
            gamefield[row][col] = 'W';
            gamefield[row - 1][col + 1] = 'W';
            gamefield[row - 2][col + 2] = 'W';
            gamefield[row - 3][col + 3] = 'W';
            return;
          }
        }
      }
    }

    if (winnerstatus === true) {
      /*setTimeout(() => {
        setGamefieldAndWinnerStatus();
      }, 5000);*/
    }
    //console.log("Gewonnen "+ winnerstatus);
    function botMove(): void {
      const bestMove = findBestMove();
  
      if (bestMove !== null) {
          const [row, col] = bestMove;
          placeCoin(row, col);
      } else {
          makeRandomMove();
      }
  
      // Optionally, you may want to check for a winner after each move
      checkWinner(gamefield);
  }
    function findBestMove(): [number, number] | null {
      const rows = gamefield.length;
      const cols = gamefield[0].length;

      // Check for winning move for 'O'
      for (let col = 0; col < cols; col++) {
          const row = getLowestEmptyRow(col);
          if (row !== -1 && checkWinningMove(row, col, 'O')) {
              return [row, col];
          }
      }

      // Check for blocking opponent's winning move for 'X'
      for (let col = 0; col < cols; col++) {
          const row = getLowestEmptyRow(col);
          if (row !== -1 && checkWinningMove(row, col, 'X')) {
              return [row, col];
          }
      }

      // If no winning or blocking move, make a random move
      return makeRandomMove();
  }

    function checkWinningMove(row: number, col: number, symbol: string): boolean {
        const rows = gamefield.length;
        const cols = gamefield[0].length;

        return (
            checkConsecutive(row, col, 0, 1, symbol) || // Horizontal
            checkConsecutive(row, col, 1, 0, symbol) || // Vertical
            checkConsecutive(row, col, 1, 1, symbol) || // Diagonal \
            checkConsecutive(row, col, 1, -1, symbol)   // Diagonal /
        );
    }

    function checkConsecutive(row: number, col: number, rowIncrement: number, colIncrement: number, symbol: string): boolean {
        const consecutiveCount = 3; // Number of consecutive symbols needed to win

        for (let i = 1; i <= consecutiveCount; i++) {
            const newRow = row + i * rowIncrement;
            const newCol = col + i * colIncrement;

            if (
                newRow < 0 || newRow >= gamefield.length ||
                newCol < 0 || newCol >= gamefield[0].length ||
                gamefield[newRow][newCol] !== symbol
            ) {
                return false;
            }
        }

        return true;
    }

    function makeRandomMove(): [number, number] | null {
        const availableColumns = [];

        for (let j = 0; j < gamefield[0].length; j++) {
            for (let i = gamefield.length - 1; i >= 0; i--) {
                if (gamefield[i][j] === ' ') {
                    availableColumns.push({ row: i, col: j });
                    break;
                }
            }
        }

        if (availableColumns.length === 0) {
            // The board is full, handle accordingly (e.g., choose another column or end the game)
            return null;
        }

        const randomMove = availableColumns[Math.floor(Math.random() * availableColumns.length)];
        placeCoin(randomMove.row, randomMove.col);
        return [randomMove.row, randomMove.col];
    }

    function getLowestEmptyRow(col: number): number {
        for (let i = gamefield.length - 1; i >= 0; i--) {
            if (gamefield[i][col] === ' ') {
                return i;
            }
        }
        return -1; // Column is full, should not reach here if used correctly
    }

    function placeCoin(row: number, col: number): void {
        gamefield[row][col] = 'O';
        turn = true;
    }

    //console.log(voll);

    if (allTrue() == true) {
      //console.log("Alles Voll!" + allTrue());
      clearDraw();
    }
  }

  function renderButton(cell: string, colIndex: number, rowIndex: number) {
    const isWinningCell = cell === 'W';

    let buttonStyleToUse;

    switch (cell) {
      case 'W':
        buttonStyleToUse = buttonStyleW;
        break;
      case 'X':
        buttonStyleToUse = buttonStyleR;
        break;
      case 'O':
        buttonStyleToUse = buttonStyleY;
        break;
      default:
        buttonStyleToUse = buttonStyle;
    }

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => addCoinCol(colIndex)}
        style={buttonStyleToUse}
        key={`${rowIndex}-${colIndex}`}
        disabled={isWinningCell}
      >
        {cell}
      </Button>
    );
  }
  const [selected, setSelected] = React.useState(false);
  return (

    <ThemeProvider theme={defaultTheme}>

      <AlertDialog onClosed={onClose} onReset={onReset} visible={isOpen} title={dialogTitle} />

      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap flex={1} style={{ fontFamily: schriftArt }}>
            4 Gewinnt
          </Typography>

          <Button
            component="a"
            href="https://webdesign.thepic.de"
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            color="inherit"
            style={{ marginRight: '20px', fontSize: '1.2rem', fontFamily: schriftArt }}
          >
            Home
          </Button>

          <Button
            component="a"
            href="https://webdesign.thepic.de"
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            color="inherit"
            style={{ marginRight: '20px', fontSize: '1.2rem', fontFamily: schriftArt }}
          >
            About us
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#292d2e"
      >
        <Grid>
          {gamefield.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{renderButton(cell, colIndex, rowIndex)}</td>
              ))}
            </tr>
          ))}
        </Grid>

        <Box
          display="flex"
          flexDirection="row"
          sx={{
            mx: "auto",
            width: 100,
            m: 2
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setGamefieldAndWinnerStatus()}
            style={buttonStyle1}
            sx={{
              m: 1,
            }}
          >
            Reset
          </Button>
          <ToggleButton
            value="check"
            selected={selected}
            onChange={() => {
              changeBotStatus()
              setSelected(!selected);
            }}
            sx={{
              m: 1,
            }}
            >
            <SmartToyOutlinedIcon color="primary" fontSize="large" />
          </ToggleButton>
        </Box>
      </Box>
    </ThemeProvider>
);
}
export default App;
interface DiaTextState {
  text: string;
}

class DiaText extends React.Component<{}, DiaTextState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      text: 'Hello world!',
    };
  }

  handleTextChange = () => {
    this.setState({ text: 'This is my new text!' });
  };

  render() {
    return (
      <div>
        <h2>{this.state.text}</h2>
        <button onClick={this.handleTextChange}>Change text</button>
      </div>
    );
  }
}

// export default DiaText;


