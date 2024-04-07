// DEPRECATED - REPLACED DATA RETREIVAL FROM JSON WITH FIREBASE

import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 
import transactionData from "../transactionData.json";

const TransactionList = ({ navigation }) => {
  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TransactionDetail", { transaction: item })}
      style={styles.transactionItem}
    >
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionName}>{item.name}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
        <FontAwesome name="chevron-right" size={16} color="#8e44ad" style={styles.chevronIcon} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionAmount: {
    marginRight: 10,
  },
  chevronIcon: {
    marginLeft: 10,
  },
});

export default TransactionList;
