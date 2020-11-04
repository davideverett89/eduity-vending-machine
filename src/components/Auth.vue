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
      class="btn btn-primary login-btn"
      @click.prevent="login"
    >
      Login
    </button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: "Auth",
    methods:{
        login() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
        }
    }
}
</script>