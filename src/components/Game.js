import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';


class Game extends React.Component {

  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired
  };
  
  state = {
    selectedNumbers: []
  }


  randomNumbers = Array.from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, n) => acc + n, 0);

  isNumberSelected = (numberIndex) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
  }

  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedNumbers: [...prevState.selectedNumbers, numberIndex]
    }));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((rn, index) => <RandomNumber  key={index} id={index} number={rn} isDisabled={this.isNumberSelected(index)} onPress={this.selectNumber}/>)}
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1
  },
  target: {
    fontSize: 50,
    backgroundColor: '#bbb',
    margin: 50,
    textAlign: 'center'
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
});

export default Game;