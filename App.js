import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '='];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [result, setResult] = useState('');

  const calculator = () => {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    const secondNumber = parseFloat(splitNumbers[2]);

    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + secondNumber).toString());
        return;
      case '-':
        setCurrentNumber((firstNumber - secondNumber).toString());
        return;
      case '*':
        setCurrentNumber((firstNumber * secondNumber).toString());
        return;
      case '/':
        if (secondNumber === 0) {
          Alert.alert('Erro', 'Divisão por zero não é permitida.');
        } else {
          setCurrentNumber((firstNumber / secondNumber).toString());
        }
        return;
    }
    setLastNumber(currentNumber + ' = ');
    setResult('');
  };

  const handlePercentage = () => {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    const secondNumber = parseFloat(splitNumbers[2]);

    if (splitNumbers.length === 3) {
      switch (operator) {
        case '+':
          setCurrentNumber((firstNumber + (firstNumber * secondNumber / 100)).toString());
          return;
        case '-':
          setCurrentNumber((firstNumber - (firstNumber * secondNumber / 100)).toString());
          return;
        case '*':
          setCurrentNumber(((firstNumber * secondNumber) / 100).toString());
          return;
        case '/':
          if (secondNumber === 0) {
            setCurrentNumber('Erro: Divisão por Zero');
          } else {
            setCurrentNumber((firstNumber / (firstNumber * secondNumber / 100)).toString());
          }
          return;
      }
    } else {
      setCurrentNumber((firstNumber / 100).toString());
    }
  };

  const handleInput = (buttonPressed) => {
    if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/' || buttonPressed === '%') {
      if (buttonPressed === '%') {
        handlePercentage();
      } else {
        setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      }
      setResult('');
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.slice(0, -1));
        setResult('');
        return;
      case 'LIMPAR':
        setLastNumber('');
        setCurrentNumber('');
        setResult('');
        return;
      case '=':
        calculator();
        return;
      case '+/-':
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        setResult('');
        return;
      default:
        if (result !== '') {
          setCurrentNumber(buttonPressed.toString());
          setResult('');
        } else {
          setCurrentNumber(currentNumber + buttonPressed.toString());
        }
        return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[
              styles.button,
              typeof button === 'number' ? styles.whiteButton : styles.greyButton,
              button === '=' ? [styles.textEqual, styles.equalButton] : null,
            ]}
            onPress={() => handleInput(button)}
          >
            <Text style={[typeof button === 'number' ? styles.textWhite : styles.textGrey, button === '=' ? styles.textEqual : null]}>
              {button}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c0473',
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#1c1444',
    alignItems: 'flex-end',
    padding: 55,
  },
  resultText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  historyText: {
    fontSize: 20,
    color: '#7c7c7c',
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  buttons: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 95,
    minHeight: 95,
    flex: 2,
  },
  greyButton: {
    backgroundColor: '#3c0473',
  },
  textWhite: {
    fontSize: 22,
    color: 'white',
  },
  textGrey: {
    fontSize: 22,
    color: 'grey',
  },
  equalButton: {
    backgroundColor: '#1c1444',
  },
  textEqual: {
    color: 'white',
  },
});