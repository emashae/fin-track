import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import { fetchTransactions, addTransaction } from '../helpers/db';

const TransactionList = ({ navigation }) => {
  const [transactionData, setTransactionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: '',
    place: '',
    date: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactions();
      setTransactionData(data);
    };
    
    fetchData();
  }, []);
  
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddTransaction = async () => {
    await addTransaction(newTransaction);
  
    // Refetch the transactions from the database
    const updatedTransactions = await fetchTransactions();
  
    // Update the transactionData state with the new data
    setTransactionData(updatedTransactions);
  
    setModalVisible(false);
  };  

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
      style={styles.transactionItem}
    >
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionName}>{item.name}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={transactionData}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable
        style={styles.addButton}
        onPress={toggleModal}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setNewTransaction({ ...newTransaction, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: parseFloat(text) })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Place"
            onChangeText={(text) => setNewTransaction({ ...newTransaction, place: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            onChangeText={(text) => setNewTransaction({ ...newTransaction, date: text })}
          />
          <Pressable style={styles.modalButton} onPress={handleAddTransaction}>
            <Text>Add Transaction</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={toggleModal}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAmount: {
    marginRight: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8e44ad',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#8e44ad',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default TransactionList;
