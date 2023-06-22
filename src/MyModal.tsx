import React, {useEffect, useState} from 'react';
import {Modal, View, TextInput, Button, StyleSheet} from 'react-native';

interface MyModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdatePress: (val: string) => void;
  updateValue: string;
}

const MyModal: React.FC<MyModalProps> = ({
  visible,
  onClose,
  onUpdatePress,
  updateValue,
}) => {
  const [inputValue, setInputValue] = useState(updateValue);

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  useEffect(() => {
    setInputValue(updateValue);
  }, [updateValue]);

  const handleConfirm = () => {
    onUpdatePress(inputValue);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      testID='myModal'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="update your todos"
            value={inputValue}
            onChangeText={handleInputChange}
          />

          <View style={styles.buttonContainer}>
            <Button title="Update" onPress={handleConfirm} testID='updateButton' />
            <Button title="Cancel" onPress={handleCancel} testID='cancelButton' />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    rowGap: 5,
  },
});

export default MyModal;
