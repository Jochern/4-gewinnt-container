import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { AppBar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';

let turn: boolean = true;
let winnerstatus = false;
let i: number = 0;
let dialogtitle: String;

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
      dialogtitle = "O hat gewonnen"
    } else {
      dialogtitle = "X hat gewonnen"
    }
    
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


function App() {
  const [gamefield, setGamefield] = useState([
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ]);

  const buttonStyle = {
    width: '80px',
    height: '60px',
    backgroundColor: 'white',
  };

  const buttonStyle1 = {
    width: '80px',
    height: '60px',
  };

  const buttonStyleW = {
    width: '80px',
    height: '60px',
    backgroundColor: 'Green',
    fontsize: 'bold',
  };

  const buttonStyleR = {
    width: '80px',
    height: '60px',
    backgroundColor: 'Red',
  };

  const buttonStyleY = {
    width: '80px',
    height: '60px',
    backgroundColor: 'Yellow',
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
    i = 0;
  }

  function clearDraw(){
    setGamefieldAndWinnerStatus();
    alert("Unentschieden, Spielfeld wird zurückgesetzt");
    i = 0;
  }

  function addCoinCol(colIndex: number) {
    const newGamefield = [...gamefield];
    for (let i = gamefield.length - 1; i >= 0; i--) {
      if (newGamefield[i][colIndex] === ' ') {
        if (turn === true) {
          newGamefield[i][colIndex] = 'X'; // 'X' für Spieler 1
          turn = false;
          break;
        } else {
          newGamefield[i][colIndex] = 'O'; // 'O' für Spieler 2
          turn = true;
          break;
        }
      }
    }  
    i++;
    
    setGamefield(newGamefield);
    checkWinner(newGamefield);
    if(i === 42){
      clearDraw();
    }
    if (winnerstatus === true) {
      setTimeout(() => {
        setGamefieldAndWinnerStatus();
      }, 5000);
    }
    console.log(winnerstatus);
    

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap flex={1} style={{ fontFamily: schriftArt }}>
            4 Gewinnt von Idioten
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

        <Button
          color="secondary"
          variant="contained"
          onClick={() => setGamefieldAndWinnerStatus()}
          style={buttonStyle1}
        >
          Reset
        </Button>
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


