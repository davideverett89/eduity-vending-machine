<template>
  <div class="Auth mx-auto col-6 my-5 border border-dark rounded p-5 bg-light">
    <h1 class="display-4">
      Please Login
    </h1>
    <p class="lead my-5">
      In order to better serve our customers, we need some basic user info. 
      By clicking below, we will store your display name and email address. 
      These will not be shared with anyone else.
    </p>
    <button
      class="btn btn-dark login-btn"
      @click.prevent="login"
    >
      Login
    </button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import customerData from '../helpers/data/customerData';
import authData from '../helpers/data/authData';

export default {
    name: "Auth",
    methods:{
      // Simple Firebase authentication.
        login() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
              .then(() => {
                this.customerCheck()
              })
              .catch((err) => console.error('Unable to login:', err));
        },
        // Get the currently authenticated user's email address, and query the database to see if they have logged in before.
        // If the response array has a length of zero, meaning they have never logged in before, call the function to create a new customer object.
        customerCheck() {
          customerData.getCustomerByEmail(authData.getEmail())
            .then((response) => {
              if (response.length === 0) {
                this.handleCreateCustomer();
              }
            })
            .catch((err) => console.error('There was an issue checking for customer information at login:', err));
        },
        // Creates a new customer object, grabbing the data from Firebase's built in methods, and posting it to the database.
        handleCreateCustomer() {
          const newCustomer = {
            display_name: authData.getDisplayName(),
            email: authData.getEmail(),
            uid: authData.getUid(),
          }
          customerData.postCustomer(newCustomer)
            .then(() => {})
            .catch((err) => console.error('There was an issue posting new customer information:', err));
        }
    }
}
</script>