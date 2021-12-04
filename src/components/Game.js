import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';



const Game = ({randomNumberCount, onPlayAgain, timeToSolve, onBackToMenu}) => {

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(timeToSolve);
  const [gameStatus, setGameStatus] = useState('PLAYING');

  const intervalId = useRef(null);


  const randomNumbers = useRef(Array.from({ length: randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random())));

  const target = useRef(randomNumbers.current.slice(0, randomNumberCount - 2)
    .reduce((acc, n) => acc + n, 0));
    
  const shuffledRandomNumbers = useRef(shuffle(randomNumbers.current));

  
  function caclGameStatus() {
    const sumSelected = selectedNumbers.reduce((acc, curr) => {
      return acc + shuffledRandomNumbers.current[curr];
    }, 0);


    if (remainingSeconds === 0 && sumSelected !== target.current) {
      return 'LOST';
    }

    if (sumSelected < target.current) {
      return 'PLAYING';
    } 

    if (sumSelected === target.current) {
      return 'WON';
    }

    return 'LOST';
  }

  useEffect(() => {
    if(gameStatus !== 'PLAYING') {
      clearInterval(intervalId.current);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (!remainingSeconds) {
      return;
    }

    intervalId.current = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId.current);

  }, [remainingSeconds]);


  useEffect(() => {
    if (remainingSeconds === 0) {
      setGameStatus(caclGameStatus());
    }
  }, [remainingSeconds]);

  useEffect(() => {
    setGameStatus(caclGameStatus());
  }, [selectedNumbers]);


  function isNumberSelected(numberIndex) {
    return selectedNumbers.indexOf(numberIndex) >= 0;
  }

  function selectNumber(numberIndex) {
    setSelectedNumbers([...selectedNumbers, numberIndex]);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{target.current}</Text>
      <View style={styles.randomContainer}>
        {
          shuffledRandomNumbers.current.map((rn, index) => 
            <RandomNumber  
              key={index} 
              id={index} 
              number={rn} 
              isDisabled={isNumberSelected(index) || gameStatus !== 'PLAYING'} 
              onPress={selectNumber}/>)
        }
        <Text style={styles.timer}>Time remaining: {remainingSeconds}</Text>
        {gameStatus !== 'PLAYING' && <Button color='green' title='Play Again' onPress={onPlayAgain} />}
        <Button title='Back to menu' onPress={onBackToMenu} />
      </View>
    
    </View>
  );
  
};

Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  timeToSolve: PropTypes.number.isRequired,
  onBackToMenu: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1
  },
  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb'
  },
  STATUS_WON: {
    backgroundColor: 'green'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  },
  timer: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 50
  }
});

export default Game;