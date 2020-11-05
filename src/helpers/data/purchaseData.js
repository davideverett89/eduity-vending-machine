import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const postPurchase = (newPurchase) => axios.post(`${baseUrl}/purchases.json`, newPurchase);

export default { postPurchase };
