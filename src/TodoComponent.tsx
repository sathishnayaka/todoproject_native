/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MyModal from './MyModal';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function TodoComponent(): JSX.Element {
  const [todos, setTodos] = useState('');
  const [todoList, setTodoList] = useState<(typeof todos)[]>([
  ]);
  const [updateValue, setUpdateValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<number>(0);
  const isDarkMode = useColorScheme() === 'dark';

  const onChange = (value: string) => {
    setTodos(value);
  };

  const onSubmit = () => {
    const list = todoList;
    list.push(todos);
    setTodoList(list);
    setTodos('');
  };

  const onDelete = (number: number) => {
    const list = [...todoList];
    list.splice(number, 1);
    setTodoList(list);
  };

  const onUpdate = (index: number) => {
    const value = todoList[index];
    setUpdateValue(value);
    setUpdateIndex(index);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onUpdatePress = (value: string) => {
    const list = [...todoList];
    console.log(updateIndex,value, "values and idnejkjsd")
      list[updateIndex] = value;
      console.log(list);
      setTodoList(list);
  };

  return (
    <>
      <MyModal
        visible={isModalOpen}
        onClose={onClose}
        onUpdatePress={onUpdatePress}
        updateValue={updateValue}
      />
      <SafeAreaView>
        <View>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            placeholder="enter your todos"
            value={todos}
            onChangeText={onChange}
          />
        </View>
        {todoList.length === 0 ? (
          <View style={styles.todoContainerEmpty}>
            <Text style={styles.text} testID='emptyMessage'>Todo list is empty</Text>
          </View>
        ) : (
          <View style={{columnGap: 2}}>
            {todoList.map((ele, index: number) => (
              <View
                style={{
                  backgroundColor: '#2ab7ca',
                  paddingLeft: 5,
                  marginBottom: 30,
                  borderRadius: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  paddingVertical: 10,
                }}
                key={index}>
                <Text style={{alignSelf: 'center'}}>{ele}</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginRight: 10}}>
                    <Button
                      title="Edit"
                      testID='editButton'
                      onPress={() => {
                        onUpdate(index);
                      }}
                    />
                  </View>
                  <Button
                    title="delete"
                    testID='deleteButton'
                    onPress={() => {
                      onDelete(index);
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
        <KeyboardAvoidingView>
          <View style={[{width: '100%', borderRadius: 16}]}>
            <Button
              title="Add todo"
              disabled={todos === '' ? true : false}
              onPress={onSubmit}
              testID='addTodo'
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  todoContainerEmpty: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    // borderWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default TodoComponent;
