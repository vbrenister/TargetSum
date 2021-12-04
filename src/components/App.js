import React, { useState } from 'react';
import Game from './Game';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const App = () => {

  const [gameId, setGameId] = useState(0);
  const [gameLevel, setGameLevel] = useState(null);

  const backToMenu = () => {
    setGameLevel(null);
  };

  if (!gameLevel) {
    return (
      
      <View style={styles.difficultyList}>
        <Text style={styles.title}>Please choose your level: </Text>
        <TouchableOpacity onPress={() => setGameLevel('easy')}  style={[styles.appButtonContainer, {backgroundColor: 'green'}]}>
          <Text style={styles.appButtonText}> Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGameLevel('medium')} style={[styles.appButtonContainer, {backgroundColor: 'orange'}]}>
          <Text style={styles.appButtonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGameLevel('hard')} style={[styles.appButtonContainer, {backgroundColor: 'red'}]}>
          <Text style={styles.appButtonText}>Hard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (gameLevel === 'easy') {
    return (
      <Game key={gameId} onPlayAgain={() => setGameId(gameId + 1)} randomNumberCount={4} timeToSolve={15} onBackToMenu={backToMenu}/>
    );
  }

  if (gameLevel === 'medium') {
    return (
      <Game key={gameId} onPlayAgain={() => setGameId(gameId + 1)} randomNumberCount={6} timeToSolve={10} onBackToMenu={backToMenu}/>
    );
  }

  return (
    <Game key={gameId} onPlayAgain={() => setGameId(gameId + 1)} randomNumberCount={8} timeToSolve={6} onBackToMenu={backToMenu}/>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  difficultyList: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingTop: 80
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 20
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  }
});


export default App;