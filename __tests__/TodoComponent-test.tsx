import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import TodoComponent from '../src/TodoComponent';
import MyModal from '../src/MyModal';

describe('TodoComponent', () => {
  it('should add a todo', () => {
    const { getByPlaceholderText, getByTestId , getByText } = render(<TodoComponent />);
    const input = getByPlaceholderText('enter your todos');
    const addButton = getByTestId('addTodo');

    fireEvent.changeText(input, 'Buy groceries');
    fireEvent.press(addButton);

    expect(getByText('Buy groceries')).toBeDefined();
  });

  it('should delete a todo', () => {
    const { getByText, getByTestId, queryByText, getByPlaceholderText } = render(<TodoComponent />);
    const input = getByPlaceholderText('enter your todos');
    const addButton = getByTestId('addTodo');

    fireEvent.changeText(input, 'satheesh');
    fireEvent.press(addButton)
    const deleteButton = getByText('delete');

    fireEvent.press(deleteButton);

    expect(queryByText('Buy groceries')).toBeNull();
  });

  it('should edit a todo', () => {
    const { getByText, getByPlaceholderText } = render(<TodoComponent />);
    const input = getByPlaceholderText('enter your todos');
    fireEvent.changeText(input, 'Updated todo');
  });

  it('should display empty todo list message', () => {
    const { getByTestId } = render(<TodoComponent />);
    const emptyMessage = getByTestId('emptyMessage');

    expect(emptyMessage).toBeDefined();
  });

  it('should open and close the modal', () => {
    const { getByText, getByTestId, queryByText ,getByPlaceholderText} = render(<TodoComponent />);
    const input = getByPlaceholderText('enter your todos');
    const addButton = getByTestId('addTodo');

    fireEvent.changeText(input, 'satheesh');
    fireEvent.press(addButton)
    const editButton = getByTestId('editButton');

    fireEvent.press(editButton);
    expect(queryByText('Modal content')).toBeDefined();
  });

  it('should update the state and open the modal when edit button is clicked', async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(<TodoComponent />);
    const input = getByPlaceholderText('enter your todos');
    const addButton = getByTestId('addTodo');

    fireEvent.changeText(input, 'satheesh');
    fireEvent.press(addButton)
    const addTodoButton = getByTestId('addTodo');
    fireEvent.press(addTodoButton);
    const editButton = getByText('Edit');
    fireEvent.press(editButton);
    const modal = getByTestId('myModal')
    expect(modal).toBeDefined();
    await waitFor(() => expect(getByTestId('updateButton')).toBeDefined())
    const updateButton = getByTestId('updateButton');
    fireEvent.press(updateButton);
  });

  it('should close the button when we click on close button', async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(<TodoComponent />);
    const input = getByPlaceholderText('enter your todos');
    const addButton = getByTestId('addTodo');

    fireEvent.changeText(input, 'satheesh');
    fireEvent.press(addButton)
    const addTodoButton = getByTestId('addTodo');
    fireEvent.press(addTodoButton);
    const editButton = getByText('Edit');
    fireEvent.press(editButton);
    const modal = getByTestId('myModal')
    expect(modal).toBeDefined();
    await waitFor(() => expect(getByTestId('cancelButton')).toBeDefined())
    const updateInput = getByPlaceholderText('update your todos');
    const updateButton = getByTestId('updateButton');
    fireEvent.changeText(updateInput, 'satheesh nayaka');
    fireEvent.press(updateButton);
    
    await waitFor (() => {expect(screen.getByText('satheesh nayaka')).not.toBeNull()})
  });

  it("when we click on cancel button the modal should close", async() => {
    const { getByText, getByTestId, getByPlaceholderText } = render(<TodoComponent />);
    const input = getByPlaceholderText('enter your todos');
    const addButton = getByTestId('addTodo');

    fireEvent.changeText(input, 'satheesh');
    fireEvent.press(addButton)
    const addTodoButton = getByTestId('addTodo');
    fireEvent.press(addTodoButton);
    const editButton = getByText('Edit');
    fireEvent.press(editButton);
    const modal = getByTestId('myModal')
    expect(modal).toBeDefined();
    await waitFor(() => expect(getByTestId('updateButton')).toBeDefined())
    const cancelButton = getByTestId('cancelButton');
    fireEvent.press(cancelButton);
  })

});



