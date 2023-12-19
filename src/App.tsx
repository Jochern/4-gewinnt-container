import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { AppBar,Toolbar, Typography } from '@mui/material';
import AlertDialog from './AlertDialog';
import MuiToggleButton from '@mui/material/ToggleButton';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import TextField from '@mui/material/TextField';

let turn: boolean = true;
let winnerstatus = false;
let bot: boolean = false;
let voll: boolean[] = [false, false, false, false, false, false, false];

export let reset: boolean = false;

const ToggleButton = styled(MuiToggleButton)(({}) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "#ad264a",
  }
}));

const schriftArt = 'Arial';

const defaultTheme = createTheme({
  typography: {
    fontFamily: schriftArt,
  },
});
function allTrue(): boolean{
  let temp = 0;
  voll.forEach((element) => {
    if(element){
      temp++;
    }
  });

  return temp == 7;
}

function isColumnFull(currentGamefield: any[], columnIndex: number): boolean {

  // Überprüfe, ob die oberste Zelle in der Spalte bereits belegt ist
  let istVoll = currentGamefield[0][columnIndex] !== ' ';

  if(istVoll){
    voll[columnIndex] = true;
  }
  return istVoll;
}

function App() {
  const [windowDimensions, setWindowDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  const [activePlayer, setActivePlayer] = useState(1);
  const [playerOne, setPlayerOne] = useState('Spieler 1');
  const [playerTwo, setPlayerTwo] = useState('Spieler 2');
  const [isInputDone1, setInputDone1] = useState(false);
  const [isInputDone2, setInputDone2] = useState(false);

  const handlePlayerOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerOne(event.target.value);
  };

  const handlePlayerTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerTwo(event.target.value);
  };

  const handleKeyPress1 = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      setInputDone1(true); // Eingabe ist abgeschlossen
    }
  };
  const handleKeyPress2 = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      setInputDone2(true); // Eingabe ist abgeschlossen
    }
  };

  function changeBotStatus(){
    if(bot){
      bot = false;
      setPlayerTwo("Spieler 2"); // Setze den Namen von Spieler 2 auf "Spieler 2"
    }
    else{
      bot = true;
      setPlayerTwo("Bot"); // Setze den Namen von Spieler 2 auf "Bot"
    }
  }


  useEffect(() => {
    document.title = "Four In A Row"

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
    borderRadius: '20px'
  };

  const buttonStyle1 = {
    width: windowDimensions.width > 480 ? '10vw' : '1vw', // if the screen width is greater than 480px, width is first, otherwise it's second
    height: windowDimensions.width > 480 ? '7vh' : '5vh', // same for the height
    borderRadius: '15px', // Abrunden der Ecken
  };

  const buttonStyleBot = {
    width: windowDimensions.width > 480 ? '10vw' : '9vw', // if the screen width is greater than 480px, width is first, otherwise it's second
    height: windowDimensions.width > 480 ? '7vh' : '5vh', // same for the height
    borderRadius: '20px',
  };

  const buttonStyleW = {
    width: windowDimensions.width > 480 ? '8vw' : '1vw', // if the screen width is greater than 480px, width is first, otherwise it's second
    height: windowDimensions.width > 480 ? '9vh' : '5vh', // same for the height
    backgroundColor: 'Green',
    color: 'Black',
    fontWeight: 'bold',
    borderRadius: '20px'
  };

  const buttonStyleR = {
    width: windowDimensions.width > 480 ? '8vw' : '1vw',
    height: windowDimensions.width > 480 ? '9vh' : '5vh',
    backgroundColor: 'Red',
    color: 'Black',
    fontWeight: 'bold',
    borderRadius: '20px'
  };

  const buttonStyleY = {
    width: windowDimensions.width > 480 ? '8vw' : '1vw',
    height: windowDimensions.width > 480 ? '9vh' : '5vh',
    backgroundColor: 'Yellow',
    color: 'Black',
    fontWeight: 'bold',
    borderRadius: '20px'
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
    reset = true;
  }

  function clearDraw(){
    setDialogTitle("Unentschieden!");
    setOpen(true);
    voll = [false, false, false, false, false, false, false];

  }

  const [player1Stats, setPlayer1Stats] = useState(0);
  const [player2Stats, setPlayer2Stats] = useState(0);
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

        if (!bot){

          if (turn){
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
          if (turn) {
            newGamefield[i][colIndex] = 'X'; // 'X' für Spieler 1
            turn = false;
            checkWinner(newGamefield);

            if(!winnerstatus){
            botMove();
            break;
          }
          }
        }
      }
    }

    setGamefield(newGamefield);
    checkWinner(newGamefield);

    function checkWinner(gamefield: any): void {
      if (!turn) {
        checkRowsX(gamefield);
        checkColumnsX(gamefield);
        checkDiagonalsX(gamefield);
      } else {
        checkRowsO(gamefield);
        checkColumnsO(gamefield);
        checkDiagonalsO(gamefield);
      }
      if (winnerstatus) {
        if (turn) {
          setPlayer2Stats(player2Stats + 1);
          setDialogTitle("O hat gewonnen");
        } else {
          setPlayer1Stats(player1Stats + 1);
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

    function botMove(): void {
      const bestMove = findBestMove();
  
      if (bestMove !== null) {
          const [row, col] = bestMove;
          placeCoin(row, col);
      } else {
          makeRandomMove();
      }
  
      checkWinner(gamefield);
  }
    function findBestMove(): [number, number] | null {
      //const rows = gamefield.length;
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
        //const rows = gamefield.length;
        //const cols = gamefield[0].length;

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
        return -1; 
    }

    function placeCoin(row: number, col: number): void {
        gamefield[row][col] = 'O';
        turn = true;
    }

    isColumnFull(gamefield,colIndex);

    if (allTrue()) {
      clearDraw();
    }
    setActivePlayer(turn ? 1 : 2);

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
  // Breite eines Spielbrett-Buttons berechnen
  const buttonWidth = windowDimensions.width > 480 ? '5vw' : '20vw';

  // Gesamtbreite des Spielbretts berechnen (7 Spalten im Spielbrett)
  const gameBoardWidth = `calc(11 * ${buttonWidth})`;



  // noinspection XmlDeprecatedElement
  return (

    <ThemeProvider theme={defaultTheme}>

      <AlertDialog onClosed={onClose} onReset={onReset} visible={isOpen} title={dialogTitle} />

      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap flex={1} style={{ fontFamily: schriftArt }}>
            Four In A Row
          </Typography>

          <Typography variant="h6" color="inherit" noWrap flex={1} style={{ fontFamily: schriftArt }}>
            {playerOne} Siege: {player1Stats}
          </Typography>

          <Typography variant="h6" color="inherit" noWrap flex={1} style={{ fontFamily: schriftArt }}>
            {playerTwo} Siege: {player2Stats}
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
            Präsentation
          </Button>

          <Button
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D"
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

        <Box display="flex" flexDirection="column" alignItems="center" width={gameBoardWidth}>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} md={6}>
              {!isInputDone1 && (
                  <TextField
                  onKeyPress={handleKeyPress1}
                  id="outlined-basic"
                  label="Spieler 1"
                  variant="outlined"
                  InputProps={{
                    style: {
                      backgroundColor: 'white',
                      display: 'flex',
                      justifyContent: 'center',  // Zentriert die Eingabe horizontal
                    }
                  }}
                  inputProps={{
                    style: {
                      color: 'black',
                      textAlign: 'center',  // Zentriert den Text horizontal
                    }
                  }}
                  onChange={handlePlayerOneChange}
                />

              )}
              <Typography variant="h6" style={{ background: activePlayer === 1 ? 'green' : 'transparent', padding: '10px', color: 'white', fontSize: windowDimensions.width > 480 ? '1rem' : '0.8rem', textAlign: 'center', borderRadius: '10px',}}>
                {playerOne}
              </Typography>

            </Grid>
            <Grid item xs={12} md={6}>
              {!isInputDone2 && !bot && ( // Überprüfen Sie hier, ob der Bot aktiviert ist
                  <TextField
                  onKeyPress={handleKeyPress2}
                  id="outlined-basic"
                  label="Spieler 2"
                  variant="outlined"
                  InputProps={{
                    style: {
                      backgroundColor: 'white',
                      display: 'flex',
                      justifyContent: 'center',  // Zentriert die Eingabe horizontal
                    }
                  }}
                  inputProps={{
                    style: {
                      color: 'black',
                      textAlign: 'center',  // Zentriert den Text horizontal
                    }
                  }}
                  onChange={handlePlayerTwoChange}
                />

              )}

          <Typography variant="h6" style={{ background: activePlayer === 2 ? 'green' : 'transparent', padding: '10px', color: 'white', fontSize: windowDimensions.width > 480 ? '1rem' : '0.8rem', textAlign: 'center', borderRadius: '10px',}}>
            {playerTwo}
          </Typography>

            </Grid>
          </Grid>

          <Grid>
          {gamefield.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{renderButton(cell, colIndex, rowIndex)}</td>
              ))}
            </tr>
          ))}
          </Grid>

        </Box>

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
              style={buttonStyleBot}
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