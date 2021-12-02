import React, { useState } from 'react';
import Game2 from './Game2';

const App = () => {

  const [gameId, setGameId] = useState(0);


  return (
    <Game2 key={gameId} onPlayAgain={() => setGameId(gameId + 1)} randomNumberCount={6} timeToSolve={10}/>
  );
};


export default App;