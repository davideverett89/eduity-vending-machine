import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSodas = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sodas.json`)
    .then((response) => {
        const sodaObject = response.data;
        const sodas = [];
        if (sodaObject !== null) {
            Object.keys(sodaObject).forEach((sodaId) => {
                const soda = sodaObject[sodaId];
                soda.id = sodaId;
                sodas.push(soda);
            });
        }
        resolve(sodas);
    })
    .catch((err) => reject(err));
});

const patchSoda = (sodaId, newQuantity) => {
    return axios({
    method: 'PATCH',
    url: `${baseUrl}/sodas/${sodaId}.json`,
    headers: {
        Accept: 'application/json',
    },
    data: {
        quantity: newQuantity
    }
})
};

export default { getSodas, patchSoda };
