/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render, screen, fireEvent} from '@testing-library/react-native'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('On Add todo button click intially disabled', () => {
  render(<App />)
  const addTodoButton = screen.getByTestId("addTodo");
  fireEvent.press(addTodoButton)
  expect(addTodoButton.props.accessibilityState.disabled).toBe(true);
  
});
