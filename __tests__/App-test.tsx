/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render, screen, fireEvent} from '@testing-library/react-native'


it('On Add todo button click intially disabled', () => {
  render(<App />)
  const addTodoButton = screen.getByTestId("addTodo");
  fireEvent.press(addTodoButton)
  expect(addTodoButton.props.accessibilityState.disabled).toBe(true);
  
});
