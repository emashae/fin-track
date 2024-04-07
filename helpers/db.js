import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, set } from 'firebase/database';
import config from '../config'

const firebaseConfig = config.firebaseConfig

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const fetchTransactions = async () => {
  const snapshot = await ref(database, 'transactions').get();
  const data = snapshot.val();
  console.log(data)
  return data ? Object.values(data) : [];
};

const addTransaction = (transaction) => {
    push(ref(database, 'transactions'), transaction);
};

export { fetchTransactions, addTransaction };
