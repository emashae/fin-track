import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import config from '../config';

const firebaseConfig = config.firebaseConfig;
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const fetchTransactions = () => {
  const transactionRef = ref(database, 'transactions');

  return new Promise((resolve, reject) => {
    onValue(transactionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const transactions = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        resolve(transactions);
      } else {
        resolve([]);
      }
    }, reject);
  });
};

const addTransaction = (transaction) => {
  return push(ref(database, 'transactions'), transaction);
};

export { fetchTransactions, addTransaction };
