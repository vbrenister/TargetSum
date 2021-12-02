
import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const RandomNumber = ({number, isDisabled, onPress, id}) => {

  function handlePress() {
    if (!isDisabled) {
      onPress(id);
    }
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isDisabled && styles.disabled]} >{number}</Text>
    </TouchableOpacity>
  );
};

RandomNumber.propTypes = {
  number: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};


const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 150,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center'
  },
  disabled: {
    opacity: 0.3
  }
});

export default RandomNumber;