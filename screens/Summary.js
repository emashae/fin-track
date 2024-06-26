import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { fetchTransactions } from "../helpers/db";

const SummaryScreen = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactions();
      setTransactionData(data);
    };

    fetchData();
  }, []);

  // Check if transactionData is empty or undefined
  if (!transactionData || transactionData.length === 0) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Summary</Text>
          <Text>No transactions found.</Text>
        </SafeAreaView>
      );
  }

  //number of transactions
  const numOfTransactions = transactionData.length;

  //balance
  const totalExpenses = transactionData.reduce((total, transaction) => total + transaction.amount, 0);

  //highest spending
  const highestSpending = Math.max(...transactionData.map(transaction => transaction.amount));
  const highestSpendingTransaction = transactionData.find(transaction => transaction.amount === highestSpending);

  //lowest spending 
  const lowestSpending = Math.min(...transactionData.map(transaction => transaction.amount));
  const lowestSpendingTransaction = transactionData.find(transaction => transaction.amount === lowestSpending);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <View style={styles.divider} />
      <View style={styles.content}>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Transactions</Text>
          <Text style={styles.value}>{numOfTransactions}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.value}>${totalExpenses.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.label, styles.bold, styles.purple]}>High Spending</Text>
          <Text style={styles.value}>${highestSpending.toFixed(2)}</Text>
        </View>
        <Text style={styles.transactionName}>{highestSpendingTransaction.name}</Text>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.label, styles.bold, styles.purple]}>Low Spending</Text>
          <Text style={styles.value}>${lowestSpending.toFixed(2)}</Text>
        </View>
        <Text style={styles.transactionName}>{lowestSpendingTransaction.name}</Text>
        <View style={styles.divider} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  content: {
    flex: 1,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingTop: 10,
  },
  label: {
    textAlign: "left",
  },
  value: {
    textAlign: "right",
  },
  bold: {
    fontWeight: "bold",
  },
  purple: {
    color: "#8e44ad", 
  },
  transactionName: {
    marginLeft: 10,
    paddingBottom: 5
  },
});

export default SummaryScreen;
