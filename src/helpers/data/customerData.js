import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getCustomerByEmail = (email) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/customers.json?orderBy="email"&equalTo="${email}"`)
    .then((response) => {
      const customerObject = response.data;
      const customer = [];
      if (customerObject !== null) {
        Object.keys(customerObject).forEach((customerId) => {
          customerObject[customerId].id = customerId;
          customer.push(customerObject[customerId]);
        });
      }
      resolve(customer);
    })
    .catch((err) => reject(err));
});

const postCustomer = (newCustomer) => axios.post(`${baseUrl}/customers.json`, newCustomer);

export default { getCustomerByEmail, postCustomer };
