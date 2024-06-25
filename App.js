import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  // Array de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '='];

  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  // Função para realizar os cálculos
  const calculator = () => {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    const secondNumber = parseFloat(splitNumbers[2]);

    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + secondNumber).toString());
        break;
      case '-':
        setCurrentNumber((firstNumber - secondNumber).toString());
        break;
      case '*':
        setCurrentNumber((firstNumber * secondNumber).toString());
        break;
      case '/':
        setCurrentNumber((firstNumber / secondNumber).toString());
        break;
      default:
        break;
    }
  };

  // Função para lidar com a entrada do usuário
  const handleInput = (buttonPressed) => {
    if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.slice(0, -1));
        return;
      case 'LIMPAR':
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculator();
        return;
      case '%':        
        return;
      case '+/-':
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        return;
      default:
        setCurrentNumber(currentNumber + buttonPressed.toString());
        return;
    }
  };

  return (
    <View style={styles.container}>
      {/* Área onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Área onde os botões são exibidos */}
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
            <Text style={typeof button === 'number' ? styles.textWhite : styles.textGrey}>
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
    padding: 10,
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
    padding: 10,
  },
  button: {
    width: '23%', 
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',    
    margin: '1%',
  },
  whiteButton: {
    backgroundColor: '#3c0473',
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
    color: '#fff',
  },
});